import Divider from "@/components/atoms/Divider";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { education, experience } from "@/data/experience";
import { FaGraduationCap } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

/** Work history as a vertical timeline, then education. Pure markup: no script needed. */
export default function Experience({ lang }: { lang: Language }) {
  const t = getT(lang).experience;
  const edu = education[lang];

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative isolate py-16 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="section-glow" />
      <div className="section-shell">
        <Divider />
        <Reveal className="mt-12 sm:mt-14">
          <SectionHeading id="experience-title" title={t.title} intro={t.intro} />
        </Reveal>

        <ol className="rail mt-12 space-y-6 sm:mt-14 sm:space-y-8">
          {experience[lang].map((role, i) => (
            <li key={role.id} className="relative pl-9 sm:pl-12">
              <span aria-hidden className="rail-dot" />
              <Reveal delay={Math.min(i, 2) * 0.05} y={22}>
                <article className="glass beam rounded-3xl p-5 sm:p-7">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
                      {role.title}
                    </h3>
                    <p className="font-mono-ui text-sm font-medium text-aqua">{role.period}</p>
                  </div>
                  <p className="mt-1 font-medium">
                    {role.company}
                    <span className="text-muted"> · {role.place}</span>
                  </p>
                  <p className="mt-2 text-muted">{role.about}</p>

                  <ul className="mt-4 space-y-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono-ui rounded-full bg-accent/12 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 sm:mt-14" y={20}>
          <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            {t.education}
          </h3>
          <div className="glass mt-4 flex items-start gap-4 rounded-3xl p-5 sm:items-center sm:p-7">
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-xl text-accent-ink"
            >
              <FaGraduationCap />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold sm:text-xl">{edu.degree}</p>
              <p className="font-medium">{edu.school}</p>
              <p className="mt-0.5 text-sm text-muted">
                {edu.period} · {edu.place} · {edu.grade}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
