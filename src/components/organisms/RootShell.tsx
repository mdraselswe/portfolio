import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Language } from "@/types/context";
import "@/app/globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bengali = Hind_Siliguri({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

// Runs before first paint so the saved theme never flashes.
const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("theme");t=t?JSON.parse(t):null;if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.classList.add(t)}catch(e){}})();`;

/** The <html> shell shared by the English (/) and Bangla (/bn) pages. */
export default function RootShell({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${display.variable} ${bengali.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>
            {".reveal{opacity:1!important;transform:none!important}.draw{transform:none!important}"}
          </style>
        </noscript>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
