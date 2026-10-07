// Combines the two static Storybook builds into one deployable folder, `site/`:
//   site/index.html   landing page linking to both
//   site/angular/     angular/dist/storybook
//   site/react/       react/storybook-static
// Run after both `build-storybook` scripts (netlify.toml does this).
//
//   node scripts/combine-storybooks.mjs

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './packages.mjs';

const SITE = join(ROOT, 'site');
const BUILDS = {
  angular: join(ROOT, 'angular', 'dist', 'storybook'),
  react: join(ROOT, 'react', 'storybook-static'),
};

for (const [name, dir] of Object.entries(BUILDS)) {
  if (!existsSync(join(dir, 'index.html'))) {
    console.error(`[combine-storybooks] ${name} Storybook is not built (missing ${dir}).`);
    process.exit(1);
  }
}

rmSync(SITE, { recursive: true, force: true });
mkdirSync(SITE, { recursive: true });
for (const [name, dir] of Object.entries(BUILDS)) cpSync(dir, join(SITE, name), { recursive: true });

writeFileSync(
  join(SITE, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LumenUI Storybook</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fefefe; color: #07090f; }
  main { text-align: center; padding: 16px; }
  h1 { margin: 0 0 8px; }
  p { margin: 0 0 24px; color: #555755; }
  nav { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  a { padding: 10px 20px; border-radius: 8px; background: #4cb139; color: #f9fafb; font-weight: 600; text-decoration: none; }
  a:hover { background: #3b8a2d; }
</style>
</head>
<body>
<main>
  <h1>LumenUI</h1>
  <p>Component playground</p>
  <nav><a href="angular/">Angular Storybook</a><a href="react/">React Storybook</a></nav>
</main>
</body>
</html>
`,
);

console.log(`[combine-storybooks] wrote ${SITE}`);
