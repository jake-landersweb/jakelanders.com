import Post from "./post"

const generateSlug = (post: Post) => {
    const vals = post.title.split(" ")

    vals.unshift(post.id.toString())

    return vals.join("-").toLowerCase()
}

export default generateSlug