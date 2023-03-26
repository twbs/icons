#!/usr/bin/env node

'use strict'

const fs = require('node:fs').promises
const path = require('node:path')
const process = require('node:process')
const picocolors = require('picocolors')


const fontJson = require(path.join(__dirname, '../font/bootstrap-icons.json'))
const jsonIconList = Object.keys(fontJson)

const iconsDir = path.join(__dirname, '../icons/');

(async () => {
  try {
    const basename = path.basename(__filename)
    const timeLabel = picocolors.cyan(`[${basename}] finished`)

    console.log(picocolors.cyan(`[${basename}] started`))
    console.time(timeLabel)

    const files = await fs.readdir(iconsDir)
    const svgIconList = files.map(file => file.slice(0,-4))

    const onlyInJson = jsonIconList.filter(i => !svgIconList.includes(i))
    const onlyInSvg = svgIconList.filter(i => !jsonIconList.includes(i))

    if(onlyInJson.length != 0 || onlyInSvg != 0) {
      if(onlyInJson.length){
        console.error(picocolors.red("Found additional icons in JSON:\n  %s"), onlyInJson.join(", "))
      }
      if(onlyInSvg.length){
        console.error(picocolors.red("Found additional icons in SVG files:\n  %s"), onlyInSvg.join(", "))
      }
      throw new Error('Mismatch between JSON and SVG files')
    }

    console.log(picocolors.green('\nSuccess, found no differences!'))
    console.timeEnd(timeLabel)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
