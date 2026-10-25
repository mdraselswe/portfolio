import Head from "next/head";
import { headFor, SITE } from "@/lib/seo";
import type { Language } from "@/types/context";

/** Title, description, canonical, hreflang, robots, Open Graph and Twitter tags for one page. */
export default function SeoHead({ lang }: { lang: Language }) {
  const h = headFor(lang);

  return (
    <Head>
      <title>{h.title}</title>
      <meta name="description" content={h.description} />
      <meta name="keywords" content={h.keywords} />
      <meta name="author" content={SITE.name} />
      <meta name="creator" content={SITE.name} />
      <meta name="publisher" content={SITE.name} />
      <meta name="application-name" content={`${SITE.name} Portfolio`} />
      <meta name="robots" content={h.robots} />
      <meta name="googlebot" content={h.robots} />
      {h.googleVerification && (
        <meta name="google-site-verification" content={h.googleVerification} />
      )}

      <link rel="canonical" href={h.canonical} />
      {h.alternates.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {h.themeColors.map((c) => (
        <meta key={c.media} name="theme-color" media={c.media} content={c.color} />
      ))}

      <meta property="og:type" content={h.og.type} />
      <meta property="og:locale" content={h.og.locale} />
      <meta property="og:locale:alternate" content={h.og.alternateLocale} />
      <meta property="og:url" content={h.og.url} />
      <meta property="og:site_name" content={h.og.siteName} />
      <meta property="og:title" content={h.title} />
      <meta property="og:description" content={h.description} />
      <meta property="og:image" content={h.og.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={h.og.imageAlt} />
      <meta property="profile:first_name" content="Muhammad" />
      <meta property="profile:last_name" content="Rasel" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@mdraselswe" />
      <meta name="twitter:title" content={h.title} />
      <meta name="twitter:description" content={h.description} />
      <meta name="twitter:image" content={h.og.image} />
    </Head>
  );
}
