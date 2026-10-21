import { posts } from '~/content/data'

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
