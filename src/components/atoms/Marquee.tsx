interface MarqueeProps {
  items: string[];
  label: string;
}

/** Infinite ticker. The second copy is hidden from assistive tech and crawlers' reading order. */
export default function Marquee({ items, label }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 font-mono-ui text-sm font-semibold uppercase tracking-[0.22em] text-ink/70 sm:text-base"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-12 whitespace-nowrap">
          {item}
          <span aria-hidden className="h-2 w-2 rounded-full bg-marigold" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-label={label} role="group" className="marquee overflow-hidden py-6">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
