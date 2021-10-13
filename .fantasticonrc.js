const codepoints = require('./font/bootstrap-icons.json');

module.exports = {
  inputDir: './icons', // (required)
  outputDir: './font', // (required)
  fontTypes: ['woff2', 'woff'],
  assetTypes: ['css', 'scss', 'json', 'html'],
  name: 'bootstrap-icons',
  codepoints: codepoints,
  prefix: 'bi',
  selector: '.bi',
  fontsUrl: './fonts',
  formatOptions: {
    json: {
      indent: 2
    }
  },
  // Use a custom Handlebars template
  templates: {
    css: './build/font/css.hbs',
    scss: './build/font/scss.hbs',
    html: './build/font/html.hbs'
  },
  pathOptions: {
    json: './font/bootstrap-icons.json',
    css: './font/bootstrap-icons.css',
    scss: './font/bootstrap-icons.scss',
    html: './font/index.html',
    ttf: './font/fonts/bootstrap-icons.ttf',
    woff: './font/fonts/bootstrap-icons.woff',
    woff2: './font/fonts/bootstrap-icons.woff2',
    eot: './font/fonts/bootstrap-icons.eot'
  }
};
