import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { renderMarkdown } from './scripts/markdown.ts'

export default defineConfig({
  preview: { host: '127.0.0.1' },
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [
    {
      name: 'render-local-markdown',
      enforce: 'pre',
      async load(id) {
        if (id.endsWith('.md?raw') && id.includes('/src/content/posts/')) {
          this.addWatchFile(id.slice(0, -4))
          const source = await readFile(id.slice(0, -4), 'utf8')
          return `export default ${JSON.stringify(renderMarkdown(source))}`
        }
      },
    },
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
      },
      pages: [{ path: '/404', prerender: { outputPath: '/404.html' } }],
    }),
    react(),
  ],
})
