import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '~/components/not-found'
import { site } from '~/content/data'

export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [
      { title: `Page not found | ${site.name}` },
      { name: 'description', content: 'There is no page at this address.' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: NotFound,
})
