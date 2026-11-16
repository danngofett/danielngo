// Renders every Mermaid source in src/assets/diagrams/*.mmd to a PNG.
//
//   pnpm diagrams              render all
//   pnpm diagrams ai-workflow  render files whose name contains the argument
//
// Each source declares where its image goes (and optionally its spacing) in
// comment directives near the top:
//
//   %% output: src/assets/images/projects/trellis/architecture.png
//   %% spacing: 50 80        (node spacing, rank spacing; defaults 40 60)
//
// Mermaid does not render in Astro, so images are rendered here in headless
// Chromium (Playwright) and committed. Needs the browser once:
//   pnpm exec playwright-core install chromium
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = path.join(root, 'src/assets/diagrams')
const mermaidBundle = path.join(
  root,
  'node_modules/mermaid/dist/mermaid.min.js',
)

const filter = process.argv[2]
const files = fs
  .readdirSync(sourceDir)
  .filter((f) => f.endsWith('.mmd') && (!filter || f.includes(filter)))

if (files.length === 0) {
  console.error(`No diagrams found${filter ? ` matching "${filter}"` : ''}.`)
  process.exit(1)
}

const directive = (src, name) =>
  src.match(new RegExp(`^%%\\s*${name}:\\s*(.+)$`, 'm'))?.[1].trim()

const browser = await chromium.launch()
try {
  for (const file of files) {
    const source = fs.readFileSync(path.join(sourceDir, file), 'utf8')
    const output = directive(source, 'output')
    if (!output) {
      throw new Error(`${file}: add a "%% output: <path>.png" line`)
    }
    const [nodeSpacing, rankSpacing] = (directive(source, 'spacing') ?? '40 60')
      .split(/\s+/)
      .map(Number)

    const page = await browser.newPage({
      viewport: { width: 1800, height: 1000 },
      deviceScaleFactor: 2,
    })
    await page.setContent(
      '<html><body style="margin:0;background:#fff"><div id="out" style="display:inline-block;padding:32px;background:#fff"></div></body></html>',
    )
    await page.addScriptTag({ path: mermaidBundle })
    await page.evaluate(
      async ([src, nodeSpacing, rankSpacing]) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          flowchart: {
            curve: 'basis',
            htmlLabels: true,
            useMaxWidth: false,
            nodeSpacing,
            rankSpacing,
          },
          themeVariables: {
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontSize: '18px',
            primaryColor: '#f3f4f6',
            primaryBorderColor: '#9ca3af',
            primaryTextColor: '#111827',
            lineColor: '#4b5563',
            edgeLabelBackground: '#ffffff',
            clusterBkg: '#ffffff',
            clusterBorder: '#d1d5db',
            tertiaryColor: '#ffffff',
          },
        })
        const { svg } = await mermaid.render('diagram', src)
        document.getElementById('out').innerHTML = svg
      },
      [source, nodeSpacing, rankSpacing],
    )

    const target = path.join(root, output)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    await page.locator('#out').screenshot({ path: target })
    await page.close()
    console.log(`${file} -> ${output}`)
  }
} finally {
  await browser.close()
}
