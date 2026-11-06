import Divider from "@/components/atoms/Divider";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { education } from "@/data/experience";
import { FaGraduationCap } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

/** Degree and university. Its own section, with the same divider and heading as the others. */
export default function Education({ lang }: { lang: Language }) {
  const t = getT(lang).education;
  const edu = education[lang];

  return (
    <section id="education" aria-labelledby="education-title" className="py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <Divider />
        <Reveal className="mt-12 sm:mt-14">
          <SectionHeading id="education-title" title={t.title} intro={t.intro} />
        </Reveal>

        <Reveal className="mt-10 sm:mt-12" y={20}>
          <div className="glass beam flex items-start gap-4 rounded-3xl p-5 sm:items-center sm:gap-5 sm:p-7">
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-xl text-accent-ink sm:h-14 sm:w-14 sm:text-2xl"
            >
              <FaGraduationCap />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
                {edu.degree}
              </h3>
              <p className="mt-0.5 font-medium">{edu.school}</p>
              <p className="font-mono-ui mt-1 text-sm text-muted">
                {edu.period} · {edu.place} · {edu.grade}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
