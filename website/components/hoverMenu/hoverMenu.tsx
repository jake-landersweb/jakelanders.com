import HoverMenuItem from "./hoverMenuItem"

type HoverMenuProps = {
    label: JSX.Element
    titles: string[]
    routes: string[]
}

const HoverMenu = ({ props }: { props: HoverMenuProps }) => {
    const { label, titles, routes } = props

    return <>
        <div className="group inline relative">
            {label}
            <ul className="w-fit rounded-sm border-[1px] shadow-xl border-separate border-gray-200 bg-bg absolute py-2 invisible opacity-0 group-hover:opacity-100 scale-[.8] group-hover:scale-100 group-hover:visible transition-all duration-75">
                {Array(titles.length).fill(0).map((_, i) => (<><HoverMenuItem props={{
                    title: titles[i],
                    route: routes[i],
                }} /></>))}
            </ul>
        </div>

    </>
}

export default HoverMenu