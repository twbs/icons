#!/usr/bin/env node

'use strict'

const fs = require('fs').promises
const path = require('path')
const chalk = require('chalk')
const cheerio = require('cheerio')
const SVGO = require('svgo')
const yaml = require('js-yaml')

const iconsDir = path.join(__dirname, '../icons/')

const VERBOSE = process.argv[2] === '--verbose'

const svgAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '16',
  height: '16',
  fill: 'currentColor',
  class: '',
  viewBox: '0 0 16 16'
}

const getSvgoConfig = async () => {
  const svgoConfigFile = await fs.readFile(path.join(__dirname, '../svgo.yml'), 'utf8')

  return await yaml.safeLoad(svgoConfigFile)
}

const processFile = async (file, config) => {
  const filepath = path.join(iconsDir, file)
  const basename = path.basename(file, '.svg')

  const originalSvg = await fs.readFile(filepath, 'utf8')
  const svgo = await new SVGO(config)
  const optimizedSvg = await svgo.optimize(originalSvg)

  const $ = cheerio.load(optimizedSvg.data, {
    xml: {
      xmlMode: true
    }
  })
  const $svgElement = $('svg')

  // We keep all SVG contents apart from the `<svg>` element.
  // `$(this)` refers to the original object not the replaced one!
  $svgElement.replaceWith($('<svg>').append($(this).html()))

  // Then we set the `svgAttributes` in the order we want to,
  // hence why we remove the attributes and add them back
  for (const [attribute, value] of Object.entries(svgAttributes)) {
    $svgElement.removeAttr(attribute)
    $svgElement.attr(attribute, attribute === 'class' ? `bi bi-${basename}` : value)
  }

  const resultSvg = $svgElement.toString().replace(/\r\n?/g, '\n')

  await fs.writeFile(filepath, resultSvg, 'utf8')

  if (VERBOSE) {
    console.log(`- ${basename}`)
  }
}

(async () => {
  try {
    const basename = path.basename(__filename)
    const timeLabel = chalk.cyan(`[${basename}] finished`)

    console.log(chalk.cyan(`[${basename}] started`))
    console.time(timeLabel)

    const files = await fs.readdir(iconsDir)
    const config = await getSvgoConfig()

    await Promise.all(files.map(file => processFile(file, config)))

    const filesLength = files.length

    console.log(chalk.green(`\nSuccess, ${filesLength} icon${filesLength !== 1 ? 's' : ''} prepped!`))
    console.timeEnd(timeLabel)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
