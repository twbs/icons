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
  try {
    let svgoConfig = await fs.readFile(path.join(__dirname, '../svgo.yml'), 'utf8')

    svgoConfig = await yaml.safeLoad(svgoConfig)

    return svgoConfig
  } catch (error) {
    console.error('Couldn\'t read SVGO\'s config!')
    console.error(error)
    process.exit(1)
  }
}

const processFile = (file, config) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(iconsDir, file)
    const basename = path.basename(file, '.svg')

    fs.readFile(filepath, 'utf8')
      .then(data => {
        const svgo = new SVGO(config)

        svgo.optimize(data)
          .then(result => {
            const $ = cheerio.load(result.data)
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

            fs.writeFile(filepath, $svgElement.toString(), 'utf8')
              .then(() => {
                if (VERBOSE) {
                  console.log(`- ${basename}`)
                }
                resolve()
              })
              .catch(error => reject(error))
          })
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}

const main = async () => {
  const basename = path.basename(__filename)
  const timeLabel = chalk.cyan(`[${basename}] finished`)

  console.log(chalk.cyan(`[${basename}] started`))
  console.time(timeLabel)

  const files = await fs.readdir(iconsDir)
  const config = await getSvgoConfig()

  await Promise.all(files.map(file => processFile(file, config)))

  console.log(chalk.green(`\nSuccess, ${files.length} icons prepped!`))
  console.timeEnd(timeLabel)
}

main()
