interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: string;
  /** Small mono label above the heading, e.g. "02 · Experience" */
  eyebrow?: string;
}

/** The last word of a multi-word title is set as an italic serif accent (see `.accent-word`). */
export default function SectionHeading({ id, title, intro, eyebrow }: SectionHeadingProps) {
  const words = title.split(" ");
  const last = words.length > 1 ? words.pop() : undefined;

  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="font-mono-ui mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-aqua">
          <span aria-hidden className="h-px w-8 bg-aqua/70" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-6xl"
      >
        {last ? (
          <>
            {words.join(" ")} <em className="accent-word">{last}</em>
          </>
        ) : (
          title
        )}
      </h2>
      {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
    </div>
  );
}
