import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://icons.getbootstrap.com')
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', origin)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  )
}
