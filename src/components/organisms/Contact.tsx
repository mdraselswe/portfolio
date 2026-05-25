"use client";

import { motion } from "@/lib";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FaLinkedin, MdEmail } from "@/lib/icons";
import { translations } from "@/translations";

export default function Contact() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const t = translations[language].contact;

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden bg-gray-50/50 dark:bg-[#050508]"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Dark dot grid */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Large ambient glow — centered */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.06)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_100%)]" />
        {/* Edge fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#050508] via-transparent to-white dark:to-[#050508]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <motion.span
          className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Contact
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 dark:text-white/45 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.subtitle}
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary: gradient + glow */}
          <a
            href="mailto:mdraselswe@gmail.com?subject=Let's%20Connect%20-%20Portfolio%20Inquiry&body=Hi%20Muhammad,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding..."
            aria-label="Send email to Muhammad Rasel"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            <MdEmail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            {t.email}
          </a>

          {/* Secondary: ghost with border */}
          <a
            href="https://www.linkedin.com/in/mdraselswe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/[0.10] hover:border-blue-300 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/8 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            {t.linkedin}
          </a>
        </motion.div>

        {/* ── Direct email ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3 text-gray-300 dark:text-white/15">
            <div className="h-px w-16 bg-current" />
            <span className="text-xs font-mono tracking-widest uppercase">or</span>
            <div className="h-px w-16 bg-current" />
          </div>

          <a
            href="mailto:mdraselswe@gmail.com"
            className="group flex items-center gap-2 text-sm font-mono text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            mdraselswe@gmail.com
            {!prefersReduced && (
              <span className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200 text-blue-500">
                ↗
              </span>
            )}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
