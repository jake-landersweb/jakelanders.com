import type { Post } from '~/content/types'

export function PostList({ posts, summaries = false }: { posts: Post[]; summaries?: boolean }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <time className="muted" dateTime={post.date}>
            {post.date}
          </time>
          <div>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
            {summaries && post.summary && <p className="muted">{post.summary}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
