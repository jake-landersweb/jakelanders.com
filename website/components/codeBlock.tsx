import rangeParser from 'parse-numeric-range'
import { BiCopy, BiCheck } from 'react-icons/bi'

import theme from "./theme2"

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift'
import dart from 'react-syntax-highlighter/dist/cjs/languages/prism/dart'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go'
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'
import { useState } from 'react'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('swift', json)
SyntaxHighlighter.registerLanguage('swift', swift)
SyntaxHighlighter.registerLanguage('swift', dart)
SyntaxHighlighter.registerLanguage('swift', python)
SyntaxHighlighter.registerLanguage('swift', go)
SyntaxHighlighter.registerLanguage('swift', java)
SyntaxHighlighter.registerLanguage('swift', yaml)

const CodeBlock = ({ node, inline, className, ...props }) => {

    const [copied, setCopied] = useState(false)

    const copy = () => {
        navigator.clipboard.writeText(node?.children[0].value)
        setCopied(true)
        setTimeout(function () {
            setCopied(false)
        }, 3000);
    }


    const match = /language-(\w+)/.exec(className || '')
    const hasMeta = node?.data?.meta

    const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
            const RE = /{([\d,-]+)}/
            const metadata = node.data.meta?.replace(/\s/g, '')
            const strlineNumbers = RE?.test(metadata)
                ? RE?.exec(metadata)[1]
                : '0'
            const highlightLines = rangeParser(strlineNumbers)
            const highlight = highlightLines
            const data: string = highlight.includes(applyHighlights)
                ? 'highlight'
                : 'no-highlight'
            return { data }
        } else {
            return {}
        }
    }

    return match ? (
        <div className="relative group">
            <div className="absolute opacity-0 group-hover:opacity-100 z-10 right-0 top-0 transition-all">
                <button onClick={() => copy()} aria-label="Copy to clipboard" className="p-2 bg-bg-acc rounded-md m-2 hover:opacity-50 transition-all">
                    {copied ? <BiCheck size={25} /> : <BiCopy size={25} />}
                </button>
            </div>
            <SyntaxHighlighter
                style={theme}
                language={match[1]}
                PreTag="div"
                className="codeStyle"
                showLineNumbers={true}
                wrapLines={hasMeta ? true : false}
                useInlineStyles={true}
                lineProps={applyHighlights}
                {...props}
            >{ }</SyntaxHighlighter>
        </div>
    ) : (
        <code style={{ float: "none" }} className="!bg-bg-acc px-2 py-[2px] rounded-md" {...props} />
    )
}

export default CodeBlock