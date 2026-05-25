"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@/lib";
import { FaBars, FaMoon, FaSun } from "@/lib/icons";
import { translations } from "@/translations";

// ── Nav item (desktop) ────────────────────────────────────────────────────
const NavLink = memo(function NavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
        isActive
          ? "text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white/90"
      }`}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-blue-500 dark:bg-blue-400 rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
    </a>
  );
});

// ── Mobile nav item ───────────────────────────────────────────────────────
const MobileNavLink = memo(function MobileNavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
          : "text-gray-700 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {children}
    </a>
  );
});

// ── Header ────────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const manualNavRef = useRef(false);

  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const t = translations[language].header;

  // Scroll-based pill height compression
  const { scrollY } = useScroll();
  const pillPaddingY = useTransform(scrollY, [0, 80], [12, 8]);
  const pillPaddingX = useTransform(scrollY, [0, 80], [20, 16]);

  // Scroll-position-based active section (both directions)
  useEffect(() => {
    const update = () => {
      if (manualNavRef.current) return;

      if (window.scrollY < 80) {
        setActiveSection("");
        return;
      }

      const scrollPos = window.scrollY + 120;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
      let current = "";
      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    manualNavRef.current = true;
    setActiveSection(id);
    setMobileOpen(false);
    setTimeout(() => {
      manualNavRef.current = false;
    }, 1500);
  }, []);

  const toggleLanguage = useCallback(
    () => setLanguage(language === "en" ? "bn" : "en"),
    [language, setLanguage]
  );
  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme]
  );

  const navItems = useMemo(
    () => [
      { href: "#", id: "", label: t.home },
      { href: "#skills", id: "skills", label: t.skills },
      { href: "#projects", id: "projects", label: t.projects },
      { href: "#contact", id: "contact", label: t.contact },
    ],
    [t]
  );

  return (
    // pointer-events-none on outer so the transparent area doesn't eat scroll events
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl">
        {/* ── Floating pill ── */}
        <motion.div
          className="glass-pill dark:glass shadow-lg shadow-black/5 dark:shadow-black/40 rounded-2xl overflow-hidden"
          style={
            prefersReduced
              ? {}
              : {
                  paddingTop: pillPaddingY,
                  paddingBottom: pillPaddingY,
                  paddingLeft: pillPaddingX,
                  paddingRight: pillPaddingX,
                }
          }
        >
          {/* Static padding fallback for reduced-motion */}
          <div className={prefersReduced ? "px-5 py-3" : ""}>
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <a
                href="#"
                onClick={() => handleNavClick("")}
                className="text-base font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent shrink-0"
              >
                {translations[language].name}
              </a>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    href={item.href}
                    isActive={activeSection === item.id}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Theme */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-xl text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-200"
                >
                  {theme === "light" ? (
                    <FaMoon className="w-4 h-4" />
                  ) : (
                    <FaSun className="w-4 h-4" />
                  )}
                </button>

                {/* Language */}
                <button
                  onClick={toggleLanguage}
                  aria-label="Toggle language"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-200 font-mono"
                >
                  {language.toUpperCase()}
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle navigation"
                  aria-expanded={mobileOpen}
                  className="md:hidden p-2 rounded-xl text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-200"
                >
                  <FaBars className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="mt-2 p-2 rounded-2xl glass-pill dark:glass shadow-lg shadow-black/5 dark:shadow-black/40"
            >
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.id}
                    href={item.href}
                    isActive={activeSection === item.id}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </MobileNavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
