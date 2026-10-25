import { Fragment } from "react";
import AppTile from "@/components/atoms/AppTile";
import { Button } from "@/components/atoms/Button";
import RoleRotator from "@/components/atoms/RoleRotator";
import { heroTiles } from "@/data/appTiles";
import { FaFileDownload, FaGithub, FaLinkedin, MdEmail } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";
import type { CSSProperties } from "react";

const RESUME = "/Muhammad-Rasel-CV.pdf";

const dock = [
  {
    label: "GitHub",
    href: "https://github.com/mdraselswe",
    Icon: FaGithub,
    tone: 7,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mdraselswe",
    Icon: FaLinkedin,
    tone: 1,
    external: true,
  },
  { label: "Email", href: "mailto:mdraselswe@gmail.com", Icon: MdEmail, tone: 3, external: false },
  { label: "CV", href: RESUME, Icon: FaFileDownload, tone: 2, external: false },
];

/** Entrance animations are CSS, staggered through the --d variable. */
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

const tileMotion =
  "transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:scale-[1.07] active:scale-90";

export default function Hero({ lang }: { lang: Language }) {
  const t = getT(lang).hero;
  const words = t.title.split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate pb-20 pt-28 sm:pb-24 sm:pt-36"
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

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
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
            className="font-display mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.035em] sm:mt-7"
          >
            <span
              style={delay(0.08)}
              className="slide mb-4 block font-sans text-base font-medium tracking-normal text-muted sm:mb-5 sm:text-lg"
            >
              {t.kicker}
            </span>
            {words.map((word, i) => (
              <Fragment key={`${i}-${word}`}>
                <span style={delay(0.06 + i * 0.05)} className="word-in">
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
            className="slide mt-5 max-w-[34rem] text-base text-muted sm:mt-6 sm:text-lg"
          >
            {t.desc}
          </p>

          <div style={delay(0.42)} className="slide mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
            <div data-magnetic className="inline-block transition-transform duration-200 ease-out">
              <Button as="a" href="#work" size="lg">
                {t.seeWork}
              </Button>
            </div>
            <Button as="a" href={RESUME} download variant="outline" size="lg">
              <FaFileDownload aria-hidden />
              {t.downloadResume}
            </Button>
          </div>
        </div>

        {/* Home screen: the apps themselves are the navigation. */}
        <div style={delay(0.3)} className="rise mx-auto w-full max-w-[32rem] lg:max-w-none">
          <div
            data-tilt
            className="relative rounded-[2rem] border border-ink/10 bg-surface p-5 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.45)] transition-transform duration-200 ease-out sm:rounded-[2.5rem] sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_top_right,rgb(var(--accent)/0.16),transparent_60%)]"
            />
            <ul
              aria-label={t.appsLabel}
              className="relative grid grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-8"
            >
              {heroTiles.map(({ slug, Icon, tone, label }, i) => (
                <li key={slug} style={delay(0.45 + i * 0.05)} className="pop min-w-0">
                  <a
                    href={`#project-${slug}`}
                    className={`flex flex-col items-center gap-2 rounded-2xl ${tileMotion}`}
                  >
                    <AppTile Icon={Icon} tone={tone} size="lg" floatDelay={i * 0.35} />
                    <span className="w-full break-words text-center text-xs font-medium leading-tight sm:text-[0.8125rem]">
                      {label[lang]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ul
              aria-label={t.linksLabel}
              className="relative mt-7 flex justify-center gap-3 rounded-[1.5rem] bg-ink/6 p-3 sm:mt-9 sm:gap-4"
            >
              {dock.map(({ label, href, Icon, tone, external }, i) => (
                <li key={label} style={delay(0.85 + i * 0.05)} className="pop">
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(label === "CV" ? { download: true } : {})}
                    className={`block rounded-2xl ${tileMotion}`}
                  >
                    <AppTile Icon={Icon} tone={tone} size="md" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
