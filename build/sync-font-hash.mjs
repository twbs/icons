#!/usr/bin/env node

/*!
 * Script to sync the Sass font hash with the CSS font hash.
 * Copyright 2026 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/icons/blob/main/LICENSE)
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const cssFile = path.join(rootDir, 'font/bootstrap-icons.css')
const scssFile = path.join(rootDir, 'font/bootstrap-icons.scss')

const css = await fs.readFile(cssFile, 'utf8')
const scss = await fs.readFile(scssFile, 'utf8')

const hash = css.match(/\.woff2\?([\da-f]+)/)?.[1]
const hashRegex = /(\$bootstrap-icons-font-hash: ")[^"]*(")/

if (!hash || !hashRegex.test(scss)) {
  console.error('Could not find the font hash in the CSS or the Sass file.')
  process.exitCode = 1
} else {
  await fs.writeFile(scssFile, scss.replace(hashRegex, `$1${hash}$2`), 'utf8')
}
