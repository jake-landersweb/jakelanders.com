import Link from "next/link"
import Image from "./image"

const Footer = () => {
    return <div id="footer" className="">
        <div className="bg-bg-sub p-8 divide-y w-full">
            <div className="grid place-items-center">
                <h4 className="m-8">
                    Powered by <span><a href="https://landersweb.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:opacity-50 transition-opacity">Landersweb</a></span>
                </h4>
            </div>
        </div>
    </div>
}

export default Footer