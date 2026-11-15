import { readdirSync, readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'

const unlistedProjectPaths = readdirSync('./src/content/projects')
  .filter((file) => /\.mdx?$/.test(file))
  .filter((file) =>
    /^unlisted:\s*true\s*$/m.test(
      readFileSync(`./src/content/projects/${file}`, 'utf8').split('\n---')[0],
    ),
  )
  .map((file) => `/projects/${file.replace(/\.mdx?$/, '')}/`)

export default defineConfig({
  site: 'https://danielngo.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !unlistedProjectPaths.some((path) => page.endsWith(path)),
    }),
    react(),
  ],
  vite: {
    css: {
      transformer: 'postcss',
    },
    plugins: [tailwindcss()],
  },
})
