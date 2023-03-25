'use strict'

const codepoints = require('./font/bootstrap-icons.json')

module.exports = {
  inputDir: './icons',
  outputDir: './font',
  fontTypes: ['woff2', 'woff'],
  assetTypes: ['css', 'scss', 'json'],
  name: 'bootstrap-icons',
  codepoints,
  prefix: 'bi',
  selector: '.bi',
  fontsUrl: './fonts',
  formatOptions: {
    json: {
      indent: 2
    }
  },
  // Use our custom Handlebars templates
  templates: {
    css: './build/font/css.hbs',
    scss: './build/font/scss.hbs'
  },
  pathOptions: {
    json: './font/bootstrap-icons.json',
    css: './font/bootstrap-icons.css',
    scss: './font/bootstrap-icons.scss',
    woff: './font/fonts/bootstrap-icons.woff',
    woff2: './font/fonts/bootstrap-icons.woff2'
  }
}
