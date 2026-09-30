import type { APIRoute } from 'astro'
import { getCategories, getIcons } from '../lib/icons'

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://icons.getbootstrap.com')
  const icons = getIcons()
  const paths = [
    '/',
    '/docs/',
    '/usage/',
    '/font/',
    '/sprite/',
    ...getCategories(icons).map(
      (category) => `/icons/category/${category.slug}/`
    ),
    ...icons.map((icon) => `/icons/${icon.name}/`)
  ]
  const urls = paths
    .map((pathname) => `  <url><loc>${new URL(pathname, origin)}</loc></url>`)
    .join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  )
}
