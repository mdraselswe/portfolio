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
  "Redux Toolkit",
  "TanStack Query",
  "Tailwind CSS",
  "Framer Motion",
  "Storybook",
  "Claude Code",
];

export default function About({ lang }: { lang: Language }) {
  const t = getT(lang).about;

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="border-y border-ink/10 bg-surface/60">
        <Marquee items={TICKER} label={t.marquee} />
      </div>

      <div className="section-shell py-16 sm:py-24 lg:py-28">
        <Divider />
        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading id="about-title" title={t.title} />
            <p className="mt-6 max-w-[56ch] text-lg">{t.p1}</p>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <p className="glass beam rounded-3xl p-6 text-lg text-muted">{t.p2}</p>
            </Reveal>
            <ul className="grid gap-3">
              {t.highlights.map((item, i) => (
                <li key={item}>
                  <Reveal
                    delay={0.14 + i * 0.06}
                    y={16}
                    className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 font-medium"
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
        </div>
      </div>
    </section>
  );
}
