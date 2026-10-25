import Divider from "@/components/atoms/Divider";
import FeaturedProjectCard from "@/components/atoms/FeaturedProjectCard";
import ProjectCard from "@/components/atoms/ProjectCard";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { projectsInGroup } from "@/data/projects";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

export default function Projects({ lang }: { lang: Language }) {
  const t = getT(lang).work;

  const lists = [
    { group: "platform", title: t.groups.platforms, compact: false },
    { group: "more", title: t.groups.more, compact: false },
    { group: "earlier", title: t.groups.earlier, compact: true },
  ] as const;

  return (
    <section id="work" aria-labelledby="work-title" className="py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <Divider />
        <Reveal className="mt-12 sm:mt-14">
          <SectionHeading id="work-title" title={t.title} intro={t.intro} />
        </Reveal>

        <div className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
          <div>
            <Reveal y={16}>
              <h3 className="text-base font-semibold text-muted">{t.groups.featured}</h3>
            </Reveal>
            <ul className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projectsInGroup(lang, "featured").map((project, i) => (
                <li key={project.slug}>
                  <Reveal delay={(i % 3) * 0.08} y={24} className="h-full">
                    <FeaturedProjectCard project={project} lang={lang} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          {lists.map((list) => (
            <div key={list.group}>
              <Reveal y={16}>
                <h3 className="text-base font-semibold text-muted">{list.title}</h3>
              </Reveal>
              <ul className="mt-3 divide-y divide-ink/10 border-t border-ink/10">
                {projectsInGroup(lang, list.group).map((project, i) => (
                  <li key={project.slug}>
                    <Reveal delay={Math.min(i, 3) * 0.05} y={20}>
                      <ProjectCard project={project} lang={lang} compact={list.compact} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
