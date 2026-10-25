import { siteScript } from "@/lib/siteScript";

/** Inlines the page's only script. No request, no framework: see `src/lib/siteScript.ts`. */
export default function SiteScript() {
  return <script dangerouslySetInnerHTML={{ __html: `(${siteScript.toString()})();` }} />;
}
