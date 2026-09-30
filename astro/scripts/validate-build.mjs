import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCategories, getIcons } from '../src/lib/icons.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const output = path.join(root, '_site-astro')
const icons = getIcons()
const iconNames = icons.map((icon) => icon.name)
const categories = getCategories(icons)

const readAliases = (name) => {
  const markdown = fs.readFileSync(
    path.join(root, 'docs/content/icons', `${name}.md`),
    'utf8'
  )
  const block = markdown.match(
    /^aliases:\s*\n((?:\s+-\s+\/icons\/[^/]+\/\s*\n?)+)/m
  )?.[1]
  return block
    ? [...block.matchAll(/^\s+-\s+(.+)$/gm)].map((match) => match[1].trim())
    : []
}

const aliases = iconNames.flatMap((name) =>
  readAliases(name).map((route) => ({
    route,
    destination: `/icons/${name}/`
  }))
)

const required = [
  'index.html',
  '404.html',
  'docs/index.html',
  'usage/index.html',
  'font/index.html',
  'sprite/index.html',
  'bootstrap-icons.svg',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  'apple-touch-icon.png',
  'favicon.ico',
  'assets/font/bootstrap-icons.css',
  'assets/font/fonts/bootstrap-icons.woff2'
]

for (const file of required) {
  if (!fs.existsSync(path.join(output, file))) {
    throw new Error(`Missing required Astro output: ${file}`)
  }
}

for (const name of iconNames) {
  for (const file of [`icons/${name}/index.html`, `assets/icons/${name}.svg`]) {
    if (!fs.existsSync(path.join(output, file))) {
      throw new Error(`Missing generated icon output: ${file}`)
    }
  }
}

