"use client";

import { Button } from "@/components/atoms/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { memo, useCallback, useEffect, useMemo, useState } from "@/lib";
import { FaBars, FaMoon, FaSun } from "@/lib/icons";
import { translations } from "@/translations";

const NavItem = memo(function NavItem({
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
      className={`relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group py-2 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}
    >
      <span>{children}</span>
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      ></span>
    </a>
  );
});

const MobileNavItem = memo(function MobileNavItem({
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
      className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${isActive ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800" : ""}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
});

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language].header;

  const [isManualNavigation, setIsManualNavigation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isManualNavigation) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id || "";
              const intersectionRatio = entry.intersectionRatio;

              if (intersectionRatio > 0.2) {
                setActiveSection(sectionId);
              }
            }
          });
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8], rootMargin: "-50px 0px -40% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    const heroSection = document.querySelector("section:first-of-type");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, [isManualNavigation]);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsManualNavigation(true);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      setIsManualNavigation(false);
    }, 1000);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "bn" : "en");
  }, [language, setLanguage]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/80 border-b border-gray-100/50 dark:border-gray-700/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#"
            onClick={() => handleNavClick("")}
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
          >
            {translations[language].name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                href={item.href}
                isActive={activeSection === item.id}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="p-2 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
            </Button>

            {/* Language Switcher */}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="px-3 py-1"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </Button>

            {/* Mobile Navigation Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-full"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <FaBars className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"} transition-all duration-300 ease-in-out absolute top-full left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20`}
        >
          <nav className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.id}
                href={item.href}
                isActive={activeSection === item.id}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
