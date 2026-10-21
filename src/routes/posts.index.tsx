import { createFileRoute } from '@tanstack/react-router'
import { site } from '~/content/data'
import { sortedPosts } from '~/lib/post-index'
import { PostList } from '~/components/post-list'

export const Route = createFileRoute('/posts/')({
  head: () => ({
    meta: [
      { title: `Writing | ${site.name}` },
      { name: 'description', content: `Notes and writing by ${site.name}.` },
    ],
  }),
  component: Posts,
})

function Posts() {
  return (
    <>
      <h1>Writing</h1>
      {sortedPosts.length === 0 ? <p>No posts yet.</p> : <PostList posts={sortedPosts} summaries />}
    </>
  )
}
