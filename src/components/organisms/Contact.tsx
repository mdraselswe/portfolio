"use client";

import { Button } from "@/components/atoms/Button";
import { containerVariants, itemVariants } from "@/config/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaLinkedin, MdEmail, motion } from "@/lib";
import { translations } from "@/translations";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section
      id="contact"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent),radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(60deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(60deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0)_100%)]" />
      </div>
      <motion.div
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
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
              className="w-full sm:w-auto text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Connect on LinkedIn"
            >
              <span className="flex items-center gap-2 justify-center">
                <FaLinkedin className="w-5 h-5" />
                {t.linkedin}
              </span>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
