"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "@/components/atoms/Button";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section
      id="contact"
      className="relative py-20 overflow-hidden bg-gray-50/50 dark:bg-gray-800/50"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.05),transparent),radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.05),transparent)]" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-gradient-x">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as="a"
              href="mailto:mdraselswe@gmail.com?subject=Let's%20Connect%20-%20Portfolio%20Inquiry&body=Hi%20Muhammad,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding..."
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              aria-label="Send email to Muhammad Rasel"
            >
              <span className="flex items-center gap-2 justify-center">
                <MdEmail className="w-5 h-5" />
                {t.email}
              </span>
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/mdraselswe"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              aria-label="Connect on LinkedIn"
            >
              <span className="flex items-center gap-2 justify-center">
                <FaLinkedin className="w-5 h-5" />
                {t.linkedin}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
