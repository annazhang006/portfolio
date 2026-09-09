import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at /portfolio/, so assets need that base path.
  // If you later move to a custom domain, change this back to '/'.
  base: '/portfolio/',
})
