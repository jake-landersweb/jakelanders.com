import Link from "next/link"

type BlogNavCellProps = {
    name: string
    isCurrent: boolean
    destination: string
}

const BlogNavCell = ({ props }: { props: BlogNavCellProps }) => {
    const { name, isCurrent, destination } = props
    return <>
        <div className="">
            <Link href={destination} passHref>
                <a >
                    <div className={`${isCurrent ? "bg-main border-main border" : "bg-bg-sub border-bg-acc border"} px-4 py-2 rounded-md hover:opacity-50`}>
                        <p className="text-lg w-[10px]">{name}</p>
                    </div>
                </a>
            </Link>
        </div>
    </>
}

export default BlogNavCell