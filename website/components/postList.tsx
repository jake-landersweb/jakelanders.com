import Post from "../data/post"
import PostCell from "./postCell"

const PostList = ({ posts }: { posts: Post[] }) => {
    var views = []

    for (var i = 0; i < posts.length; i++) {
        views.push(<div data-aos="fade-up" data-aos-offset="200" data-aos-delay={`${i * 25}`}>
            <PostCell key={posts[i].id.toString()} post={posts[i]} />
        </div>)
    }

    return <>
        {posts.length == 0 ? <div className="grid place-items-center"><p>No Results Found.</p></div> : <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {views}
        </div>}
    </>
}

export default PostList