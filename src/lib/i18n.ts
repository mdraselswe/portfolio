import { translations } from "@/translations";
import type { Language } from "@/types/context";

export const DEFAULT_LANG: Language = "en";

/** English lives at `/`, Bangla at `/bn`. Two real URLs, so both can be indexed. */
export const pathFor = (lang: Language) => (lang === "bn" ? "/bn" : "/");

export const otherLang = (lang: Language): Language => (lang === "bn" ? "en" : "bn");

export const getT = (lang: Language) => translations[lang];
