import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const output = path.join(root, '_site-astro')
const icons = fs
  .readdirSync(path.join(root, 'icons'))
  .filter((file) => file.endsWith('.svg'))

const required = [
  'index.html',
  '404.html',
  'usage/index.html',
  'font/index.html',
  'sprite/index.html',
  'bootstrap-icons.svg',
  'robots.txt',
  'sitemap.xml',
  'assets/font/bootstrap-icons.css',
  'assets/font/fonts/bootstrap-icons.woff2'
]

for (const file of required) {
  if (!fs.existsSync(path.join(output, file))) {
    throw new Error(`Missing required Astro output: ${file}`)
  }
}

for (const icon of icons) {
  const name = path.basename(icon, '.svg')
  for (const file of [`icons/${name}/index.html`, `assets/icons/${name}.svg`]) {
    if (!fs.existsSync(path.join(output, file))) {
      throw new Error(`Missing generated icon output: ${file}`)
    }
  }
}

const htmlFiles = []
const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) visit(fullPath)
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath)
  }
}
visit(output)

const resolveOutputPath = (url) => {
  const pathname = new URL(url, 'https://icons.getbootstrap.com').pathname
  if (pathname === '/') return path.join(output, 'index.html')
  if (pathname.endsWith('/')) return path.join(output, pathname, 'index.html')
  return path.join(output, pathname)
}

const broken = []
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1]
    if (
      !url ||
      url.startsWith('#') ||
      url.startsWith('data:') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:')
    ) {
      continue
    }

    const parsed = new URL(url, 'https://icons.getbootstrap.com')
    if (parsed.origin !== 'https://icons.getbootstrap.com') continue
    const target = resolveOutputPath(parsed)
    if (!fs.existsSync(target)) {
      broken.push(`${path.relative(output, file)} -> ${parsed.pathname}`)
    }
  }
}

if (broken.length > 0) {
  throw new Error(`Broken local links:\n${broken.slice(0, 25).join('\n')}`)
}

console.log(
  `Validated ${htmlFiles.length.toLocaleString()} HTML pages and ${icons.length.toLocaleString()} icon routes.`
)
