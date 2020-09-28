#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const iconsDir = path.join(__dirname, '../icons/')
const pagesDir = path.join(__dirname, '../docs/content/icons/')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

(async () => {
  try {
    const files = await fs.promises.readdir(iconsDir)

    for (const file of files) {
      const iconBasename = path.basename(file, path.extname(file))
      const iconTitle = capitalizeFirstLetter(iconBasename).split('-').join(' ')
      const pageName = path.join(pagesDir, `${iconBasename}.md`)

      const pageTemplate = `---
title: ${iconTitle}
categories:
tags:
---
`

      fs.access(pageName, fs.F_OK, err => {
        if (err) {
          fs.writeFile(pageName, pageTemplate, err => {
            if (err) {
              throw err
            }

            console.log(chalk.green(`${iconBasename} successfully created`))
          })
        } else {
          console.log(chalk.cyan(`${iconBasename}: Permalink already exists`))
        }
      })
    }
  } catch (error) {
    console.error(chalk.cyan(`Error: ${error}`))
  }
})()
