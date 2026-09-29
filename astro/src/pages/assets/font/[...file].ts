import fs from 'node:fs'
import path from 'node:path'
import type { APIRoute } from 'astro'

const fontDir = path.resolve(process.cwd(), '../font')
const files = [
  'bootstrap-icons.css',
  'bootstrap-icons.json',
  'bootstrap-icons.min.css',
  'bootstrap-icons.scss',
  'bootstrap-icons.ts',
  'fonts/bootstrap-icons.woff',
  'fonts/bootstrap-icons.woff2'
]

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.scss': 'text/x-scss; charset=utf-8',
  '.ts': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

export function getStaticPaths() {
  return files.map((file) => ({ params: { file }, props: { file } }))
}

export const GET: APIRoute = ({ props }) => {
  const file = props.file as string
  return new Response(fs.readFileSync(path.join(fontDir, file)), {
    headers: {
      'Content-Type':
        contentTypes[path.extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
