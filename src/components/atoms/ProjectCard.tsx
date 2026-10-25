import AppTile from "@/components/atoms/AppTile";
import ProjectLinks from "@/components/atoms/ProjectLinks";
import { tileForProject } from "@/data/appTiles";
import { FaCode } from "@/lib/icons";
import type { Language } from "@/types/context";
import type { ProjectCardProps } from "@/types/project";

interface ProjectRowProps extends ProjectCardProps {
  lang: Language;
  compact?: boolean;
}

/** One project, set as a row in a list rather than a card in a grid. */
export default function ProjectCard({ project, lang, compact = false }: ProjectRowProps) {
  const tile = tileForProject(project.slug);

  return (
    <article
      id={`project-${project.slug}`}
      className={`group/row relative grid scroll-mt-28 grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-4 sm:gap-x-6 ${
        compact ? "py-6" : "py-8 sm:py-9 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-8"
      }`}
    >
      <span
        aria-hidden
        className="absolute -inset-x-3 inset-y-2 -z-10 rounded-[1.75rem] bg-ink/[0.045] opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 sm:-inset-x-4"
      />
      <AppTile
        Icon={tile?.Icon ?? FaCode}
        tone={tile?.tone}
        size={compact ? "sm" : "lg"}
        className="transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover/row:-rotate-6 group-hover/row:scale-110"
      />

      <div className="min-w-0">
        <h4
          className={`font-display font-semibold tracking-[-0.015em] transition-colors duration-200 group-hover/row:text-accent ${
            compact ? "text-xl" : "text-xl sm:text-2xl md:text-3xl"
          }`}
        >
          {project.title}
        </h4>
        <p className={`mt-2 max-w-[62ch] text-muted ${compact ? "line-clamp-2" : ""}`}>
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div
        className={`col-span-2 flex flex-wrap gap-2 ${
          compact ? "" : "md:col-span-1 md:flex-col md:items-stretch"
        }`}
      >
        <ProjectLinks project={project} lang={lang} />
      </div>
    </article>
  );
}
