import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../../public/global.css";
import { Baloo_2 } from "next/font/google";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "@/ToastContext";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/shared/Header";
import { MobileSearchProvider } from "@/MobileSearchContext";
import MobileSearch from "@/components/MobileSearch";
import { useMediaQuery } from "@/utils";
config.autoAddCss = false;

const baloo_2 = Baloo_2({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const isMobile = useMediaQuery(500);

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <MobileSearchProvider>
          <Head>
            <meta name="author" content="Carlos Villermosa" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="UTF-8" />
            <meta
              property="og:title"
              content="Kartu - Create your own flashcards"
            />
            <meta
              property="og:site_name"
              content="Kartu - Create your own flashcards"
            />
            <meta property="og:url" content={baseURL} />
            <meta
              property="og:description"
              content="A web app to create and share flashcards."
            />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`${baseURL}/icon.png`} />
            <link rel="icon" href="/icon.png" />
            <title>Kartu - Create your own flashcards</title>
          </Head>
          <MobileSearch />
          <Header />
          <main className={`${baloo_2.className}`}>
            <Suspense fallback={<Loading />}>
              <Component {...pageProps} />
              <ToastContainer
                className="mt-14 text-xs"
                position={isMobile ? "bottom-right" : "top-right"}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Suspense>
          </main>
        </MobileSearchProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
