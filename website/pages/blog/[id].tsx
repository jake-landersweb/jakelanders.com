import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Post from "../../data/post"
import ApiResponse from "../../data/response"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Head from 'next/head'
import React, { useEffect } from "react";
import PostTags from "../../components/postTags"
import Label from "../../components/label"
import { AiFillGithub } from 'react-icons/ai'
import { IoPersonOutline } from 'react-icons/io5'
import { IoTimeOutline } from 'react-icons/io5'
import { MdUpdate } from 'react-icons/md'


export const getServerSideProps: GetServerSideProps = async (context) => {
    // get id from params
    const id = context.params!.id?.toString().split("-")[0]

    console.log(id)
    const postDataResponse = await fetch(`${process.env.HOST!}/posts/${id}`, {
        headers: [["Content-Type", "application/json"], ["x-api-key", process.env.KEY!.toString()]],
    })

    var postData: ApiResponse<Post> = await postDataResponse.json()

    // get the actual post content
    const postResponse = await fetch(postData.body.endpoint + "/README.md", {
        headers: [["Content-Type", "application/json"], ["x-api-key", process.env.KEY!.toString()]],
    })


    var post = await postResponse.text()

    return {
        props: {
            postData,
            post
        }
    }
}

const PostPage = ({ postData, post }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useEffect(() => {
        // add utterances comments
        let anchor = document.getElementById("inject-comments-for-uterances");
        if (anchor.children.length == 0) {
            let script = document.createElement("script");
            script.setAttribute("src", "https://utteranc.es/client.js");
            script.setAttribute("crossorigin", "anonymous");
            script.setAttribute("async", "true");
            script.setAttribute("repo", "jake-landersweb/code_vault");
            script.setAttribute("issue-term", postData.body.title);
            script.setAttribute("theme", "photon-dark");
            anchor.appendChild(script);
        }
    })

    const customStyle: React.CSSProperties = {
        background: 'none',
        padding: 0
    }

    const metadata = (name: string, value: string, icon: JSX.Element) => {
        return <div className="flex space-x-2 items-center bg-bg-sub border border-bg-acc rounded-md px-2 py-1">
            {icon}
            <div className="">
                <p className="text-xs font-light opacity-50">{name}</p>
                <p>{value}</p>
            </div>
        </div>
    }


    return <>
        <div className="div">
            <Head>
                <title>{postData.body.title} - Jake Landers</title>
                <meta name="keywords" content={postData.tags} id="keywords" />
            </Head>
            <div className="grid place-items-center">
                <div className="space-y-16">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl text-center">{postData.body.title}</h2>
                        <div className="grid place-items-center gap-y-4">
                            <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="0" className="md:flex md:space-x-4 md:space-y-0 space-y-2">
                                {metadata("Author", "Jake Landers", <IoPersonOutline size={30} />)}
                                {metadata("Created", postData.body.created, <IoTimeOutline size={30} />)}
                                {metadata("Updated", postData.body.updated, <MdUpdate size={30} />)}
                            </div>
                            <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="50">
                                <PostTags tags={postData.body.tags} textSize="text-md" />
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="100" className="grid place-items-center">
                        <div className="prose prose-stone !prose-invert max-w-[92vw] md:max-w-[78vw] lg:max-w-[820px]">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={nord as any}
                                                customStyle={customStyle}
                                                language={match[1]}
                                                PreTag="div"
                                                showLineNumbers={true}
                                                {...props}
                                            >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >{post}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid place-items-center my-8">
                <a href={`https://github.com/jake-landersweb/code_vault/tree/main/${postData.body.endpoint.split("/").at(-1)}`} target="_blank" rel="noopener noreferrer">
                    <div className="px-4 py-2 bg-bg-sub border border-bg-acc rounded-md hover:opacity-50 transition-opacity">
                        <div className="flex space-x-4 items-center">
                            <AiFillGithub size={40} />
                            <p className="text-lg font-light">View this project on github</p>
                        </div>
                    </div>
                </a>
            </div>
            <div data-aos="fade-up" data-aos-offset="200">
                <div className="space-y-8">
                    <div className="grid place-items-center">
                        <Label text={"Comments"} />
                    </div>
                    <div id="inject-comments-for-uterances"></div>
                </div>
            </div>
        </div>
    </>
}

export default PostPage