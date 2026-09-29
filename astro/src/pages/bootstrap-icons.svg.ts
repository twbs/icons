import fs from 'node:fs'
import path from 'node:path'
import type { APIRoute } from 'astro'

const spritePath = path.resolve(process.cwd(), '../bootstrap-icons.svg')

export const GET: APIRoute = () =>
  new Response(fs.readFileSync(spritePath, 'utf8'), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
