import Link from "next/link"
import { useRouter } from "next/router"


type HeaderItemProps = {
    route: string
    title: string
    icon: JSX.Element
    onTap: () => void
    isCollapsed: boolean
    isExternal?: boolean
}

const HeaderItem = ({ props }: { props: HeaderItemProps }) => {
    const { route, title, icon, onTap, isCollapsed, isExternal = false } = props

    const button = () => {
        return <div className="flex space-x-2 justify-center content-center items-center place-items-center text-xl font-bold px-4 py-1 rounded-md hover:opacity-50 transition-opacity">
            <div className="">
                {icon}
            </div>
            <h2>{title}</h2>
        </div>
    }

    return <>
        {isExternal ? <>
            <a href={route} onClick={onTap} target="_blank" rel="noopener noreferrer">
                {button()}
            </a>
        </> : <>
            <Link href={route}>
                <a onClick={onTap}>
                    {button()}
                </a>
            </Link>
        </>
        }
    </>

}

export default HeaderItem