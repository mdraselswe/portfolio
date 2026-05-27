"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "@/lib";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FaLinkedin, MdEmail, FiSend } from "@/lib/icons";
import { translations } from "@/translations";

type Status = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "mdraselswe@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/[0.09] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500/60 focus:bg-white dark:focus:bg-white/[0.07] transition-all duration-200 text-sm disabled:opacity-50";

  const isSending = status === "sending";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-3"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Your name"
          required
          disabled={isSending}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
        <input
          type="email"
          placeholder="your@email.com"
          required
          disabled={isSending}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
      </div>
      <textarea
        rows={5}
        placeholder="Tell me about your project..."
        required
        disabled={isSending}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={`${inputCls} resize-none`}
      />

      {/* Status messages */}
      {status === "success" && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Message sent! I&apos;ll reply within 24h.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-rose-500 dark:text-rose-400 font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Failed to send. Try emailing directly.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={isSending || status === "success"}
        whileHover={isSending || status === "success" ? {} : { scale: 1.02, y: -1 }}
        whileTap={isSending || status === "success" ? {} : { scale: 0.98 }}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FiSend className={`w-4 h-4 ${isSending ? "animate-pulse" : ""}`} />
        {isSending ? "Sending…" : status === "success" ? "Sent ✓" : "Send Message"}
      </motion.button>
    </motion.form>
  );
}

export default function Contact() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const t = translations[language].contact;

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden bg-gray-50/50 dark:bg-[#050508]"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(59,130,246,0.05)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(59,130,246,0.10)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#050508] via-transparent to-white dark:to-[#050508]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Left: info + CTAs ── */}
          <div>
            <motion.span
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact
            </motion.span>

            <motion.h2
              className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.title}
            </motion.h2>

            <motion.p
              className="text-gray-500 dark:text-white/45 text-base leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.subtitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="mailto:mdraselswe@gmail.com?subject=Let's%20Connect%20-%20Portfolio%20Inquiry&body=Hi%20Muhammad,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding..."
                aria-label="Send email"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MdEmail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                {t.email}
              </a>
              <a
                href="https://www.linkedin.com/in/mdraselswe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/[0.10] hover:border-blue-300 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/8 hover:-translate-y-0.5 transition-all duration-300"
              >
                <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                {t.linkedin}
              </a>
            </motion.div>

            {/* Direct email */}
            <motion.a
              href="mailto:mdraselswe@gmail.com"
              className="group flex items-center gap-2 text-sm font-mono text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.36 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              mdraselswe@gmail.com
              {!prefersReduced && (
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-blue-500">
                  ↗
                </span>
              )}
            </motion.a>
          </div>

          {/* ── Right: contact form ── */}
          <div className="relative">
            {/* Card glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/5 to-violet-500/5 dark:from-blue-500/10 dark:to-violet-500/8 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] p-6 shadow-lg shadow-black/5 dark:shadow-black/30 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Send a message
              </h3>
              <p className="text-xs text-gray-400 dark:text-white/30 mb-5 font-mono">
                I&apos;ll get back to you within 24h
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
