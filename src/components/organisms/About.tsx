import Counter from "@/components/atoms/Counter";
import Divider from "@/components/atoms/Divider";
import Marquee from "@/components/atoms/Marquee";
import Reveal from "@/components/atoms/Reveal";
import SectionHeading from "@/components/atoms/SectionHeading";
import { FaCheck } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

const TICKER = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "GraphQL",
  "Node.js",
  "Redux",
  "Tailwind CSS",
  "Framer Motion",
  "Jest",
  "Storybook",
  "Firebase",
];

export default function About({ lang }: { lang: Language }) {
  const t = getT(lang).about;

  // Figures come from the CV: platforms I led the frontend for, and the shared component library.
  const stats = [
    { to: 8, suffix: "+", label: t.stats.years },
    { to: 3, suffix: "M+", label: t.stats.students },
    { to: 10, suffix: "x", label: t.stats.speed },
    { to: 4, suffix: "", label: t.stats.products },
  ];

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="border-y border-ink/10 bg-surface/60">
        <Marquee items={TICKER} label={t.marquee} />
      </div>

      <div className="section-shell py-16 sm:py-24 lg:py-28">
        <Divider />
        <div className="mt-12 grid gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading id="about-title" title={t.title} />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[56ch] text-lg">{t.p1}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-[56ch] text-lg text-muted">{t.p2}</p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {t.highlights.map((item, i) => (
                <li key={item}>
                  <Reveal
                    delay={0.2 + i * 0.07}
                    y={16}
                    className="flex items-center gap-3 font-medium"
                  >
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs text-accent-ink"
                    >
                      <FaCheck />
                    </span>
                    {item}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className="flex flex-col-reverse justify-between gap-6 bg-surface p-6 sm:p-8"
              >
                <dt className="text-sm font-medium text-muted">{stat.label}</dt>
                <dd className="font-display text-5xl font-semibold tracking-[-0.03em] text-accent sm:text-6xl">
                  <Counter to={stat.to} suffix={stat.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
