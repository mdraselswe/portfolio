import { FiExternalLink, FiGithub } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";
import type { Project } from "@/types/project";

const secondary =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-medium transition-[transform,background-color] duration-200 hover:bg-ink/6 active:scale-95";

const primary =
  "inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-ink transition-[transform,filter] duration-200 hover:brightness-110 active:scale-95";

/** Live-site and source links for one project. Every link names its project for screen readers. */
export default function ProjectLinks({ project, lang }: { project: Project; lang: Language }) {
  const t = getT(lang).work;

  const live = [
    project.demo && { label: t.live, href: project.demo },
    project.demos?.nextdhabian && { label: "NextDhabian", href: project.demos.nextdhabian },
    project.demos?.nextbuetian && { label: "NextBuetian", href: project.demos.nextbuetian },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      {live.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.label} ${t.forProject} ${project.title}`}
          className={primary}
        >
          <FiExternalLink aria-hidden />
          {item.label}
        </a>
      ))}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.source} ${t.forProject} ${project.title}`}
          className={secondary}
        >
          <FiGithub aria-hidden />
          {t.source}
        </a>
      )}
    </>
  );
}
