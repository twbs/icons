import type { APIRoute } from 'astro'
import { getIcons } from '../../../lib/icons'

export function getStaticPaths() {
  return getIcons().map((icon) => ({ params: { name: icon.name }, props: { svg: icon.svg } }))
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.svg as string, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Content-Disposition': 'attachment'
    }
  })
