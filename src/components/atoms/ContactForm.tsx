"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FiSend } from "@/lib/icons";

type Status = "idle" | "sending" | "success" | "error";

export interface ContactFormLabels {
  name: string;
  email: string;
  message: string;
  messageHint: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
}

const fieldClass =
  "mt-2 block w-full min-h-12 rounded-2xl border border-ink/20 bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent disabled:opacity-60";

/** The only interactive part of the contact section. emailjs loads on first submit. */
export default function ContactForm({ t }: { t: ContactFormLabels }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
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
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      // Surfaces misconfiguration (missing NEXT_PUBLIC_EMAILJS_* vars) instead of
      // failing silently — those are inlined at build time, so a deploy without
      // them ships `undefined` to emailjs.send().
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-[0_30px_80px_-50px_rgb(0_0_0/0.35)] sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold">
            {t.name}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            disabled={isSending}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold">
            {t.email}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={isSending}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-semibold">
            {t.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            disabled={isSending}
            placeholder={t.messageHint}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSending}
        aria-busy={isSending || undefined}
        className="mt-6 w-full"
      >
        <FiSend aria-hidden />
        {isSending ? t.sending : t.send}
      </Button>

      {/* Announced by screen readers; the text also carries the state, not just colour. */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-6 text-sm font-medium ${
          status === "error" ? "text-[rgb(185_28_28)] dark:text-[rgb(252_165_165)]" : "text-accent"
        }`}
      >
        {status === "success" && t.sent}
        {status === "error" && t.error}
      </p>
    </form>
  );
}
