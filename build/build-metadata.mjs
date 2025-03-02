#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import picocolors from 'picocolors'
import { load as yamlLoad } from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const docsIconsDir = path.join(__dirname, '../docs/content/icons/')
const metadataDir = path.join(__dirname, '../metadata/')
const jsonOutput = path.join(metadataDir, 'icons.json')
const categoriesOutput = path.join(metadataDir, 'categories.json')

async function main(file, iconsMetadata, categories) {
  const filePath = path.join(docsIconsDir, file)
  const content = await fs.readFile(filePath, 'utf8')
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

  if (frontmatterMatch && frontmatterMatch[1]) {
    try {
      const frontmatterJson = yamlLoad(frontmatterMatch[1])
      delete frontmatterJson.title

      const iconName = file.replace('.md', '')
      iconsMetadata[iconName] = frontmatterJson

      if (frontmatterJson.categories && frontmatterJson.categories.length) {
        for (const category of frontmatterJson.categories) {
          if (!categories[category]) {
            categories[category] = []
          }
          categories[category].push(iconName)
        }
      }
    } catch (yamlError) {
      console.error(picocolors.red(`Error parsing YAML in ${file}:`), yamlError)
    }
  }
}

(async () => {
  try {
    const basename = path.basename(__filename)
    const timeLabel = picocolors.cyan(`[${basename}] finished`)

    console.log(picocolors.cyan(`[${basename}] started`))
    console.time(timeLabel)

    const files = await fs.readdir(docsIconsDir)
    const iconsMetadata = {}
    const categories = {}

    await Promise.all(files.map(file => main(file, iconsMetadata, categories)))

    await fs.writeFile(jsonOutput, JSON.stringify(iconsMetadata, null, 2))
    await fs.writeFile(categoriesOutput, JSON.stringify(categories, null, 2))

    const iconsMetadataLength = Object.keys(iconsMetadata).length
    const categoriesLength = Object.keys(categories).length

    console.log(
      picocolors.green('\nSuccess, prepared metadata for %s icon%s and %s categor%s!'),
      iconsMetadataLength,
      iconsMetadataLength === 1 ? '' : 's',
      categoriesLength,
      categoriesLength === 1 ? 'y' : 'ies'
    )
    console.timeEnd(timeLabel)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
