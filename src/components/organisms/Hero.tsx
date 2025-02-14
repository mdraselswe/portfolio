"use client";

import { Button } from "@/components/atoms/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { MdEmail } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-transparent animate-fade-in">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-gray-900/80 dark:to-gray-800/80 opacity-80 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent),radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left space-y-10 opacity-0 animate-fade-in-up">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium tracking-wide shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="tracking-wider">{t.role}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x leading-tight tracking-tighter py-3">
              {t.greeting}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed tracking-normal">
              {t.desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8"
                rounded
              >
                <span className="flex items-center gap-2 justify-center">
                  <MdEmail className="w-5 h-5" />
                  {t.getInTouch}
                </span>
              </Button>
              <Button
                as="a"
                href="#projects"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8"
                rounded
              >
                <span className="flex items-center gap-2 justify-center">
                  <FaFolderOpen className="w-5 h-5" />
                  {t.viewProjects}
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative opacity-0 animate-fade-in-right">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="relative animate-float">
            <img
              src="./hero-illustration.svg"
              alt="Developer Animation"
              className="w-full max-w-[700px] mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl filter blur-xl opacity-50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
