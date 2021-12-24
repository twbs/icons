'use strict'

const fs = require('fs')
const ICON_PATH = fs.realpathSync('icons')
const TYPE_PATH = fs.realpathSync('./')
const TEMPLATE = 'export type BootstrapIcon ='

if (fs.existsSync(ICON_PATH)) {
  let typeDef = TEMPLATE

  console.log('Start reading icons from ', ICON_PATH)
  fs.readdirSync(ICON_PATH)
    .filter((folderItem) => folderItem.match(/.svg$/))
    .map((icon) => `\n  | '${icon.replace('.svg', '')}'`)
    .forEach((typeIconEntry) => {
      typeDef += typeIconEntry
    })

  if (typeDef.length > TEMPLATE.length) {
    typeDef += ';'

    const typeFileDestination = `${TYPE_PATH}/bootstrap-icon.ts`;

    fs.writeFileSync(typeFileDestination, typeDef, { encoding: 'utf-8' })

    console.log(`Type for bootstrap-icons was created -> ${typeFileDestination}`)
  } else {
    console.log('An error occurred... Aboring.')
  }
} else {
  console.log('Icon folder does not exist')
}
