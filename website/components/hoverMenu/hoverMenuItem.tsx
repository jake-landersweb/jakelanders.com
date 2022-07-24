import Link from "next/link"

type HoverMenuItemProps = {
    title: string
    route: string
}

const HoverMenuItem = ({ props }: { props: HoverMenuItemProps }) => {
    const { title, route, } = props

    return <>
        <li className="">
            <Link href={route}>
                <p className="hover:bg-black hover:bg-opacity-5 py-2 px-4 cursor-pointer">
                    {title}
                </p>
            </Link>
        </li>
    </>
}

export default HoverMenuItem