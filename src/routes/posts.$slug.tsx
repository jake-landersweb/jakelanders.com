import { createFileRoute, notFound } from '@tanstack/react-router'
import { site } from '~/content/data'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const { getPost } = await import('~/lib/posts')
    const post = getPost(params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'Page not found'} | ${site.name}` },
      { name: 'description', content: loaderData?.summary ?? `Writing by ${site.name}.` },
    ],
  }),
  component: Post,
})

function Post() {
  const post = Route.useLoaderData()
  return (
    <article>
      <header className="post-header">
        <h1>{post.title}</h1>
        <time className="muted" dateTime={post.date}>
          {post.date}
        </time>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr />
      <p>
        <a href="/posts">← All writing</a>
      </p>
    </article>
  )
}
