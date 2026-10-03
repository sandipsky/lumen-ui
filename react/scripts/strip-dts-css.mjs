// tsc keeps side-effect imports (`import './button.css';`) in the emitted
// .d.ts files, but the library build merges all CSS into dist/styles.css, so
// those paths don't exist in the package. Strip them so consumers that type-check
// declarations (no `skipLibCheck`) don't fail to resolve them.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CSS_IMPORT = /^import ['"][^'"]+\.css['"];\r?\n/gm;

let stripped = 0;
for (const entry of readdirSync('dist', { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.d.ts')) continue;
  const file = join(entry.parentPath, entry.name);
  const source = readFileSync(file, 'utf8');
  const result = source.replace(CSS_IMPORT, '');
  if (result !== source) {
    writeFileSync(file, result);
    stripped++;
  }
}
console.log(`[strip-dts-css] cleaned ${stripped} declaration file(s)`);
