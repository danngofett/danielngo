import { readdirSync, readFileSync } from 'node:fs'
import { defineConfig, fontProviders } from 'astro/config'

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
        !page.endsWith('/cv/') &&
        !unlistedProjectPaths.some((path) => page.endsWith(path)),
    }),
    react(),
  ],
  // Graphik is self-hosted from src/assets/fonts. Weights 700 and 800 both use
  // Bold so headings do not jump to Black.
  experimental: {
    fonts: [
      {
        name: 'Graphik',
        cssVariable: '--font-graphik',
        provider: fontProviders.local(),
        fallbacks: ['system-ui', 'sans-serif'],
        options: {
          variants: [
            {
              weight: 400,
              style: 'normal',
              src: ['./src/assets/fonts/Graphik-Regular.woff2'],
            },
            {
              weight: 400,
              style: 'italic',
              src: ['./src/assets/fonts/Graphik-RegularItalic.woff2'],
            },
            {
              weight: 500,
              style: 'normal',
              src: ['./src/assets/fonts/Graphik-Medium.woff2'],
            },
            {
              weight: 600,
              style: 'normal',
              src: ['./src/assets/fonts/Graphik-Semibold.woff2'],
            },
            {
              weight: '700 800',
              style: 'normal',
              src: ['./src/assets/fonts/Graphik-Bold.woff2'],
            },
          ],
        },
      },
    ],
  },
  vite: {
    css: {
      transformer: 'postcss',
    },
    plugins: [tailwindcss()],
  },
})
