'use strict'

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const chalk = require('chalk');

const log = console.log;
const iconsDir = path.join(__dirname, '../icons/')

const svgAttributes = {
  class: '',
  width: '20',
  height: '20',
  viewBox: '0 0 20 20',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
}

fs.readdir(iconsDir, (error, files) => {
  if (error) {
    throw error
  }

  files.forEach((file, index) => {
    file = path.join(iconsDir, file)

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        throw err
      }

      const $ = cheerio.load(data);
      const svg = $('svg');

      svg.replaceWith(function () {
        return $('<svg>').append($(this).html());
      });

      const entries = Object.entries(svgAttributes)
      for (const [attr, val] of entries) {
        $(svg).removeAttr(attr);
        $(svg).attr(attr, val);
      }

      const filename = path.basename(file, '.svg')
      $(svg).attr('class', 'bi bi-' + filename)

      const result = $(svg)

      fs.writeFile(file, result, 'utf8', err => {
        if (err) {
          throw err
        }

        log(`- ${path.basename(file, '.svg')}`)
      })
    })
  })

  function logSuccess() {
    log(chalk.green('\nSuccess, ' + files.length + ' icons prepped!'))
  }
  setTimeout(logSuccess, 1000);

})
