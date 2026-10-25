import Divider from "@/components/atoms/Divider";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { skills } from "@/data/skills";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

export default function Skills({ lang }: { lang: Language }) {
  const t = getT(lang).toolkit;

  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <Divider />
        <Reveal className="mt-12 sm:mt-14">
          <SectionHeading id="toolkit-title" title={t.title} intro={t.intro} />
        </Reveal>

        <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/10 sm:mt-14">
          {skills[lang].map((category, i) => (
            <Reveal
              key={category.title}
              delay={Math.min(i, 3) * 0.05}
              y={18}
              className="grid gap-3 py-7 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8"
            >
              <dt className="text-base font-semibold text-muted">{category.title}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="cursor-default rounded-full border border-ink/15 px-4 py-1.5 font-display text-lg font-medium transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:text-accent sm:text-xl"
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
