import fs from "node:fs";
import path from "node:path";
import Document, { Head, Html, Main, NextScript } from "next/document";

type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

/**
 * Inlines the stylesheet instead of linking it, so first paint waits for one HTML response and
 * nothing else (the Pages Router equivalent of App Router's `inlineCss`).
 */
class InlineCssHead extends Head {
  getCssLinks(files: DocumentFiles) {
    const distDir = process.env.NEXT_DIST_DIR || ".next";
    return files.allFiles
      .filter((file) => file.endsWith(".css"))
      .map((file) => (
        <style
          key={file}
          data-href={`/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(path.join(process.cwd(), distDir, file), "utf8"),
          }}
        />
      ));
  }
}

// Runs before first paint so the saved theme never flashes.
const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("theme");t=t?JSON.parse(t):null;if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.classList.add(t)}catch(e){}})();`;

export default class SiteDocument extends Document {
  render() {
    const lang = this.props.__NEXT_DATA__.page === "/bn" ? "bn" : "en";

    return (
      <Html lang={lang}>
        <InlineCssHead>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <noscript>
            <style>
              {".reveal{opacity:1!important;transform:none!important}.draw{transform:none!important}" +
                ".marquee-track,.animate-bob,.aurora i,.ping-dot{animation-play-state:running!important}"}
            </style>
          </noscript>
        </InlineCssHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
