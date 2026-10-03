import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// Library build (`npm run build`): dist/index.js + dist/styles.css. The .d.ts
// files come from `tsc -p tsconfig.lib.json`, which runs afterwards.
export default defineConfig({
  plugins: [
    react(),
    // Ship compiler-memoised components; the output imports react/compiler-runtime (React 19).
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'styles',
    },
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/],
      output: {
        // One file per source module, so consumers' bundlers can drop whole unused
        // components (and their data, e.g. the BS calendar tables) via `sideEffects`.
        preserveModules: true,
        preserveModulesRoot: 'src',
        // The icons are `?raw` imports; keep the query out of their file names.
        entryFileNames: (chunk) => `${chunk.name.replace(/\?.*$/, '')}.js`,
      },
    },
  },
})
