import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import Handlebars from 'handlebars'
import { generateFonts } from '@twbs/fantasticon'

const require = createRequire(import.meta.url)
const config = require('../.fantasticonrc.js')

const { codepoints } = await generateFonts(config)

const render = Handlebars.compile(
	await fs.readFile(new URL('./font/uss.hbs', import.meta.url), 'utf8'),
	{ noEscape: true } // USS isn't HTML, so skip entity escaping
)

const uss = render({
	prefix: config.prefix ?? 'bi',
	name: config.name,
	icons: Object.entries(codepoints)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([name, cp]) => ({ name, cp })),
})

await fs.writeFile(path.join(config.outputDir, `${config.name}.uss`), uss)