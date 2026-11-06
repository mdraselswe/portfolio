import ContactForm from "@/components/atoms/ContactForm";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { FaGithub, FaLinkedin, FaLocationDot, FaPhone, MdEmail } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

export default function Contact({ lang }: { lang: Language }) {
  const t = getT(lang).contact;

  const details = [
    {
      label: t.details.email,
      value: "mdraselswe@gmail.com",
      href: "mailto:mdraselswe@gmail.com",
      Icon: MdEmail,
    },
    {
      label: t.details.phone,
      value: "+880 1781 182143",
      href: "tel:+8801781182143",
      Icon: FaPhone,
    },
    { label: t.details.location, value: t.details.locationValue, Icon: FaLocationDot },
    {
      label: "LinkedIn",
      value: "in/mdraselswe",
      href: "https://www.linkedin.com/in/mdraselswe",
      Icon: FaLinkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: "mdraselswe",
      href: "https://github.com/mdraselswe",
      Icon: FaGithub,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate py-16 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="section-glow" />
      <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            id="contact-title"
            title={t.title}
            intro={t.intro}
            eyebrow={getT(lang).eyebrow.contact}
          />
          <ul aria-label={t.details.label} className="mt-9 grid gap-3">
            {details.map(({ label, value, href, Icon, external }) => {
              const body = (
                <>
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/12 text-lg text-accent"
                  >
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="font-mono-ui block text-xs font-medium uppercase tracking-widest text-muted">
                      {label}
                    </span>
                    <span className="block break-words font-medium">{value}</span>
                  </span>
                </>
              );
              const box = "glass flex min-h-14 items-center gap-4 rounded-2xl px-4 py-3";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${box} transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={box}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm t={t} />
        </Reveal>
      </div>
    </section>
  );
}
