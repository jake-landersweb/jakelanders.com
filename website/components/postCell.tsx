import Link from 'next/link'
import React from 'react'
import Post from '../data/post'
import Image from './image'
import PostTags from './postTags'

const PostCell = ({ post }: { post: Post }) => {

    const generateSlug = () => {
        const vals = post.title.split(" ")

        vals.unshift(post.id.toString())

        return vals.join("-").toLowerCase()
    }

    var description = post.description

    if (post.description.length > 145) {
        description = post.description.substring(0, 145) + "..."
    }

    return <>
        <Link href={`/blog/${generateSlug()}`} passHref>
            <a>
                <div className="border bg-bg-sub border-bg-acc rounded-md group overflow-hidden">
                    {/* <div style={styles} className={`h-[300px] ${post.imageUrl == undefined ? "bg-main bg-opacity-50 rounded-t-md" : ""}`}></div> */}
                    <Image props={{
                        src: post.endpoint + "/image.png",
                        alt: '',
                        divClass: 'overflow-hidden',
                        imgClass: 'group-hover:scale-105 transition-all'
                    }} />
                    <div className={`space-y-4 p-4 border border-t-bg-acc border-bg-sub`}>
                        <div className="">
                            <h2 className='text-2xl font-bold tracking-tight text-white group-hover:opacity-70 transition-opacity'>{post.title}</h2>
                            <p className='text-txt-400 font-medium'>{post.created}</p>
                        </div>
                        <p className='font-normal text-gray-400'>{description}</p>
                        <PostTags tags={post.tags} />
                    </div>
                </div>
            </a>
        </Link>
    </>
}

export default PostCell