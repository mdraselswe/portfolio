import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { pathFor } from "@/lib/i18n";
import type { Language } from "@/types/context";

export const SITE = {
  url: "https://mdrasel.site",
  name: "Muhammad Rasel",
  title: "Muhammad Rasel | Frontend & React Developer, Software Engineer",
  description:
    "Software Engineer and Frontend Developer in Dhaka. 8+ years of React.js, Next.js and TypeScript. I make the decisions and use AI assistants to build fast.",
  email: "mdraselswe@gmail.com",
  roles: ["Software Engineer", "Frontend Developer", "React Developer"],
  social: {
    github: "https://github.com/mdraselswe",
    linkedin: "https://www.linkedin.com/in/mdraselswe",
    x: "https://x.com/mdraselswe",
    facebook: "https://facebook.com/mdraselswe",
  },
} as const;

const COPY = {
  en: {
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
    ogAlt: "Muhammad Rasel: Software Engineer, Frontend Developer and React Developer",
  },
  bn: {
    title: "মোহাম্মদ রাসেল | ফ্রন্টএন্ড ও রিঅ্যাক্ট ডেভেলপার, সফটওয়্যার ইঞ্জিনিয়ার",
    description:
      "মোহাম্মদ রাসেল ঢাকার সফটওয়্যার ইঞ্জিনিয়ার ও ফ্রন্টএন্ড ডেভেলপার। React.js, Next.js ও TypeScript-এ ৮+ বছরের অভিজ্ঞতা। সিদ্ধান্ত নিজের, কাজ দ্রুত এআই সহকারীর সাহায্যে।",
    locale: "bn_BD",
    ogAlt: "মোহাম্মদ রাসেল: সফটওয়্যার ইঞ্জিনিয়ার, ফ্রন্টএন্ড ডেভেলপার ও রিঅ্যাক্ট ডেভেলপার",
  },
} as const;

export const KEYWORDS = [
  "Muhammad Rasel",
  "Muhammad Rasel developer",
  "mdrasel",
  "mdraselswe",
  "Software Engineer",
  "Frontend Developer",
  "React Developer",
  "React.js Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Senior Frontend Developer",
  "Frontend Engineer Bangladesh",
  "Frontend Developer Dhaka",
  "React Developer Bangladesh",
  "Hire React Developer",
  "Web Developer Portfolio",
  "AI-assisted developer",
  "LLM API developer",
  "Claude Code",
  "মোহাম্মদ রাসেল",
  "ফ্রন্টএন্ড ডেভেলপার",
  "রিঅ্যাক্ট ডেভেলপার",
  "ওয়েব ডেভেলপার বাংলাদেশ",
  "এআই ওয়েব ডেভেলপমেন্ট",
];

/** Absolute URL of a page, without a trailing slash on the home page (matches og:url). */
export const pageUrl = (lang: Language) =>
  `${SITE.url}${pathFor(lang) === "/" ? "" : pathFor(lang)}`;

/** Everything the page <head> needs, per language. Rendered by `SeoHead`. */
export function headFor(lang: Language) {
  const copy = COPY[lang];
  const other = lang === "en" ? "bn" : "en";
  return {
    title: copy.title,
    description: copy.description,
    keywords: KEYWORDS.join(", "),
    canonical: pageUrl(lang),
    alternates: [
      { hrefLang: "en", href: SITE.url },
      { hrefLang: "bn", href: `${SITE.url}/bn` },
      { hrefLang: "x-default", href: SITE.url },
    ],
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    og: {
      type: "profile",
      locale: copy.locale,
      alternateLocale: COPY[other].locale,
      url: pageUrl(lang),
      siteName: `${SITE.name} Portfolio`,
      image: `${SITE.url}/og.png`,
      imageAlt: copy.ogAlt,
    },
    themeColors: [
      { media: "(prefers-color-scheme: light)", color: "#f2f4f0" },
      { media: "(prefers-color-scheme: dark)", color: "#0b1210" },
    ],
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  };
}

const personId = `${SITE.url}/#person`;
const siteId = `${SITE.url}/#website`;

const knowsAbout = Array.from(new Set(skills.en.flatMap((c) => c.skills)));

export function buildJsonLd(lang: Language) {
  const copy = COPY[lang];
  const url = pageUrl(lang);

  const person = {
    "@type": "Person",
    "@id": personId,
    name: SITE.name,
    alternateName: ["Rasel", "mdraselswe", "মোহাম্মদ রাসেল"],
    url: SITE.url,
    image: `${SITE.url}/og.png`,
    jobTitle: [...SITE.roles],
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    knowsAbout,
    knowsLanguage: ["en", "bn"],
    sameAs: Object.values(SITE.social),
    mainEntityOfPage: { "@id": `${url}#profile` },
  };

  const website = {
    "@type": "WebSite",
    "@id": siteId,
    url: SITE.url,
    name: `${SITE.name} Portfolio`,
    description: SITE.description,
    inLanguage: ["en", "bn"],
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: copy.title,
    inLanguage: lang,
    isPartOf: { "@id": siteId },
    mainEntity: { "@id": personId },
    dateModified: new Date().toISOString().slice(0, 10),
  };

  const work = {
    "@type": "ItemList",
    "@id": `${url}#work`,
    name: "Selected projects by Muhammad Rasel",
    itemListElement: projects[lang].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Any",
        author: { "@id": personId },
        ...(p.demo ? { url: p.demo } : {}),
      },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [person, website, profilePage, work] };
}
