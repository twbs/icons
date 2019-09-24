#!/usr/bin/env node

'use strict'

const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const cheerio = require('cheerio')

const pReaddir = promisify(fs.readdir)
const pReadFile = promisify(fs.readFile)
const pWriteFile = promisify(fs.writeFile)

const iconsDir = path.join(__dirname, '../icons/')

const svgAttributes = {
  width: '20',
  height: '20',
  viewBox: '0 0 20 20',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg'
}

const processFile = file => new Promise((resolve, reject) => {
  file = path.join(iconsDir, file)

  pReadFile(file, 'utf8')
    .then(data => {
      const $ = cheerio.load(data)
      const svg = $('svg')

      svg.replaceWith(() => $('<svg>').append($(this).html()))

      for (const [attr, val] of Object.entries(svgAttributes)) {
        $(svg).attr(attr, val)
      }

      $(svg).attr('class', `bi bi-${path.basename(file, '.svg')}`)

      pWriteFile(file, $(svg), 'utf8')
        .then(() => {
          console.log(`- ${path.basename(file, '.svg')}`)
          resolve()
        })
        .catch(err => reject(err))
    })
    .catch(err => reject(err))
})

const main = async () => {
  const files = await pReaddir(iconsDir)

  await Promise.all(files.map(file => processFile(file)))

  console.log(chalk.green(`\nSuccess, ${files.length} icons prepped!`))
}

main()
