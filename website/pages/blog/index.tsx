import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ApiResponse from '../../data/response'
import PageData from '../../data/pageData'
import Post from '../../data/post'
import PostCell from '../../components/postCell'
import Link from 'next/link'
import BlogNav from '../../components/blogNav/blogNav'
import PostList from '../../components/postList'
import { IoSearchOutline } from 'react-icons/io5'
import { useRouter } from 'next/router'

import * as React from "react";
import Field from '../../components/form/field'
import BlogSearch from '../../components/blogSearch'
import Label from '../../components/label'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async (context) => {
    var page = 1
    if (context.query['page'] != undefined) {
        page = Number(context.query['page'])
    }
    const pageSize = 10
    const b = {
        "pageSize": pageSize,
        "page": page,
    }

    const response = await fetch(`${process.env.HOST!}/posts`, {
        method: "PUT",
        headers: [["Content-Type", "application/json"], ["x-api-key", process.env.KEY!.toString()]],
        body: JSON.stringify(b)
    })


    var pageData: ApiResponse<PageData> = await response.json()

    return {
        props: {
            pageData,
            page,
            pageSize
        }
    }
}

const Blog = ({ pageData, page, pageSize }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <Head>
            <title>Jake Landers - Blog</title>
            <meta name="keywords" content="jake,landers,developer,northwest,pnw,portland,software,coding,blog,swiftui,flutter,python,dart,swift,go,api,nextjs" id="keywords" />
        </Head>
        <div className="space-y-32">
            <div className="grid place-items-center">
                <BlogSearch props={{
                    title: 'Latest Post',
                    initialValue: ''
                }} />
            </div>
            <div className="space-y-4 md:space-y-8">
                <div className="grid place-items-center">
                    <Label text={`Page ${page}`} />
                </div>
                <PostList posts={pageData.body.posts} />
            </div>
            <div className="grid place-items-center">
                <BlogNav props={{
                    page: page,
                    totalPages: pageData.body.total,
                    pageSize: pageSize,
                    hasMore: pageData.body.hasMore,
                }} />
            </div>
        </div>
    </>
}

export default Blog