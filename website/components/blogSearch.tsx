import { useRouter } from "next/router"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import Field from "./form/field"

type BlogSearchProps = {
    title: string
    initialValue?: string
}

const BlogSearch = ({ props }: { props: BlogSearchProps }) => {
    const { title, initialValue = "" } = props

    const [searchText, setSearchText] = useState(initialValue)

    const router = useRouter()

    const search = () => {
        router.push(`/blog/search?searchText=${searchText}`);
    }

    return <>
        <div className="space-y-8">
            <h2 id="test" className='text-4xl md:text-6xl text-center font-bold'>{title}</h2>
            <div className="flex space-x-2 items-center max-w-2xl mx-auto">
                <Field props={{
                    value: searchText,
                    label: '',
                    placeholder: 'Search Posts',
                    errorText: '',
                    inputType: 'search',
                    onChanged: function (val: string): void {
                        setSearchText(val)
                    },
                    isValid: true,
                    isTextArea: false,
                    rows: 0,
                    columns: 0,
                    height: ''
                }} />
                <button onClick={search}><div className='hover:opacity-50 transition-opacity'><IoSearchOutline size={30} /></div></button>
            </div>
        </div>
    </>
}

export default BlogSearch