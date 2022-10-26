import Link from "next/link"

const PostTags = ({ tags, textSize }: { tags: string, textSize?: string }) => {
    // compose tag list
    const tagList = tags.split(",")

    const tagItems = []

    for (var i = 0; i < tagList.length; i++) {
        tagItems.push(<PostTag tag={tagList[i]} textSize={textSize} />)
    }

    return <>
        <div className="flex flex-wrap">
            {tagItems}
        </div>
    </>
}

const PostTag = ({ tag, textSize }: { tag: string, textSize?: string }) => {
    function genBackgroundColor(stringInput) {
        // switch statement to allow for pre-defined tag colors
        switch (stringInput.toLowerCase()) {
            case "flutter": return "hsl(212, 69%, 51%)"
            case "crosscheck": return "hsl(191, 53%, 66%)"
            case "swiftui": return "hsl(191, 100%, 50%)"
            case "swift": return "hsl(7, 88%, 55%)"
            case "dart": return "hsl(206, 96%, 30%)"
            case "python": return "hsl(208, 47%, 41%)"
            default:
                let stringUniqueHash = [...stringInput].reduce((acc, char) => {
                    return char.charCodeAt(0) + ((acc << 5) - acc);
                }, 0);
                return `hsl(${stringUniqueHash % 360}, 90%, 80%)`;
        }
    }

    function genTextColor(stringInput) {
        switch (stringInput.toLowerCase()) {
            case "flutter":
            case "crosscheck":
            case "swift":
            case "dart":
            case "swiftui":
                return "#ffffff"
            case "python":
                return "#f7ca3e"
            default:
                return "#494951"
        }
    }

    return <Link href={`/blog/search?tag=${tag}`}>
        <a>
            <p style={{ "backgroundColor": genBackgroundColor(tag), "color": genTextColor(tag) }} className={`${textSize == undefined ? "text-sm" : textSize} mr-2 rounded-md hover:opacity-50 font-medium transition-opacity px-2 py-1 text-white`}>{`#${tag}`}</p>
        </a>
    </Link>
}

export default PostTags