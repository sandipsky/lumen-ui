import { fileURLToPath } from 'node:url'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    fs: {
      // The svg icon set lives at the repo root, shared with the Angular package.
      allow: [searchForWorkspaceRoot(process.cwd()), fileURLToPath(new URL('../icons', import.meta.url))],
    },
  },
})
