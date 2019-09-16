'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const cheerio = require('cheerio')

const iconsDir = path.join(__dirname, '../icons/')

const svgAttributes = {
  class: '',
  width: '20',
  height: '20',
  viewBox: '0 0 20 20',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg'
}

fs.readdir(iconsDir, (error, files) => {
  if (error) {
    throw error
  }

  files.forEach(file => {
    file = path.join(iconsDir, file)

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        throw err
      }

      const $ = cheerio.load(data)
      const svg = $('svg')

      svg.replaceWith(() => $('<svg>').append($(this).html()))

      for (const [attr, val] of Object.entries(svgAttributes)) {
        $(svg).removeAttr(attr)
        $(svg).attr(attr, val)
      }

      $(svg).attr('class', `bi bi-${path.basename(file, '.svg')}`)

      fs.writeFile(file, $(svg), 'utf8', err => {
        if (err) {
          throw err
        }

        console.log(`- ${path.basename(file, '.svg')}`)
      })
    })
  })

  // the setTimeout should be removed
  setTimeout(() => {
    console.log(chalk.green(`\nSuccess, ${files.length} icons prepped!`))
  }, 1000)
})
