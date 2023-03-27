#!/usr/bin/env node

'use strict'

const fs = require('node:fs').promises
const path = require('node:path')
const process = require('node:process')
const picocolors = require('picocolors')

const fontJson = require(path.join(__dirname, '../font/bootstrap-icons.json'))
const iconsDir = path.join(__dirname, '../icons/')

const jsonIconList = Object.keys(fontJson)

;(async () => {
  try {
    const basename = path.basename(__filename)
    const timeLabel = picocolors.cyan(`[${basename}] finished`)

    console.log(picocolors.cyan(`[${basename}] started`))
    console.time(timeLabel)

    const files = await fs.readdir(iconsDir)
    const svgIconList = files.map(file => path.basename(file, path.extname(file)))

    const onlyInJson = jsonIconList.filter(icon => !svgIconList.includes(icon))
    const onlyInSvg = svgIconList.filter(icon => !jsonIconList.includes(icon))

    if (onlyInJson.length === 0 || onlyInSvg === 0) {
      console.log(picocolors.green('Success, found no differences!'))
      console.timeEnd(timeLabel)

      return
    }

    if (onlyInJson.length > 0) {
      console.error(picocolors.red('Found additional icons in JSON:'))

      for (const icon of onlyInJson) {
        console.log(`  - ${picocolors.red(icon)}`)
      }
    }

    if (onlyInSvg.length > 0) {
      console.error(picocolors.red('Found additional icons in SVG files:'))

      for (const icon of onlyInSvg) {
        console.log(`  - ${picocolors.red(icon)}`)
      }
    }

    process.exit(1)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
