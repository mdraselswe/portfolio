import ContactForm from "@/components/atoms/ContactForm";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

export default function Contact({ lang }: { lang: Language }) {
  const t = getT(lang).contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading id="contact-title" title={t.title} intro={t.intro} />
          <p className="mt-10 text-sm font-semibold text-muted">{t.emailDirect}</p>
          <a
            href="mailto:mdraselswe@gmail.com"
            className="mt-1 inline-block break-all font-display text-2xl font-semibold underline decoration-accent decoration-2 underline-offset-8 sm:text-3xl"
          >
            mdraselswe@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm t={t} />
        </Reveal>
      </div>
    </section>
  );
}
