import Link from "next/link"

const PostTags = ({ tags, textSize }: { tags: string, textSize?: string }) => {
    // compose tag list
    const tagList = tags.split(",")

    const tagItems = []

    for (var i = 0; i < tagList.length; i++) {
        tagItems.push(<Link href={`/blog/search?tag=${tagList[i]}`}>
            <a><p className={`${textSize == undefined ? "text-sm" : textSize} mr-1 mt-1 px-2 py-1 bg-main rounded-md hover:opacity-50`}>{`#${tagList[i]}`}</p></a>
        </Link>)
    }

    return <>
        <div className="flex flex-wrap">
            {tagItems}
        </div>
    </>
}

export default PostTags