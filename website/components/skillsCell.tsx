import Image from "./image"

type SkillsCellProps = {
    title: string
    imageSrc: string
    imageAlt: string
    description: string
    subTitle: string
    body: JSX.Element
}

const SkillsCell = ({ props }: { props: SkillsCellProps }) => {
    const { title, imageSrc, imageAlt, description, subTitle, body } = props
    return <>
        <div className="space-y-4 p-4 bg-bg-sub border border-bg-acc rounded-md">
            <div className="grid place-items-center">
                <div className="flex space-x-2 items-center">
                    <Image props={{
                        src: imageSrc,
                        alt: imageAlt,
                        divClass: "h-[50px] w-[50px]",
                        imgClass: ""
                    }} />
                    <h3 className="text-2xl font-medium">{title}</h3>
                </div>
            </div>
            <div className="grid place-items-center">
                <div className="space-y-4">
                    <p className="text-center">{description}</p>
                    <div className="grid place-items-center space-y-2">
                        <p className="text-lg pb-1 px-2 border-b border-gray-400">{subTitle}</p>
                        {body}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SkillsCell