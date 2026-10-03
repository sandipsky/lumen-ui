// Shared helpers for the repo-root scripts (storybook.mjs, pack.mjs).
// Plain Node, no dependencies, so they work the same on Windows, macOS and Linux.

import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

export const PACKAGES = {
  angular: {
    label: 'Angular',
    dir: join(ROOT, 'angular'),
    // The published manifest (name/version), not the private workspace one.
    manifest: join(ROOT, 'angular', 'projects', 'lumen-ui', 'package.json'),
    color: 31, // red
  },
  react: {
    label: 'React',
    dir: join(ROOT, 'react'),
    manifest: join(ROOT, 'react', 'package.json'),
    color: 36, // cyan
  },
};

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
export const paint = (code, text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text);
export const bold = (text) => paint(1, text);
export const dim = (text) => paint(2, text);

/**
 * Splits CLI args into package names and flags. No names (or `both` / `all`)
 * means every package. `booleans` are on/off flags (`--open`); `values` take
 * an argument (`--out dir` or `--out=dir`). Anything else exits with the usage text.
 */
export function parseArgs(argv, usage, { booleans = [], values = [] } = {}) {
  const fail = (message) => {
    console.error(`${message}\n\n${usage}`);
    process.exit(2);
  };
  const names = [];
  const flags = new Map();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      console.log(usage);
      process.exit(0);
    } else if (arg.startsWith('--')) {
      const eq = arg.indexOf('=');
      const key = arg.slice(2, eq === -1 ? undefined : eq);
      if (booleans.includes(key) && eq === -1) {
        flags.set(key, true);
      } else if (values.includes(key)) {
        const value = eq === -1 ? argv[++i] : arg.slice(eq + 1);
        if (!value) fail(`--${key} needs a value.`);
        flags.set(key, value);
      } else {
        fail(`Unknown option "${arg}".`);
      }
    } else if (arg === 'both' || arg === 'all') {
      names.push(...Object.keys(PACKAGES));
    } else if (arg in PACKAGES) {
      names.push(arg);
    } else {
      fail(`Unknown package "${arg}".`);
    }
  }
  const targets = [...new Set(names.length ? names : Object.keys(PACKAGES))];
  return { targets, flags };
}

/** Quotes an argument for the shell that `spawn(..., { shell: true })` uses (cmd.exe or sh). */
export const quote = (arg) => (/[\s"&|<>^()]/.test(arg) ? `"${arg.replace(/"/g, '\\"')}"` : arg);

/**
 * Runs `npm <args>` in `cwd` with inherited output. Goes through the shell
 * because Windows can only launch npm.cmd that way. Resolves to the exit code.
 */
export function npm(args, cwd) {
  return new Promise((resolve) => {
    const child = spawn('npm', args.map(quote), { cwd, stdio: 'inherit', shell: true });
    child.on('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
    child.on('error', (error) => {
      console.error(error.message);
      resolve(1);
    });
  });
}

/** Installs a package's dependencies first if it has never been installed. */
export async function ensureInstalled(key) {
  const pkg = PACKAGES[key];
  if (existsSync(join(pkg.dir, 'node_modules'))) return;
  console.log(bold(`\n▸ ${pkg.label}: node_modules missing, running npm install…`));
  const code = await npm(['install'], pkg.dir);
  if (code !== 0) {
    console.error(`npm install failed in ${pkg.dir}`);
    process.exit(code);
  }
}

/** `@lumen-ui/react@0.1.0` → `lumen-ui-react-0.1.0.tgz`, the name `npm pack` gives it. */
export function tarballName(key) {
  const { name, version } = JSON.parse(readFileSync(PACKAGES[key].manifest, 'utf8'));
  return `${name.replace(/^@/, '').replace(/\//g, '-')}-${version}.tgz`;
}
