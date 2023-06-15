import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../../public/global.css";
import { Baloo_2 } from "next/font/google";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const baloo_2 = Baloo_2({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={baloo_2.className}>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </main>
    </SessionProvider>
  );
}
