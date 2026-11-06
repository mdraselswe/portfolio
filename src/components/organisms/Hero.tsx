import { Fragment } from "react";
import { Button } from "@/components/atoms/Button";
import HeroOrb from "@/components/atoms/HeroOrb";
import Counter from "@/components/atoms/Counter";
import RoleRotator from "@/components/atoms/RoleRotator";
import { FaArrowRight, FaFileDownload, FaGithub, FaLinkedin, MdEmail } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";
import type { CSSProperties } from "react";

const RESUME = "/Muhammad-Rasel-CV.pdf";

const dock = [
  { label: "GitHub", href: "https://github.com/mdraselswe", Icon: FaGithub, external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mdraselswe",
    Icon: FaLinkedin,
    external: true,
  },
  { label: "Email", href: "mailto:mdraselswe@gmail.com", Icon: MdEmail, external: false },
];

/** Entrance animations are CSS, staggered through the --d variable. */
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero({ lang }: { lang: Language }) {
  const t = getT(lang).hero;
  const words = t.title.split(" ");
  const accentFrom = Math.ceil(words.length / 2);

  const stats = [
    { to: 8, suffix: "+", label: t.stats.years },
    { to: 10, suffix: "x", label: t.stats.speed },
    { to: 85, suffix: "%+", label: t.stats.rerenders },
    { to: 10, suffix: "x", label: t.stats.bugs },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate pb-16 pt-28 sm:pb-24 sm:pt-36"
    >
      <div aria-hidden className="aurora">
        <i />
        <i />
        <i />
      </div>
      <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        data-spotlight
        className="spotlight pointer-events-none absolute inset-0 -z-10"
      />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div>
          <p
            style={delay(0)}
            className="rise inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-surface px-4 py-2 text-sm font-medium"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                aria-hidden
                className="absolute inline-flex h-full w-full ping-dot rounded-full bg-marigold opacity-70"
              />
              <span aria-hidden className="relative h-2.5 w-2.5 rounded-full bg-marigold" />
            </span>
            {t.availability}
          </p>

          <h1
            id="hero-title"
            className="font-display mt-6 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] sm:mt-7"
          >
            <span
              style={delay(0.08)}
              className="slide font-mono-ui mb-4 block text-sm font-medium tracking-normal text-aqua sm:mb-5 sm:text-base"
            >
              {t.kicker}
            </span>
            {words.map((word, i) => (
              <Fragment key={`${i}-${word}`}>
                <span
                  style={delay(0.06 + i * 0.05)}
                  className={`word-in ${i >= accentFrom ? "gradient-text" : ""} ${
                    i === words.length - 1 ? "accent-word" : ""
                  }`}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          <div style={delay(0.3)} className="slide">
            <RoleRotator roles={t.roles} />
          </div>

          <p
            style={delay(0.36)}
            className="slide mt-5 max-w-[36rem] text-base text-muted sm:mt-6 sm:text-lg"
          >
            {t.desc}
          </p>

          <div style={delay(0.42)} className="slide mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
            <div data-magnetic className="inline-block transition-transform duration-200 ease-out">
              <Button as="a" href="#work" size="lg">
                {t.seeWork}
                <FaArrowRight
                  aria-hidden
                  className="transition-transform group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
            <Button as="a" href={RESUME} download variant="outline" size="lg">
              <FaFileDownload aria-hidden />
              {t.downloadResume}
            </Button>
          </div>

          <ul aria-label={t.linksLabel} style={delay(0.5)} className="slide mt-6 flex gap-2">
            {dock.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-lg transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 active:scale-90"
                >
                  <Icon aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Snapshot card: where I work now, and the numbers behind it. */}
        <div
          style={delay(0.3)}
          className="rise relative mx-auto w-full max-w-[32rem] lg:max-w-none"
        >
          <HeroOrb />
          <div
            data-tilt
            className="glass beam relative rounded-[2rem] p-5 shadow-[0_40px_90px_-40px_rgb(var(--accent)/0.5)] transition-transform duration-200 ease-out sm:p-7"
          >
            <p className="font-mono-ui text-xs font-medium uppercase tracking-widest text-muted">
              {t.now.label}
            </p>
            <p className="font-display mt-2 text-xl font-semibold leading-snug sm:text-2xl">
              {t.now.role}
            </p>
            <p className="mt-0.5 text-base text-muted">
              {t.now.company} · {t.now.period}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.now.stack.map((item) => (
                <li
                  key={item}
                  className="font-mono-ui rounded-full bg-accent/12 px-3 py-1 text-xs font-medium text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1 bg-surface p-4">
                  <dt className="text-xs font-medium leading-snug text-muted sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl font-semibold tracking-[-0.03em] text-accent sm:text-4xl">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
