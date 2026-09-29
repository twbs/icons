import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd(), '..')
const iconsDir = path.join(root, 'icons')
const contentDir = path.join(root, 'docs/content/icons')
const codepointsPath = path.join(root, 'font/bootstrap-icons.json')
const packagePath = path.join(root, 'package.json')

export interface IconMeta {
  name: string
  title: string
  tags: string[]
  categories: string[]
  codepoint?: number
  svg: string
  decorativeSvg: string
}

export interface PackageMeta {
  version: string
}

const titleize = (name: string) =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const readList = (source: string, key: string): string[] => {
  const inline = source.match(new RegExp(`^${key}:\\s*\\[(.*)\\]`, 'm'))?.[1]
  if (inline)
    return inline
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  const block = source.match(
    new RegExp(`^${key}:\\s*\\n((?:\\s+- .+\\n?)+)`, 'm')
  )?.[1]
  return block
    ? [...block.matchAll(/^\s+-\s+(.+)$/gm)].map((match) => match[1].trim())
    : []
}

export function getIcons(): IconMeta[] {
  const codepoints = fs.existsSync(codepointsPath)
    ? (JSON.parse(fs.readFileSync(codepointsPath, 'utf8')) as Record<
        string,
        number
      >)
    : {}

  return fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => {
      const name = path.basename(file, '.svg')
      const markdownPath = path.join(contentDir, `${name}.md`)
      const markdown = fs.existsSync(markdownPath)
        ? fs.readFileSync(markdownPath, 'utf8')
        : ''
      const title =
        markdown.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? titleize(name)
      const svg = fs.readFileSync(path.join(iconsDir, file), 'utf8').trim()
      return {
        name,
        title,
        tags: readList(markdown, 'tags'),
        categories: readList(markdown, 'categories'),
        codepoint: codepoints[name],
        svg,
        decorativeSvg: svg.replace(
          '<svg ',
          '<svg aria-hidden="true" focusable="false" '
        )
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getPackageMeta(): PackageMeta {
  return JSON.parse(fs.readFileSync(packagePath, 'utf8')) as PackageMeta
}
