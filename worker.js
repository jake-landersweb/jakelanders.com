// Preserve the former Traefik/nginx host and legacy URL behavior.
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === 'www.jakelanders.com') {
      return new Response('404 page not found\n', { status: 404 })
    }
    if (url.pathname === '/contact' || url.pathname.startsWith('/blog')) {
      url.pathname = url.pathname === '/contact' ? '/' : '/posts'
      return Response.redirect(url.toString(), 301)
    }
    let response = await env.ASSETS.fetch(request)
    // nginx served folder indexes without forcing a trailing-slash redirect.
    if (response.status === 404 && !url.pathname.startsWith('/assets/')) {
      const indexUrl = new URL(request.url)
      indexUrl.pathname = `${url.pathname.replace(/\/$/, '')}/index.html`
      response = await env.ASSETS.fetch(new Request(indexUrl, request))
    }
    if (url.pathname.startsWith('/assets/') && response.ok) {
      const cached = new Response(response.body, response)
      cached.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return cached
    }
    return response
  },
}
