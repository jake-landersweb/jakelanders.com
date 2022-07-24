import Post from './post'

type PageData = {
    posts: Post[]
    page: number
    lastIndex: number
}

export default PageData