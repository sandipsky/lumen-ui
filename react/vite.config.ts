import { fileURLToPath } from 'node:url'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// Showcase app + Storybook config. The library build lives in vite.lib.config.ts.
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    // Stories import the library by its package name, straight from source.
    alias: {
      '@lumen-ui/react': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    },
  },
  server: {
    fs: {
      // The svg icon set lives at the repo root, shared with the Angular package.
      allow: [searchForWorkspaceRoot(process.cwd()), fileURLToPath(new URL('../icons', import.meta.url))],
    },
  },
})
