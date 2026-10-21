import { sortedPosts } from './post-index'

const sources = import.meta.glob<string>('../content/posts/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
})

const renderedPosts = new Map(
  sortedPosts.map((post) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
      throw new Error(`Post slug must use lowercase words separated by hyphens: ${post.slug}`)
    }
    const source = sources[`../content/posts/${post.slug}.md`]
    if (source === undefined) throw new Error(`Missing Markdown for post: ${post.slug}`)
    // The Vite plugin has already compiled these raw imports to HTML. Neither
    // Markdown parsing nor the marked library is shipped to the browser.
    return [post.slug, { ...post, html: source }] as const
  }),
)

export function getPost(slug: string) {
  return renderedPosts.get(slug)
}
