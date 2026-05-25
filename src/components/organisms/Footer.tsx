"use client";

import { motion } from "@/lib";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "@/lib/icons";
import { translations } from "@/translations";
import { fadeInUp, fastStaggerContainer, viewportConfig } from "@/config/animations";

// ── Hover reveal link ─────────────────────────────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group relative inline-block overflow-hidden py-0.5">
      <span className="block text-sm text-gray-500 dark:text-white/40 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute inset-0 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        aria-hidden
      >
        {children}
      </span>
    </a>
  );
}

// ── Social icon with spring lift ──────────────────────────────────────────
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 rounded-xl text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/8 transition-colors duration-200"
      whileHover={{ y: -3, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="relative border-t border-gray-100 dark:border-white/[0.05] bg-white dark:bg-[#050508]">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(59,130,246,0.04),transparent)] dark:bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(59,130,246,0.06),transparent)]" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
        variants={fastStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {/* ── Main row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h3 className="text-base font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-1">
              {t.name}
            </h3>
            <p className="text-sm text-gray-400 dark:text-white/35 mb-5">{t.footer.role}</p>

            {/* Social icons */}
            <div className="flex items-center gap-1 -ml-2">
              <SocialIcon href="http://github.com/mdraselswe" label="GitHub">
                <FaGithub className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/mdraselswe" label="LinkedIn">
                <FaLinkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://x.com/mdraselswe" label="Twitter">
                <FaXTwitter className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://facebook.com/mdraselswe" label="Facebook">
                <FaFacebook className="h-4 w-4" />
              </SocialIcon>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h4 className="text-xs font-mono tracking-[0.18em] uppercase text-gray-400 dark:text-white/25 mb-5">
              {t.footer.quickLinks}
            </h4>
            <nav className="flex flex-col gap-2.5">
              <FooterLink href="#">{t.header.home}</FooterLink>
              <FooterLink href="#skills">{t.header.skills}</FooterLink>
              <FooterLink href="#projects">{t.header.projects}</FooterLink>
              <FooterLink href="#contact">{t.header.contact}</FooterLink>
            </nav>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h4 className="text-xs font-mono tracking-[0.18em] uppercase text-gray-400 dark:text-white/25 mb-5">
              {t.footer.connect}
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:mdraselswe@gmail.com"
                className="text-sm text-gray-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-mono"
              >
                mdraselswe@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/mdraselswe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                linkedin.com/in/mdraselswe
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100 dark:border-white/[0.05]"
        >
          <p className="text-xs text-gray-400 dark:text-white/25 font-mono">
            &copy; {new Date().getFullYear()} {t.name} — {t.footer.copyright}
          </p>

          <p className="text-xs text-gray-400 dark:text-white/20 font-mono">
            Built with Next.js & Framer Motion
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
