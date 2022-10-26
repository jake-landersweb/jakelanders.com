import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html style={{ "scrollPaddingTop": "50px" }} className="scroll-smooth bg-bg text-txt">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
