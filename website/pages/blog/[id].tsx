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

import theme from "../../components/theme"

import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift'
import dart from 'react-syntax-highlighter/dist/cjs/languages/prism/dart'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go'
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'

import rangeParser from 'parse-numeric-range'
import Image from "../../components/image";

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('swift', json)
SyntaxHighlighter.registerLanguage('swift', swift)
SyntaxHighlighter.registerLanguage('swift', dart)
SyntaxHighlighter.registerLanguage('swift', python)
SyntaxHighlighter.registerLanguage('swift', go)
SyntaxHighlighter.registerLanguage('swift', java)
SyntaxHighlighter.registerLanguage('swift', yaml)


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

    const MarkdownComponents: object = {
        code({ node, inline, className, ...props }) {

            const match = /language-(\w+)/.exec(className || '')
            const hasMeta = node?.data?.meta

            const applyHighlights: object = (applyHighlights: number) => {
                if (hasMeta) {
                    const RE = /{([\d,-]+)}/
                    const metadata = node.data.meta?.replace(/\s/g, '')
                    const strlineNumbers = RE?.test(metadata)
                        ? RE?.exec(metadata)[1]
                        : '0'
                    const highlightLines = rangeParser(strlineNumbers)
                    const highlight = highlightLines
                    const data: string = highlight.includes(applyHighlights)
                        ? 'highlight'
                        : null
                    return { data }
                } else {
                    return {}
                }
            }

            return match ? (
                <SyntaxHighlighter
                    children={post}
                    style={theme}
                    language={match[1]}
                    PreTag="div"
                    className="codeStyle"
                    showLineNumbers={false}
                    wrapLines={hasMeta ? true : false}
                    useInlineStyles={true}
                    lineProps={applyHighlights}
                    {...props}
                />
            ) : (
                <code className={className} {...props} />
            )
        }
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