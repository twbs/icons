#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

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
      const iconTitleCap = capitalizeFirstLetter(iconBasename)
      const iconTitle = iconTitleCap.split('-').join(' ')
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

            console.log(`${iconBasename} successfully created`)
          })
        } else {
          console.log(`${iconBasename}: Permalink already exists`)
        }
      })
    }
  } catch (error) {
    console.error('Error', error)
  }
})()
