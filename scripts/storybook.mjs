#!/usr/bin/env node
// Runs the Angular and React Storybooks side by side, with prefixed output.
// Works on Windows, macOS and Linux; Ctrl+C stops everything it started.

import { spawn, spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { PACKAGES, bold, dim, ensureInstalled, paint, parseArgs } from './packages.mjs';

const USAGE = `Usage: node scripts/storybook.mjs [angular] [react] [--open]

  (no names)   start both Storybooks (default)
  angular      start only the Angular Storybook (port 6006)
  react        start only the React Storybook (port 6007)
  --open       open each Storybook in the browser once it is ready

If a port is busy, Storybook picks the next free one; the URLs are printed when ready.
Via npm: npm run storybook, npm run storybook -- react --open`;

const { targets, flags } = parseArgs(process.argv.slice(2), USAGE, { booleans: ['open'] });
const open = flags.has('open');

for (const key of targets) await ensureInstalled(key);

const ANSI = /\x1b\[[0-9;?]*[A-Za-z]|\x1b\][^\x07]*\x07/g;
// Webpack prints a progress line per build step in the Angular dev server; drop that noise.
const NOISE = /^\s*<[a-z]>\s*\[webpack\.Progress\]/;
const width = Math.max(...targets.map((key) => PACKAGES[key].label.length));

const running = new Map(); // key → child process
const urls = new Map(); // key → local URL once ready
let stopping = false;

function prefixed(key, stream, out) {
  const tag = paint(PACKAGES[key].color, `[${PACKAGES[key].label.padEnd(width)}]`);
  createInterface({ input: stream }).on('line', (line) => {
    const plain = line.replace(ANSI, '');
    if (NOISE.test(plain)) return;
    out.write(`${tag} ${line}\n`);
    const match = !urls.has(key) && plain.match(/Local:\s+(https?:\/\/\S+)/);
    if (match) ready(key, match[1]);
  });
}

function ready(key, url) {
  urls.set(key, url);
  if (open) openBrowser(url);
  if (urls.size === targets.length) {
    const lines = targets.map((k) => `  ${PACKAGES[k].label.padEnd(width)}  ${urls.get(k)}`);
    console.log(`\n${bold('Storybook ready')}\n${lines.join('\n')}\n${dim('  Ctrl+C stops all.')}\n`);
  }
}

function openBrowser(url) {
  const [cmd, args] =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '""', url]]
      : [process.platform === 'darwin' ? 'open' : 'xdg-open', [url]];
  spawn(cmd, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
}

function start(key) {
  const pkg = PACKAGES[key];
  // `--ci`: no interactive prompts (two servers can't share one terminal's
  // input) and no auto-open; a busy port falls back to the next free one.
  const child = spawn('npm run storybook -- --ci', {
    cwd: pkg.dir,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    // Own process group on POSIX, so the whole tree (sh → npm → node) can be stopped together.
    detached: process.platform !== 'win32',
    env: { ...process.env, ...(process.stdout.isTTY ? { FORCE_COLOR: '1' } : {}) },
  });
  running.set(key, child);
  prefixed(key, child.stdout, process.stdout);
  prefixed(key, child.stderr, process.stderr);
  child.on('exit', (code, signal) => {
    running.delete(key);
    if (!stopping) {
      const how = signal ? `signal ${signal}` : `code ${code}`;
      console.error(paint(31, bold(`\n✖ ${pkg.label} Storybook exited (${how}).`)));
      if (running.size) console.error(dim('  The other Storybook keeps running; Ctrl+C stops it.\n'));
    }
    if (!running.size) process.exit(stopping ? 0 : (code ?? 1));
  });
}

function kill(child) {
  try {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      process.kill(-child.pid, 'SIGTERM');
    }
  } catch {
    // Already gone.
  }
}

function stopAll() {
  if (stopping) return;
  stopping = true;
  console.log(dim('\nStopping Storybook…'));
  for (const child of running.values()) kill(child);
  // Don't hang if something ignores the signal.
  setTimeout(() => process.exit(0), 5000).unref();
}

process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);
process.on('SIGHUP', stopAll);

console.log(bold(`Starting Storybook: ${targets.map((k) => PACKAGES[k].label).join(' + ')}`));
for (const key of targets) start(key);
