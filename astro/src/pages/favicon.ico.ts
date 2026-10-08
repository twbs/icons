import fs from 'node:fs'
import path from 'node:path'
import type { APIRoute } from 'astro'

const iconPath = path.resolve(
  process.cwd(),
  '../docs/static/assets/img/favicons/favicon.ico'
)

export const GET: APIRoute = () =>
  new Response(fs.readFileSync(iconPath), {
    headers: { 'Content-Type': 'image/x-icon' }
  })
