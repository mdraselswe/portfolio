import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

export default function SkipLink({ lang }: { lang: Language }) {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform focus:translate-y-0"
    >
      {getT(lang).skipToContent}
    </a>
  );
}
