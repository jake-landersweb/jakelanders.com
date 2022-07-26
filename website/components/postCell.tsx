import Link from 'next/link'
import React from 'react'
import Post from '../data/post'
import PostTags from './postTags'

const PostCell = ({ post }: { post: Post }) => {

    const generateSlug = () => {
        const vals = post.title.split(" ")

        vals.unshift(post.id.toString())

        return vals.join("-").toLowerCase()
    }

    var styles: React.CSSProperties = {
        background: `url(${post.endpoint + "/image.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderTopLeftRadius: "0.375rem",
        borderTopRightRadius: "0.375rem"
    }

    var description = post.description

    if (post.description.length > 145) {
        description = post.description.substring(0, 145) + "..."
    }

    return <>
        <div className="border bg-bg-sub border-bg-acc rounded-md">
            <div style={styles} className={`h-[500px] ${post.imageUrl == undefined ? "bg-main bg-opacity-50 rounded-md" : ""}`}></div>
            <div className={`space-y-4 p-4 border border-t-bg-acc border-bg-sub`}>
                <div className="">
                    <Link href={`/blog/${generateSlug()}`} passHref><a><h2 className='text-3xl font-semibold hover:opacity-50 transition-opacity'>{post.title}</h2></a></Link>
                    <p className='text-txt-400 font-extralight'>{post.created}</p>
                </div>
                <p>{description}</p>
                <PostTags tags={post.tags} />
            </div>
        </div>
    </>
}

export default PostCell