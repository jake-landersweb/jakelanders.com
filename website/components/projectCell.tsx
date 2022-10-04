import Image from "./image"

type ProjectCellProps = {
    title: string
    imageSrc: string
    imageAlt: string
    description: string
    link: string
    imageClass?: string
}

const ProjectCell = ({ props }: { props: ProjectCellProps }) => {
    const { title, imageSrc, imageAlt, description, link, imageClass = "" } = props

    return <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-opacity-20 lg:h-12 lg:w-12">
            <Image props={{
                src: imageSrc,
                alt: imageAlt,
                divClass: "h-[50px] w-[50px]",
                imgClass: imageClass
            }} />
        </div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-main dark:hover:text-main transition-opacity">Learn More &rarr;</a>
    </div>

    return <>
        <div className="space-y-4">
            <div className="grid place-items-center">
                <div className="flex space-x-4 items-center">
                    <Image props={{
                        src: imageSrc,
                        alt: imageAlt,
                        divClass: "h-[75px] w-[75px]",
                        imgClass: imageClass
                    }} />
                    <h3 className="text-3xl font-medium">{title}</h3>
                </div>
            </div>
            <p className="text-center text-lg">{description}</p>
            <div className="grid place-items-center">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-main dark:hover:text-main transition-opacity">Learn More &rarr;</a>
            </div>
        </div>
    </>
}

export default ProjectCell