for (const category of categories) {
  const file = path.join(
    output,
    'icons',
    'category',
    category.slug,
    'index.html'
  )
  if (!fs.existsSync(file)) {
    throw new Error(`Missing generated category output: ${category.slug}`)
  }

  const html = fs.readFileSync(file, 'utf8')
  const renderedIcons = [...html.matchAll(/\bhref="\/icons\/([^/]+)\/"/g)].map(
    (match) => match[1]
  )
  const expectedIcons = category.icons.map((icon) => icon.name)
  if (
    renderedIcons.length !== expectedIcons.length ||
    renderedIcons.some((name, index) => name !== expectedIcons[index])
  ) {
    throw new Error(
      `Category ${category.slug} rendered icons outside its metadata set.`
    )
  }

  const canonical = `https://icons.getbootstrap.com/icons/category/${category.slug}/`
  if (
    !html.includes(`<title>${category.name} icons · Bootstrap Icons</title>`) ||
    !html.includes(`rel="canonical" href="${canonical}"`) ||
    !html.includes(
      `href="/icons/category/${category.slug}/#icons" aria-current="page"`
    )
  ) {
    throw new Error(
      `Invalid category metadata or active state: ${category.slug}`
    )
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

const expectedHtmlCount =
  iconNames.length + aliases.length + categories.length + 6
if (htmlFiles.length !== expectedHtmlCount) {
  throw new Error(
    `Expected ${expectedHtmlCount} HTML pages, found ${htmlFiles.length}.`
  )
}

const htmlCache = new Map(
  htmlFiles.map((file) => [file, fs.readFileSync(file, 'utf8')])
)
const idCache = new Map(
  [...htmlCache].map(([file, html]) => [
    file,
    new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  ])
)

const resolveOutputPath = (url) => {
  const pathname = new URL(url, 'https://icons.getbootstrap.com').pathname
  if (pathname === '/') return path.join(output, 'index.html')
  if (pathname.endsWith('/')) return path.join(output, pathname, 'index.html')
  return path.join(output, pathname)
}

const broken = new Set()
for (const file of htmlFiles) {
  const html = htmlCache.get(file)
  const relativeFile = path.relative(output, file)
  const pagePath =
    relativeFile === 'index.html'
      ? '/'
      : `/${relativeFile.replace(/index\.html$/, '')}`
  const pageUrl = new URL(pagePath, 'https://icons.getbootstrap.com')
  if (html.includes('/Users/') || html.includes('file:')) {
    throw new Error(
      `Generated HTML contains a machine-local path: ${relativeFile}`
    )
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1].replaceAll('&amp;', '&')
    if (
      !url ||
      url.startsWith('data:') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:')
    ) {
      continue
    }

    const parsed = new URL(url, pageUrl)
    if (parsed.origin !== 'https://icons.getbootstrap.com') continue
    const target = resolveOutputPath(parsed)
    if (!fs.existsSync(target)) {
      broken.add(`${relativeFile} -> ${parsed.pathname}`)
      continue
    }

    if (parsed.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(parsed.hash.slice(1))
      const ids = idCache.get(target)
      if (!ids?.has(id)) {
        broken.add(
          `${relativeFile} -> ${parsed.pathname}${parsed.hash}`
        )
      }
    }
  }
}

if (broken.size > 0) {
  throw new Error(
    `Broken local links:\n${[...broken].slice(0, 25).join('\n')}`
  )
}

for (const { route, destination } of aliases) {
  const file = resolveOutputPath(route)
  const html = fs.readFileSync(file, 'utf8')
  const canonical = new URL(destination, 'https://icons.getbootstrap.com')
  if (
    !html.includes(`rel="canonical" href="${canonical}"`) ||
    !html.includes('name="robots" content="noindex"') ||
    !html.includes(`http-equiv="refresh" content="0; url=${destination}"`)
  ) {
    throw new Error(`Invalid compatibility redirect: ${route}`)
  }
}

const sitemapUrls = [
  ...fs
    .readFileSync(path.join(output, 'sitemap.xml'), 'utf8')
    .matchAll(/<loc>(.*?)<\/loc>/g)
].map((match) => new URL(match[1]).pathname)
const expectedSitemapUrls = [
  '/',
  '/docs/',
  '/usage/',
  '/font/',
  '/sprite/',
  ...categories.map((category) => `/icons/category/${category.slug}/`),
  ...iconNames.map((name) => `/icons/${name}/`)
]
if (
  sitemapUrls.length !== expectedSitemapUrls.length ||
  expectedSitemapUrls.some((url, index) => sitemapUrls[index] !== url)
) {
  throw new Error('Sitemap routes do not match the canonical route contract.')
}

const robots = fs.readFileSync(path.join(output, 'robots.txt'), 'utf8')
if (
  !robots.includes('User-agent: *') ||
  !robots.includes('Allow: /') ||
  !robots.includes(
    'Sitemap: https://icons.getbootstrap.com/sitemap.xml'
  )
) {
  throw new Error('robots.txt is missing required production directives.')
}

const assertSameFile = (source, generated) => {
  if (!fs.readFileSync(source).equals(fs.readFileSync(generated))) {
    throw new Error(
      `Generated asset differs from source: ${path.relative(output, generated)}`
    )
  }
}

assertSameFile(
  path.join(root, 'bootstrap-icons.svg'),
  path.join(output, 'bootstrap-icons.svg')
)
assertSameFile(
  path.join(root, 'docs/static/assets/img/favicons/apple-touch-icon.png'),
  path.join(output, 'apple-touch-icon.png')
)
assertSameFile(
  path.join(root, 'docs/static/assets/img/favicons/favicon.ico'),
  path.join(output, 'favicon.ico')
)
for (const name of iconNames) {
  assertSameFile(
    path.join(root, 'icons', `${name}.svg`),
    path.join(output, 'assets/icons', `${name}.svg`)
  )
}

console.log(
  `Validated ${htmlFiles.length.toLocaleString()} HTML pages, ${iconNames.length.toLocaleString()} icon routes, ${categories.length} category routes, ${aliases.length} redirects, local links, metadata, and deploy assets.`
)
