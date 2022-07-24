import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header/header'
import Footer from '../components/footer'
import AOS from "aos";
import { useEffect } from 'react';
import HttpsRedirect from "react-https-redirect";

import "aos/dist/aos.css";
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return <>
    <HttpsRedirect>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="description"
          content="Portland software developer with a specialty in Flutter, Kubernetes, and Golang"
        />
        <meta name="author" content="Landersweb LLC" />
        <meta
          name="keywords"
          content="jake,landers,developer,northwest,pnw,portland,software,coding,blog,swiftui,flutter,python,dart,swift,go,api,nextjs"
          id="keywords"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-QFC8XN57WJ`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QFC8XN57WJ', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <div className="text-txt bg-bg scroll-smooth">
        <div className="grid place-items-center">
          <div className="fixed top-0 z-50">
            <Header />
          </div>
          <div className="relative w-full max-w-[1200px] px-4 lg:px-20 md:px-10 min-h-screen pt-[100px] pb-24 md:pb-36">
            <Component {...pageProps} />
          </div>
          <div className="pt-4 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </HttpsRedirect>
  </>
}

export default MyApp
