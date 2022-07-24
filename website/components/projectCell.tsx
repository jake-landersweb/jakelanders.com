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
                <a href={link} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-all">Learn More &rarr;</a>
            </div>
        </div>
    </>
}

export default ProjectCell