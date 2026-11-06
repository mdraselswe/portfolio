import Divider from "@/components/atoms/Divider";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { skills } from "@/data/skills";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

/** Skill groups as a card grid. The wide groups (many chips) span two columns on large screens. */
export default function Skills({ lang }: { lang: Language }) {
  const t = getT(lang).toolkit;

  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-title"
      className="relative isolate py-16 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="section-glow" />
      <div className="section-shell">
        <Divider />
        <Reveal className="mt-12 sm:mt-14">
          <SectionHeading id="toolkit-title" title={t.title} intro={t.intro} />
        </Reveal>

        <dl className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {skills[lang].map((category, i) => (
            <Reveal
              key={category.id}
              delay={Math.min(i % 3, 2) * 0.06}
              y={20}
              className={`glass beam rounded-3xl p-5 sm:p-6 ${
                category.skills.length > 8 ? "lg:col-span-2" : ""
              }`}
            >
              <dt className="font-mono-ui text-xs font-semibold uppercase tracking-widest text-aqua">
                {category.title}
              </dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="cursor-default rounded-full border border-ink/12 bg-surface/60 px-3.5 py-1.5 text-sm font-medium transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent sm:text-base"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
