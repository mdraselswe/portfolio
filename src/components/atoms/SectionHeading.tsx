interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: string;
}

export default function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <h2
        id={id}
        className="font-display text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-6xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
    </div>
  );
}
