import { Button } from "@/components/atoms/Button";
import { FiSend } from "@/lib/icons";

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

/**
 * Static form. `siteScript` sends it through the EmailJS REST API. The EmailJS ids are public by
 * design (NEXT_PUBLIC_*) and are baked in at build time.
 */
export default function ContactForm({ t }: { t: ContactFormLabels }) {
  return (
    <form
      data-contact
      data-service={process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ""}
      data-template={process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ""}
      data-key={process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""}
      data-send={t.send}
      data-sending={t.sending}
      data-sent={t.sent}
      data-error={t.error}
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
            placeholder={t.messageHint}
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        <FiSend aria-hidden />
        <span data-send-label>{t.send}</span>
      </Button>

      {/* Announced by screen readers; the text also carries the state, not just colour. */}
      <p
        role="status"
        aria-live="polite"
        className="mt-4 min-h-6 text-sm font-medium text-accent data-[state=error]:text-[rgb(185_28_28)] dark:data-[state=error]:text-[rgb(252_165_165)]"
      />
    </form>
  );
}
