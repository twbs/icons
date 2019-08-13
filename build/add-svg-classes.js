'use strict'

const fs = require('fs')
const path = require('path')

const iconsDir = path.join(__dirname, '../icons/')

//
// Add classnames
//

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

      const result = data.replace('<svg', `<svg class="bi bi-${path.basename(file, '.svg')}"`)
      console.log(`${index}. ${path.basename(file, '.svg')}`)

      fs.writeFile(file, result, 'utf8', err => {
        if (err) {
          throw err
        }
      })
    })
  })
})
