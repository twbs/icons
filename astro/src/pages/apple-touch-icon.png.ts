import fs from 'node:fs'
import path from 'node:path'
import type { APIRoute } from 'astro'

const iconPath = path.resolve(
  process.cwd(),
  '../docs/static/assets/img/favicons/apple-touch-icon.png'
)

export const GET: APIRoute = () =>
  new Response(fs.readFileSync(iconPath), {
    headers: { 'Content-Type': 'image/png' }
  })
