#!/usr/bin/env node

'use strict'

const fs = require('fs').promises
const path = require('path')
const chalk = require('chalk')

const iconsDir = path.join(__dirname, '../icons/')
const pagesDir = path.join(__dirname, '../docs/content/icons/')

const VERBOSE = process.argv.includes('--verbose')

function capitalizeFirstLetter(string) {
  return (string.charAt(0).toUpperCase() + string.slice(1)).split('-').join(' ')
}

async function main(file) {
  const iconBasename = path.basename(file, path.extname(file))
  const iconTitle = capitalizeFirstLetter(iconBasename)
  const pageName = path.join(pagesDir, `${iconBasename}.md`)

  const pageTemplate = `---
title: ${iconTitle}
categories:
tags:
---
`

  try {
    await fs.access(pageName, fs.F_OK)

    if (VERBOSE) {
      console.log(`${chalk.cyan(iconBasename)}: Page already exists; skipping`)
    }
  } catch (_) {
    await fs.writeFile(pageName, pageTemplate)
    console.log(chalk.green(`${iconBasename}: Page created`))
  }
}

(async () => {
  try {
    const basename = path.basename(__filename)
    const timeLabel = chalk.cyan(`[${basename}] finished`)

    console.log(chalk.cyan(`[${basename}] started`))
    console.time(timeLabel)

    const files = await fs.readdir(iconsDir)

    await Promise.all(files.map(file => main(file)))

    const filesLength = files.length

    console.log(chalk.green('\nSuccess, %s page%s prepared!'), filesLength, filesLength !== 1 ? 's' : '')
    console.timeEnd(timeLabel)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
