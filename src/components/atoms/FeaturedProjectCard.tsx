import AppTile from "@/components/atoms/AppTile";
import ProjectLinks from "@/components/atoms/ProjectLinks";
import { tileForProject } from "@/data/appTiles";
import { FaCode } from "@/lib/icons";
import type { Language } from "@/types/context";
import type { ProjectCardProps } from "@/types/project";

/** Big tinted card for the apps I built myself. The tint comes from each app's own hue. */
export default function FeaturedProjectCard({
  project,
  lang,
}: ProjectCardProps & { lang: Language }) {
  const tile = tileForProject(project.slug);

  return (
    <article
      id={`project-${project.slug}`}
      data-glow
      className={`hue-${tile?.tone ?? "neutral"} group/card relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[rgb(var(--tile)/0.55)] hover:shadow-[0_30px_60px_-30px_rgb(var(--tile)/0.6)] sm:rounded-[2rem] sm:p-8`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgb(var(--tile)/0.22),transparent)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgb(var(--tile)/0.16),transparent_70%)] group-hover/card:opacity-100"
      />

      <div className="relative flex h-full flex-col">
        <AppTile
          Icon={tile?.Icon ?? FaCode}
          tone={tile?.tone}
          size="lg"
          className="transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover/card:-rotate-6 group-hover/card:scale-110"
        />
        <h4 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          {project.title}
        </h4>
        <p className="mt-3 flex-1 text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <ProjectLinks project={project} lang={lang} />
        </div>
      </div>
    </article>
  );
}
