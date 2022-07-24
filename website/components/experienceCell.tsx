import Image from "./image"

type ExperienceCellProps = {
    title: string
    dateRange: string
    imageSrc: string
    imageAlt: string
    description: string
}

const ExperienceCell = ({ props }: { props: ExperienceCellProps }) => {
    const { title, dateRange, imageSrc, imageAlt, description } = props
    return <>
        <div className="space-y-4 p-4 rounded-md">
            <div className="flex space-x-4 items-center ">
                <Image props={{
                    src: imageSrc,
                    alt: imageAlt,
                    divClass: "",
                    imgClass: "h-[75px] w-[75px] md:h-[100px] md:w-[100px] bg-bg-acc p-2 rounded-lg"
                }} />
                <div className="space-y-2">
                    <h3 className="text-3xl font-medium">{title}</h3>
                    <p className="text-txt-500 text-light">{dateRange}</p>
                </div>
            </div>
            <p className="md:pl-[120px] text-lg">{description}</p>
        </div>
    </>
}

export default ExperienceCell