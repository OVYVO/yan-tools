import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { categories } from './src/data/categories'
import { toolsMeta } from './src/data/tools-meta'

function seoStaticPlugin(): Plugin {
  return {
    name: 'seo-static',
    apply: 'build',
    closeBundle() {
      const env = loadEnv('production', process.cwd(), '')
      const baseRaw = env.VITE_BASE ?? '/'
      const base = baseRaw.endsWith('/') ? baseRaw.slice(0, -1) : baseRaw
      const site = (env.VITE_SITE_URL ?? 'https://example.com').replace(/\/$/, '')
      const distDir = resolve(process.cwd(), 'dist')
      const paths = new Set<string>(['/', '/search', '/about', '/changelog', '/privacy'])
      categories.forEach((c) => paths.add(`/category/${c.id}`))
      toolsMeta.forEach((t) => paths.add(`/tools/${t.slug}`))
      const root = `${site}${base === '/' ? '' : base}`.replace(/\/$/, '')
      const loc = (p: string) => (p === '/' ? `${root}/` : `${root}${p}`)
      const urlset = [...paths]
        .sort()
        .map((p) => `  <url><loc>${loc(p)}</loc></url>`)
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`
      writeFileSync(resolve(distDir, 'sitemap.xml'), xml)
      const robots = `User-agent: *\nAllow: /\nSitemap: ${loc('/sitemap.xml')}\n`
      writeFileSync(resolve(distDir, 'robots.txt'), robots)
      const indexHtml = resolve(distDir, 'index.html')
      if (existsSync(indexHtml)) copyFileSync(indexHtml, resolve(distDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [vue(), UnoCSS(), seoStaticPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('prettier')) return 'prettier'
            if (id.includes('sql-formatter')) return 'sql-formatter'
            if (id.includes('qrcode')) return 'qrcode'
            if (id.includes('marked') || id.includes('dompurify')) return 'markdown'
            if (id.includes('crypto-js')) return 'crypto'
            return 'vendor'
          }
        },
      },
    },
  },
})
