#!/usr/bin/env node

/*!
 * Script to run vnu-jar if Java is available.
 * Copyright 2017-2026 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

import { execFile, spawn } from 'node:child_process'
import vnu from 'vnu-jar'

const target = process.argv[2] ?? '_site/'

execFile('java', ['-version'], (error, _stdout, stderr) => {
  if (error) {
    console.error('Skipping vnu-jar test; Java is probably missing.')
    console.error(error)
    return
  }

  console.log('Running vnu-jar validation...')

  const is32bitJava = !stderr.includes('64-Bit')

  // vnu-jar accepts multiple ignores joined with a `|`.
  // Also note that the ignores are string regular expressions.
  const ignores = [
    // Shiki's canonical dual-theme output uses CSS Color 5 `light-dark()`
    // inline declarations. The validator does not parse that function and
    // reports its following fallback/custom-property colors as invalid too.
    '.*CSS:.*'
  ].join('|')

  const args = [
    '-jar',
    String(vnu),
    '--asciiquotes',
    '--no-langdetect',
    '--skip-non-html',
    '--Werror',
    '--filterpattern',
    ignores,
    target
  ]

  // For the 32-bit Java we need to pass `-Xss512k`
  if (is32bitJava) {
    args.splice(0, 0, '-Xss512k')
  }

  console.log(`command used: java ${args.join(' ')}`)

  return spawn('java', args, {
    stdio: 'inherit'
  })
    .on('exit', process.exit)
})
