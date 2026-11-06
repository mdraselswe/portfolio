import { FaBars, FaMoon, FaSun } from "@/lib/icons";
import { getT, otherLang, pathFor } from "@/lib/i18n";
import type { Language } from "@/types/context";

const controlClass =
  "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium text-ink transition-[background-color,transform] hover:bg-ink/8 active:scale-90";

const linkClass =
  "relative inline-flex h-11 items-center rounded-full px-3.5 text-sm font-medium text-ink";

/**
 * Static markup. The scrolled state, the current-section pill and the theme switch are driven by
 * `siteScript` through the data attributes below. The phone menu is a native <details>.
 */
export default function Header({ lang }: { lang: Language }) {
  const t = getT(lang).header;
  const other = otherLang(lang);
  const links = [
    { id: "about", label: t.about },
    { id: "experience", label: t.experience },
    { id: "work", label: t.work },
    { id: "toolkit", label: t.toolkit },
    { id: "contact", label: t.contact },
  ];

  return (
    <header className="drop pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <div
        data-header-bar
        className="pointer-events-auto relative flex w-full max-w-[46rem] items-center justify-between rounded-full border border-ink/10 bg-surface/90 p-1.5 transition-[background-color,box-shadow,border-color] duration-300 data-[scrolled]:border-ink/15 data-[scrolled]:bg-surface/95 data-[scrolled]:shadow-[0_12px_40px_-12px_rgb(0_0_0/0.35)] md:bg-surface/60 md:backdrop-blur-xl md:data-[scrolled]:bg-surface/90"
      >
        <a
          href="#top"
          aria-label={t.home}
          className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-sm font-semibold text-accent-ink transition-transform hover:rotate-[-8deg] active:scale-90"
        >
          {lang === "en" ? "MR" : "রা"}
        </a>

        <nav data-nav aria-label="Primary" className="relative hidden items-center md:flex">
          <span
            data-pill
            aria-hidden
            hidden
            className="absolute left-0 top-0 h-11 rounded-full bg-ink/10 transition-[transform,width] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
          />
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} data-section={link.id} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center">
          <details data-menu className="menu md:hidden">
            <summary
              aria-label={t.menu}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink transition-transform active:scale-90"
            >
              <FaBars aria-hidden />
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute inset-x-0 top-full mt-2 grid rounded-3xl border border-ink/10 bg-surface p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]"
            >
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="flex h-12 items-center rounded-2xl px-4 text-base font-medium text-ink active:bg-ink/10"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </details>
          <button
            type="button"
            data-theme-toggle
            data-label-dark={t.toDark}
            data-label-light={t.toLight}
            aria-label={t.toDark}
            className={controlClass}
          >
            <FaMoon aria-hidden className="dark:hidden" />
            <FaSun aria-hidden className="hidden dark:block" />
          </button>
          <a
            href={pathFor(other)}
            hrefLang={other}
            lang={other}
            aria-label={t.languageAction}
            className={controlClass}
          >
            {t.languageLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
