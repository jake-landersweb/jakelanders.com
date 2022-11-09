import { useState, useEffect } from "react";
import { AiFillGithub } from 'react-icons/ai'
import { FiMail } from 'react-icons/fi'
import Link from "../link";
import { MdOutlineArticle } from "react-icons/md";
import { useRouter } from "next/router";
import { AiOutlineHome } from 'react-icons/ai'

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const router = useRouter()
    console.log(router.pathname == "/")

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        () => window.removeEventListener("scroll", handleScroll);
    }, [])


    return <div className="w-screen fixed top-0 left-0">
        <div className="grid grid-cols-3 gap-0 bg-bg auto-cols-max border-b border-b-bg-acc">
            <Link props={{
                href: "https://github.com/jake-landersweb",
                child: <div className="flex items-center space-x-2">
                    <AiFillGithub />
                    <p>Github</p>
                </div>,
                isExternal: true,
                className: "col-span-1 md:hover:bg-bg-sub transition-all text-center p-2 border-r-[0.5px] border-bg-sub grid place-items-center"
            }} />
            <Link props={{
                href: router.pathname == "/blog" ? "/" : "/blog",
                child: <div className="flex items-center space-x-2">
                    {router.pathname == "/blog" ? <AiOutlineHome /> : <MdOutlineArticle />}
                    <p>{router.pathname == "/blog" ? "Home" : "Blog"}</p>
                </div>,
                isExternal: false,
                className: "col-span-1 md:hover:bg-bg-sub transition-all text-center p-2 border-x-[0.5px] border-bg-sub grid place-items-center"
            }} />
            <Link props={{
                href: router.pathname == "/contact" ? "/" : "/contact",
                child: <div className="flex items-center space-x-2">
                    {router.pathname == "/contact" ? <AiOutlineHome /> : <FiMail />}
                    <p>{router.pathname == "/contact" ? "Home" : "Contact"}</p>
                </div>,
                isExternal: false,
                className: "col-span-1 md:hover:bg-bg-sub transition-all text-center p-2 border-l-[0.5px] border-bg-sub grid place-items-center"
            }} />
        </div>
    </div>


    // return (
    //     <div className={`${scrollY > 50 ? "bg-bg-sub shadow-md py-2" : "bg-bg py-4 bg-opacity-50 backdrop-blur-sm"} items-center w-screen grid place-items-center transition-all duration-300`}>
    //         <div className="flex items-center justify-between max-w-[2000px] w-full px-2 lg:px-20 md:px-10">
    //             <div className="flex space-x-4">
    //                 <div className="">
    //                     <Link href="/">
    //                         <a onClick={(e) => closeMenu()}>
    //                             {/* <h1 className={`text-2xl font-black transition-all duration-300`}>
    //                                 JL
    //                             </h1> */}
    //                             <Image props={{
    //                                 src: '/svg/logo.svg',
    //                                 alt: 'jake logo',
    //                                 divClass: 'w-[40px] h-[40px]',
    //                                 imgClass: ''
    //                             }} />
    //                         </a>
    //                     </Link>
    //                 </div>
    //             </div>
    //             {/* The full sized menu */}
    //             {menu("hidden md:flex space-x-2")}
    //             {/* Mobile menu */}
    //             {isOpen ? (
    //                 <button onClick={handleClick} className={`md:hidden text-txt-400 w-10 h-10 focus:outline-none fixed right-2 z-50`}>
    //                     <span className="sr-only">Open main menu</span>
    //                     <div
    //                         className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
    //                         <span aria-hidden="true" className={`${isOpen ? 'rotate-45' : '-translate-y-1.5'} block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}></span>
    //                         <span aria-hidden="true"
    //                             className={`${isOpen ? 'opacity-0' : ''}  block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out`}></span>
    //                         <span aria-hidden="true"
    //                             className={`${isOpen ? "-rotate-45" : "translate-y-1.5"}  block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out`}></span>
    //                     </div>
    //                 </button>
    //             ) : (
    //                 <button onClick={handleClick} className={`md:hidden text-txt-400 w-10 h-10 relative focus:outline-none`}>
    //                     <span className="sr-only">Open main menu</span>
    //                     <div
    //                         className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
    //                         <span aria-hidden="true" className={`${isOpen ? 'rotate-45' : '-translate-y-1.5'} block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}></span>
    //                         <span aria-hidden="true"
    //                             className={`${isOpen ? 'opacity-0' : ''}  block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out`}></span>
    //                         <span aria-hidden="true"
    //                             className={`${isOpen ? "-rotate-45" : "translate-y-1.5"}  block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out`}></span>
    //                     </div>
    //                 </button>
    //             )}
    //             <div
    //                 className={`top-0 right-0 w-[75vw] pt-[100px] space-y-2 px-2 bg-bg-acc fixed h-full z-40 ease-in-out duration-300 ${isOpen ? "translate-x-0 " : "translate-x-full"}`}>
    //                 {menu("space-y-2")}
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Header