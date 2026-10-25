import type { AppProps } from "next/app";
import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const bengali = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

// The stylesheet reads both families through these variables.
const fontVars = `:root{--font-display:${display.style.fontFamily};--font-bn:${bengali.style.fontFamily}}`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: fontVars }} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
