import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Post from "../../data/post"
import ApiResponse from "../../data/response"
import Head from 'next/head'
import React, { useEffect } from "react";
import PostTags from "../../components/postTags"
import Label from "../../components/label"
import { AiFillGithub } from 'react-icons/ai'
import { IoPersonOutline } from 'react-icons/io5'
import { IoTimeOutline } from 'react-icons/io5'
import { MdUpdate } from 'react-icons/md'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import CodeBlock from "../../components/codeBlock";
import ReactMarkdown from "react-markdown";
import NextImage from "next/image";
import Image from "../../components/image";



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
            script.setAttribute("theme", "dark-blue");
            anchor.appendChild(script);
        }
    })

    const getGithubLink = () => {
        const list = postData.body.endpoint.split("/")
        return `https://github.com/jake-landersweb/code_vault/tree/main/${list[list.length - 1]}`
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

    const generateSlug = (text: string) => {
        return text.toLowerCase().split(" ").join("-")
    }

    const MarkdownComponents: object = {
        code({ node, inline, className, ...props }) {
            return CodeBlock({ node, inline, className, ...props })
        },
        blockquote({ node, inline, className, ...props }) {
            console.log(node)
            return <div className="pt-4 px-4 border border-bg-acc rounded-md">
                <div className="flex space-x-2 content-center text-txt-400">
                    <IoIosInformationCircleOutline size={20} />
                    <div className="font-mono text-sm">NOTE:</div>
                </div>
                <span {...props} />
            </div>
        },
        p: (paragraph: { children?: boolean; node?: any }) => {
            const { node } = paragraph

            if (node.children[0].tagName === "img") {
                const image = node?.children[0]
                const metastring = image?.properties?.alt
                const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
                const metaWidth = metastring?.match(/{([^}]+)x/)
                const metaHeight = metastring?.match(/x([^}]+)}/)
                const width = metaWidth ? metaWidth[1] : "768"
                const height = metaHeight ? metaHeight[1] : "432"
                const isPriority = metastring?.toLowerCase().match('{priority}')
                const hasCaption = metastring?.toLowerCase().includes('{caption:')
                const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

                return (
                    <div className="postImgWrapper">
                        <NextImage
                            src={image.properties.src}
                            width={width}
                            height={height}
                            className="postImg"
                            alt={alt}
                            priority={isPriority}
                        />
                        {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },
        a: (anchor: { href: string; children: Array<any> }) => {
            if (anchor.href.match('http')) {
                return (
                    <a
                        href={anchor.href}
                        target="_blank"
                        rel="noopener noreferrer">
                        {anchor.children}
                    </a>
                )
            }
            return <a href={anchor.href}>{anchor.children}</a>
        },
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
                        <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="0" className="">
                            <div className="flex space-x-4 items-center">
                                <Image props={{
                                    src: "/images/jake.jpg",
                                    alt: "jake hockey",
                                    divClass: "w-[100px] h-[100px]",
                                    imgClass: "rounded-full aspect-square"
                                }} />
                                <div className="">
                                    <p className="text-2xl font-bold tracking-tight">Jake Landers</p>
                                    <p className="text-txt-400">Developer and CEO SapphireNW</p>
                                    <p className="text-txt-400">{postData.body.created}</p>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl text-center" data-aos="fade-up" data-aos-offset="200" data-aos-delay="50">{postData.body.title}</h2>
                        <div className="grid place-items-center gap-y-4">
                            <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="100">
                                <PostTags tags={postData.body.tags} textSize="text-md" />
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="150" className="grid place-items-center">
                        <div className="prose prose-stone !prose-invert prose-a:text-main max-w-[92vw] md:max-w-[78vw] lg:max-w-[820px]">
                            {/* <div className="prose prose-stone !prose-invert"> */}
                            <ReactMarkdown
                                components={MarkdownComponents}
                            >
                                {post}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid place-items-center my-8">
                <a href={getGithubLink()} target="_blank" rel="noopener noreferrer">
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