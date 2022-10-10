import Image from "./image"
import Label from "./label"
import Link from "./link"

const Footer = () => {

    return <div className="space-y-8">
        <footer className="p-4 bg-bg-sub shadow md:px-6 md:py-8">
            <div className="flex items-center">
                <Link props={{
                    href: "https://sapphirenw.com",
                    child: <div className="flex items-center">
                        <Image props={{
                            src: "/svg/sapphire.svg",
                            alt: "Sapphire Logo",
                            divClass: undefined,
                            imgClass: "mr-3 h-8"
                        }} />
                        <h1 className='font-bold tracking-tight text-3xl'>Sapphire</h1>

                    </div>,
                    isExternal: true,
                    className: undefined
                }} />
            </div>
            <hr className="my-6 border-bg-acc sm:mx-auto  lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://sapphirenw.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Sapphire™</a>. All Rights Reserved.
            </span>
        </footer>
    </div>

}

export default Footer