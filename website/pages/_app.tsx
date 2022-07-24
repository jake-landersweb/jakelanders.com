import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header/header'
import Footer from '../components/footer'
import AOS from "aos";
import { useEffect } from 'react';
import HttpsRedirect from "react-https-redirect";

import "aos/dist/aos.css";

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
