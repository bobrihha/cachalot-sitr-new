import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

function redirectMpaDirectoryToIndex(): Plugin {
  const redirects: Record<string, string> = {
    '/parks': '/parks/index.html',
    '/parks/': '/parks/index.html',
    '/draft': '/draft/index.html',
    '/draft/': '/draft/index.html',
    '/en/draft': '/en/draft/index.html',
    '/en/draft/': '/en/draft/index.html',
  }

  return {
    name: 'redirect-mpa-directory-to-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        const target = redirects[url]
        if (!target) return next()
        res.statusCode = 302
        res.setHeader('Location', target)
        res.end()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [redirectMpaDirectoryToIndex(), react()],
  build: {
    rollupOptions: {
      input: {
        ruHome: resolve(__dirname, 'index.html'),
        ruApproach: resolve(__dirname, 'approach/index.html'),
        ruParks: resolve(__dirname, 'parks/index.html'),
        ruDraft: resolve(__dirname, 'draft/index.html'),
        enHome: resolve(__dirname, 'en/index.html'),
        enApproach: resolve(__dirname, 'en/approach/index.html'),
        enDraft: resolve(__dirname, 'en/draft/index.html')
      }
    }
  }
})
