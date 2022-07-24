import Link from "next/link"
import BlogNavCell from "./blogNavCell"

type BlogNavProps = {
    page: number
    totalPages: number
    pageSize: number
    hasMore: boolean
}

const BlogNav = ({ props }: { props: BlogNavProps }) => {
    const { page, totalPages, pageSize, hasMore } = props
    // compose page numbers
    var pages = []
    for (var i = 0; i < (totalPages / pageSize); i++) {
        var extension = ""
        if (i != 0) {
            extension = `?page=${i + 1}`
        }
        pages.push(<BlogNavCell props={{
            name: (i + 1).toString(),
            isCurrent: i + 1 == page,
            destination: `/blog${extension}`
        }} />)
        // pages.push(<div><Link href={`/blog${extension}`}><a className={`${i + 1 == page ? "text-main font-bold" : ""}`}>{i + 1}</a></Link></div>)
    }
    // add next page
    // if (hasMore) {
    //     const nextPage = page + 1
    //     pages.push(<div><Link href={`/blog?page=${nextPage}`}><a className="text-main font-bold">Next Page</a></Link></div>)
    // }
    // // add prev page
    // if (page != 1) {
    //     const prevPage = page - 1
    //     var extension = ""
    //     if (prevPage != 1) {
    //         extension = `?page=${prevPage}`
    //     }
    //     pages.unshift(<div><Link href={`/blog${extension}`}><a className="text-main font-bold">Previous Page</a></Link></div>)
    // }

    return <>

        <div className="flex space-x-2">
            {pages}
        </div>
    </>
}

export default BlogNav