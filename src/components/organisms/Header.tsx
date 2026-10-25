"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaMoon, FaSun } from "@/lib/icons";
import { getT, otherLang, pathFor } from "@/lib/i18n";
import { withViewTransition } from "@/lib/viewTransition";
import type { Language } from "@/types/context";

const SECTION_IDS = ["top", "about", "work", "toolkit", "contact"] as const;

const controlClass =
  "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium text-ink transition-[background-color,transform] hover:bg-ink/8 active:scale-90";

export default function Header({ lang }: { lang: Language }) {
  const [active, setActive] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const t = getT(lang).header;
  const other = otherLang(lang);

  // Condense the bar once the page moves.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Highlight the section that crosses the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // The sliding pill sits behind the active link.
  useEffect(() => {
    const place = () => {
      const link = navRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
      setPill(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, lang]);

  const links = useMemo(
    () => [
      { id: "work", label: t.work },
      { id: "toolkit", label: t.toolkit },
      { id: "contact", label: t.contact },
    ],
    [t]
  );

  function onTheme(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const next = theme === "light" ? "dark" : "light";
    withViewTransition(
      () => {
        document.documentElement.classList.toggle("dark", next === "dark");
        toggleTheme();
      },
      "circle",
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
  }

  return (
    <header className="drop pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <div
        className={`pointer-events-auto flex w-full max-w-[44rem] items-center justify-between rounded-full border p-1.5 transition-[background-color,box-shadow,border-color] duration-300 md:backdrop-blur-xl ${
          scrolled
            ? "border-ink/15 bg-surface/95 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.35)] md:bg-surface/90"
            : "border-ink/10 bg-surface/90 shadow-none md:bg-surface/60"
        }`}
      >
        <a
          href="#top"
          aria-label={t.home}
          className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-semibold text-paper transition-transform hover:rotate-[-8deg] active:scale-90"
        >
          {lang === "en" ? "MR" : "রা"}
        </a>

        <nav ref={navRef} aria-label="Primary" className="relative flex items-center">
          {pill && (
            <span
              aria-hidden
              className="absolute left-0 top-0 h-11 rounded-full bg-ink/10 transition-[transform,width] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
            />
          )}
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className="relative inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-ink sm:px-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center">
          <button
            type="button"
            onClick={onTheme}
            aria-label={theme === "light" ? t.toDark : t.toLight}
            className={controlClass}
          >
            {theme === "light" ? <FaMoon aria-hidden /> : <FaSun aria-hidden />}
          </button>
          <Link
            href={pathFor(other)}
            hrefLang={other}
            lang={other}
            aria-label={t.languageAction}
            className={controlClass}
          >
            {t.languageLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
