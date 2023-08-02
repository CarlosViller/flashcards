import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../../public/global.css";
import { Baloo_2 } from "next/font/google";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import Head from "next/head";

const baloo_2 = Baloo_2({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          rel="icon"
          href="/icon.png"
        />
        <title>Kartu - Create your own flashcards</title>
      </Head>
      <main className={baloo_2.className}>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </main>
    </SessionProvider>
  );
}
