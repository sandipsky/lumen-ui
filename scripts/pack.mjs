#!/usr/bin/env node
// Builds the libraries and packs them as npm tarballs into one folder
// (default: <repo>/tarballs), next to a copy of USING-TARBALLS.txt.
// Works on Windows, macOS and Linux.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { basename, isAbsolute, join, relative, resolve } from 'node:path';
import { PACKAGES, ROOT, bold, dim, ensureInstalled, npm, paint, parseArgs, tarballName } from './packages.mjs';

const USAGE = `Usage: node scripts/pack.mjs [angular] [react] [--out <dir>]

  (no names)   build and pack both libraries (default)
  angular      only @lumen-ui/angular
  react        only @lumen-ui/react
  --out <dir>  where to write the tarballs (default: tarballs/ in the repo root)

Via npm: npm run tarball, npm run tarball -- angular, npm run tarball -- --out ../vendor`;

const { targets, flags } = parseArgs(process.argv.slice(2), USAGE, { values: ['out'] });
const outDir = flags.has('out') ? resolve(process.cwd(), flags.get('out')) : join(ROOT, 'tarballs');
mkdirSync(outDir, { recursive: true });

/** Build + pack steps per package; each returns the npm exit code. */
const STEPS = {
  // The Angular package is the ng-packagr output, so build first, then pack that folder.
  angular: async (dir) => (await npm(['run', 'build'], dir)) || npm(['pack', './dist/lumen-ui', '--pack-destination', outDir], dir),
  // React's `prepack` script runs the library build.
  react: (dir) => npm(['pack', '--pack-destination', outDir], dir),
};

const results = [];
for (const key of targets) {
  const pkg = PACKAGES[key];
  await ensureInstalled(key);
  console.log(bold(`\n▸ Building and packing ${pkg.label}…\n`));
  const code = await STEPS[key](pkg.dir);
  const file = join(outDir, tarballName(key));
  if (code !== 0 || !existsSync(file)) {
    console.error(paint(31, bold(`\n✖ ${pkg.label} failed${code ? ` (exit ${code})` : ': tarball not found'}.`)));
    process.exit(code || 1);
  }
  results.push({ pkg, file });
}

copyFileSync(join(ROOT, 'USING-TARBALLS.txt'), join(outDir, 'USING-TARBALLS.txt'));

const shown = (path) => {
  const rel = relative(process.cwd(), path);
  return rel && !rel.startsWith('..') && !isAbsolute(rel) ? rel : path;
};
const width = Math.max(...results.map(({ pkg }) => pkg.label.length));
const pathWidth = Math.max(...results.map(({ file }) => shown(file).length));
console.log(`\n${paint(32, bold('✔ Tarballs ready'))}`);
for (const { pkg, file } of results) {
  const kb = (statSync(file).size / 1024).toFixed(1);
  console.log(`  ${pkg.label.padEnd(width)}  ${shown(file).padEnd(pathWidth)}  ${dim(`(${kb} kB)`)}`);
}
console.log(`\nInstall in another project:`);
for (const { file } of results) console.log(`  npm install <path-to>/${basename(file)}`);
console.log(`\nSetup guide: ${shown(join(outDir, 'USING-TARBALLS.txt'))}`);
