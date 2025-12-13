import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        ruHome: resolve(__dirname, 'index.html'),
        ruApproach: resolve(__dirname, 'approach/index.html'),
        enHome: resolve(__dirname, 'en/index.html'),
        enApproach: resolve(__dirname, 'en/approach/index.html')
      }
    }
  }
})
