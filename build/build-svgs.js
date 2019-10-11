#!/usr/bin/env node

'use strict'

const fs = require('fs').promises
const path = require('path')
const chalk = require('chalk')
const cheerio = require('cheerio')

const iconsDir = path.join(__dirname, '../icons/')

const svgAttributes = {
  class: '',
  width: '1em',
  height: '1em',
  viewBox: '0 0 20 20',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg'
}

const processFile = file => new Promise((resolve, reject) => {
  file = path.join(iconsDir, file)

  fs.readFile(file, 'utf8')
    .then(data => {
      const $ = cheerio.load(data)
      const svg = $('svg')

      svg.replaceWith(() => $('<svg>').append($(this).html()))

      for (const [attr, val] of Object.entries(svgAttributes)) {
        $(svg).removeAttr(attr)
        $(svg).attr(attr, val)
      }

      $(svg).attr('class', `bi bi-${path.basename(file, '.svg')}`)

      fs.writeFile(file, $(svg), 'utf8')
        .then(() => {
          console.log(`- ${path.basename(file, '.svg')}`)
          resolve()
        })
        .catch(err => reject(err))
    })
    .catch(err => reject(err))
})

const main = async () => {
  const files = await fs.readdir(iconsDir)

  await Promise.all(files.map(file => processFile(file)))

  console.log(chalk.green(`\nSuccess, ${files.length} icons prepped!`))
}

main()
