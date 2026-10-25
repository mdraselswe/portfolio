import About from "@/components/organisms/About";
import Contact from "@/components/organisms/Contact";
import Effects from "@/components/atoms/Effects";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import Hero from "@/components/organisms/Hero";
import JsonLd from "@/components/atoms/JsonLd";
import Projects from "@/components/organisms/Projects";
import Skills from "@/components/organisms/Skills";
import SiteScript from "@/components/atoms/SiteScript";
import SkipLink from "@/components/atoms/SkipLink";
import { buildJsonLd } from "@/lib/seo";
import type { Language } from "@/types/context";

/** One page, two languages, rendered to static HTML. `SiteScript` is the only JavaScript it ships. */
export default function HomePage({ lang }: { lang: Language }) {
  return (
    <>
      <JsonLd data={buildJsonLd(lang)} />
      <SkipLink lang={lang} />
      <Effects />
      <Header lang={lang} />
      <main id="main" className="overflow-x-clip">
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <SiteScript />
    </>
  );
}
