import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { IoSearchOutline } from "react-icons/io5"
import BlogSearch from "../../../components/blogSearch"
import Field from "../../../components/form/field"
import PostList from "../../../components/postList"
import PageData from "../../../data/pageData"
import ApiResponse from "../../../data/response"

export const getServerSideProps: GetServerSideProps = async (context) => {
    var searchText = null
    var tag = null
    if (context.query['searchText'] != undefined) {
        searchText = context.query['searchText']
    }
    if (context.query['tag'] != undefined) {
        tag = context.query['tag']
    }

    const pageSize = 4
    const b = {
        "pageSize": 1000,
        "page": 1,
        "searchText": searchText,
        "tag": tag
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
            searchText,
            tag
        }
    }
}

const Search = ({ pageData, searchText, tag }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <>
        <Head>
            <title>Jake Landers - Search</title>
            <meta name="keywords" content="jake,landers,developer,northwest,pnw,portland,software,coding,blog,swiftui,flutter,python,dart,swift,go,api,nextjs" id="keywords" />
        </Head>
        <div className="space-y-32">
            <div className="grid place-items-center">
                <BlogSearch props={{
                    title: `Results for '${searchText == undefined ? tag : searchText}'`,
                    initialValue: searchText == undefined ? "" : searchText
                }} />
            </div>
            <PostList posts={pageData.body.posts} />
        </div>
    </>
}

export default Search