import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const hugoOutput = path.join(root, '_site')
const astroOutput = path.join(root, '_site-astro')

for (const directory of [hugoOutput, astroOutput]) {
  if (!fs.existsSync(directory)) {
    throw new Error(`Missing build output: ${directory}`)
  }
}

const listFiles = (directory) => {
  const files = []
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) visit(fullPath)
      else files.push(path.relative(directory, fullPath))
    }
  }
  visit(directory)
  return files.sort()
}

const hugoFiles = listFiles(hugoOutput)
const astroFiles = new Set(listFiles(astroOutput))
const missingRoutes = hugoFiles
  .filter((file) => file.endsWith('.html'))
  .filter((file) => !astroFiles.has(file))

if (missingRoutes.length > 0) {
  throw new Error(
    `Astro is missing Hugo routes:\n${missingRoutes.slice(0, 25).join('\n')}`
  )
}

const parityAssets = hugoFiles.filter(
  (file) =>
    file === 'CNAME' ||
    file === 'apple-touch-icon.png' ||
    file === 'favicon.ico' ||
    file === 'bootstrap-icons.svg' ||
    file.startsWith('assets/icons/') ||
    file.startsWith('assets/font/')
)
const missingAssets = parityAssets.filter((file) => !astroFiles.has(file))
if (missingAssets.length > 0) {
  throw new Error(
    `Astro is missing deploy assets:\n${missingAssets.slice(0, 25).join('\n')}`
  )
}

const changedAssets = parityAssets.filter(
  (file) =>
    !fs
      .readFileSync(path.join(hugoOutput, file))
      .equals(fs.readFileSync(path.join(astroOutput, file)))
)
if (changedAssets.length > 0) {
  throw new Error(
    `Astro changed release assets:\n${changedAssets.slice(0, 25).join('\n')}`
  )
}

const hugoHtmlCount = hugoFiles.filter((file) => file.endsWith('.html')).length
const astroHtmlCount = [...astroFiles].filter((file) =>
  file.endsWith('.html')
).length
console.log(
  `Astro deploy shape covers ${hugoHtmlCount.toLocaleString()} Hugo routes and ${parityAssets.length.toLocaleString()} byte-identical public assets (${astroHtmlCount.toLocaleString()} Astro HTML pages total).`
)
