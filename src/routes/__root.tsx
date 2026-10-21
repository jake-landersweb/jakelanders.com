import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { site } from '~/content/data'
import { NotFound } from '~/components/not-found'
import stylesheet from '~/styles.css?url'

// Evaluated once at prerender time.
const year = new Date().getFullYear()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: site.name },
      { name: 'description', content: site.tagline },
    ],
    links: [{ rel: 'stylesheet', href: stylesheet }],
  }),
  component: Root,
  notFoundComponent: NotFound,
})

function Root() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a className="site-name" href="/">
            {site.name}
          </a>
          <a href="/posts">Writing</a>
        </nav>
        <main id="content">
          <Outlet />
        </main>
        <footer className="site-footer">
          <span>© {year}</span>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
