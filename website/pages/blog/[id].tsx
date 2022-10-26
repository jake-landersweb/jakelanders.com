import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Post from "../../data/post"
import ApiResponse from "../../data/response"
import Head from 'next/head'
import React, { useEffect, useState } from "react";
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
        // create navigation header

    })

    const getNav = () => {
        const navItems = []
        const postLines = post.split("\n")
        const tempHeaders = []
        for (var i = 0; i < postLines.length; i++) {
            const line: string = postLines[i]
            if (line.startsWith("## ")) {
                const newTitle = line.split(" ")
                newTitle.shift()
                tempHeaders.push({ "title": newTitle.join(" "), "children": [] })
            }
            if (line.startsWith("### ")) {
                var last = tempHeaders.pop()
                const newTitle = line.split(" ")
                newTitle.shift()
                last['children'].push({ "title": newTitle.join(" "), "children": [] })
                tempHeaders.push(last)
            }
            if (line.startsWith("#### ")) {
                var last = tempHeaders.pop()
                var lastlast = last['children'].pop()
                const newTitle = line.split(" ")
                newTitle.shift()
                lastlast['children'].push({ "title": newTitle.join(" "), "children": [] })
                last['children'].push(lastlast)
                tempHeaders.push(last)
            }
        }
        for (var i = 0; i < tempHeaders.length; i++) {
            const currentHeader = tempHeaders[i]
            if (currentHeader['children'].length == 0) {
                navItems.push(createNavLink(currentHeader['title'], "text-lg font-medium text-txt-200 hover:opacity-70"))
            } else {
                const subHeaders = []
                // loop through children
                for (var j = 0; j < currentHeader['children'].length; j++) {
                    const subHeader = currentHeader['children'][j]
                    if (subHeader['children'].length == 0) {
                        subHeaders.push(createNavLink(subHeader['title'], "text-txt-400 hover:text-main"))
                    } else {
                        const subsubHeaders = []
                        for (var g = 0; g < subHeader['children'].length; g++) {
                            const subsubHeader = subHeader['children'][g]
                            subsubHeaders.push(createNavLink(subsubHeader['title'], "text-txt-500 hover:text-main"))
                        }
                        subHeaders.push(<div>{createNavLink(subHeader['title'], "text-txt-400 hover:text-main")}<div className="pl-4">{subsubHeaders}</div></div>)
                    }
                }
                navItems.push(<div>{createNavLink(currentHeader['title'], "text-lg font-medium text-txt-200 hover:opacity-70")}<div className="pl-4">{subHeaders}</div></div>)
            }
        }
        return navItems
    }

    const createNavLink = (title: string, className: string = "") => {
        return <a className={`transition-all ${className}`} href={`#${generateSlug(title)}`}><p className="whitespace-nowrap">{title}</p></a>
    }

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

    const generateSlug = (str: string) => {

        str = str?.replace(/^\s+|\s+$/g, '')
        str = str?.toLowerCase()
        const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
        const to = 'aaaaaeeeeiiiioooouuuunc------'

        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
        }

        str = str?.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')

        return str
    }

    const MarkdownComponents: object = {
        code({ node, inline, className, ...props }) {
            return CodeBlock({ node, inline, className, ...props })
        },
        blockquote({ node, inline, className, ...props }) {
            return <div className="pt-4 px-4 border border-bg-acc rounded-md">
                <div className="flex space-x-2 content-center text-txt-400">
                    <IoIosInformationCircleOutline size={20} />
                    <div className="font-mono text-sm">NOTE:</div>
                </div>
                <span {...props} />
            </div>
        },
        // remove large headers, as they are most likely a mistake
        h1: (props: any) => {
            return <div className=""></div>
        },
        h2: (props: any) => {
            const arr = props.children
            let heading = ''

            for (let i = 0; i < arr.length; i++) {
                if (arr[i]?.type !== undefined) {
                    for (let j = 0; j < arr[i].props.children.length; j++) {
                        heading += arr[i]?.props?.children[0]
                    }
                } else heading += arr[i]
            }

            const slug = generateSlug(heading)
            return <h2 id={slug} {...props}></h2>
        },
        h3: (props: any) => {
            const arr = props.children
            let heading = ''

            for (let i = 0; i < arr.length; i++) {
                if (arr[i]?.type !== undefined) {
                    for (let j = 0; j < arr[i].props.children.length; j++) {
                        heading += arr[i]?.props?.children[0]
                    }
                } else heading += arr[i]
            }

            const slug = generateSlug(heading)

            return <h3 id={slug} {...props}></h3>
        },
        h4: (props: any) => {
            const arr = props.children
            let heading = ''

            for (let i = 0; i < arr.length; i++) {
                if (arr[i]?.type !== undefined) {
                    for (let j = 0; j < arr[i].props.children.length; j++) {
                        heading += arr[i]?.props?.children[0]
                    }
                } else heading += arr[i]
            }

            const slug = generateSlug(heading)
            return <h4 id={slug} {...props}></h4>
        },
        p: (paragraph: { children?: boolean; node?: any }) => {
            const { node } = paragraph

            if (node.children[0].tagName === "img") {
                const image = node?.children[0]
                const metastring = image?.properties?.alt
                const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
                const hasCaption = metastring?.toLowerCase().includes('{caption:')
                const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

                return (
                    <div className="postImgWrapper grid place-items-center">
                        <img src={image.properties.src} alt={alt} className={`postImg object-scale-down max-h-[500px]`} />
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
                    <div className="flex flex-row-reverse" data-aos="fade-up" data-aos-offset="200" data-aos-delay="100">
                        <div className="hidden md:block bg-bg-sub rounded-md border border-bg-acc ml-4 sticky inset-x-0 top-[75px] left-0 h-min max-h-[70vh] w-max">
                            <div className="overflow-y-scroll max-h-[70vh]">
                                <p className="text-2xl font-bold text-center bg-bg-acc p-2 whitespace-nowrap sticky top-0">Table of Contents</p>
                                <div className="p-4">
                                    {getNav()}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 place-items-center">
                            <div className="prose prose-stone !prose-invert prose-a:text-main max-w-full col-span-4">
                                <ReactMarkdown components={MarkdownComponents}>
                                    {post}
                                </ReactMarkdown>
                            </div>
                        </div>
                        {/* <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="150" className="">
                            <div className="prose prose-stone !prose-invert prose-a:text-main max-w-[92vw] md:max-w-[78vw] lg:max-w-[820px]">
                            <div className="prose prose-stone !prose-invert prose-a:text-main">
                                <ReactMarkdown components={MarkdownComponents}>
                                    {post}
                                </ReactMarkdown>
                            </div>
                        </div> */}
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