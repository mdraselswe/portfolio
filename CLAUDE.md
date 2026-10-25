# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Next.js + Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier write
npm test             # Jest (coverage collected by default)
npm run test:watch   # Jest watch mode
npx jest src/path/to/test.test.tsx  # Run single test file
npx playwright test  # E2E: SEO, a11y (axe), motion, responsive (uses dev server on :3111, or set E2E_PORT)
```

Pre-commit hook runs `eslint --fix` + `prettier --write` on staged files via lint-staged.

## Architecture

Single-page Next.js 15 portfolio, served at two static URLs: English at `/` (`src/app/(en)`) and Bangla at `/bn` (`src/app/(bn)/bn`). Each route group has its own root layout built from `RootShell` and renders `HomePage` with a `lang` prop. Sections are **server components** that take `lang`; text comes from `getT(lang)` (`src/lib/i18n.ts`) and `projects[lang]` / `skills[lang]`. Only these are client islands: `Header`, `Effects`, `RoleRotator`, `ContactForm`, `ThemeProvider`. Keep it that way: every new `"use client"` file adds hydration cost.

**Component structure** follows atomic design — two levels only:

- `src/components/atoms/` — Button, AppTile, ProjectCard, FeaturedProjectCard, Reveal, Divider, Counter, Marquee, ContactForm, Effects …
- `src/components/organisms/` — RootShell, HomePage, Header, Footer, Hero, About, Projects, Skills, Contact

**Bilingual (EN/BN)** — all user-facing text lives in `src/translations/index.ts`. Data files (`src/data/projects.ts`, `src/data/skills.ts`) export objects keyed by `en`/`bn`. Language is the URL, not state, so both pages are crawlable (hreflang in `buildMetadata`, both URLs in the sitemap).

**Theme** — `ThemeContext` (`light`/`dark`, persisted to localStorage via `src/lib/storage.ts`, applied as a class on `<html>`; a pre-paint script in `RootShell` avoids a flash). Use `useTheme()` in client components only.

**`src/lib/index.ts`** is a re-export barrel for React hooks, Next.js `Image` and `twMerge`. Use it from client components and tests only; server components import from `react` / packages directly (the barrel re-exports hooks, which a server component must not import).

**Animations** — no animation library; this keeps first-load JS small (Lighthouse performance). Entrances, reveals and hovers are CSS (`.rise`, `.word-up`, `.pop`, `.reveal`, `.draw` in `globals.css`, staggered with the `--d` variable). Scroll reveals, count-ups and pointer effects (tilt, spotlight, glow, magnetic) are driven by data attributes (`data-reveal`, `data-count`, `data-tilt`, `data-spotlight`, `data-glow`, `data-magnetic`) that the single `Effects` island picks up with one IntersectionObserver and one delegated pointer listener. Theme and language switches use `withViewTransition` (`src/lib/viewTransition.ts`). Every animation must stop under `prefers-reduced-motion`.

**SEO** — site constants, keywords and JSON-LD live in `src/lib/seo.ts`; `sitemap.ts`, `robots.ts` and `manifest.ts` sit in `src/app/`; the share image is `public/og.png`. `e2e/seo.spec.ts` guards all of it.

**Path alias** — `@/` maps to `src/`. Configured in `tsconfig.json` and mirrored in `jest.config.mjs` (`moduleNameMapper`).

**Tests** live in `__tests__/` folders adjacent to what they test. Current coverage: context tests in `src/contexts/__tests__/`.
