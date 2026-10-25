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

Judge performance only on a production build (`npm run build && npm start`), never the dev server:
the pages ship no client JS in production, but the dev server still injects its own runtime.

## Architecture

Single-page Next.js 15 portfolio on the **Pages Router**, served as two static pages: English at
`/` (`src/pages/index.tsx`) and Bangla at `/bn` (`src/pages/bn.tsx`). Both export
`config = { unstable_runtimeJS: false }`, so the browser receives plain HTML with **no React or
Next.js runtime and no hydration**. That is the reason Lighthouse blocking time is zero; do not
remove it, and do not add `useState`/`useEffect`/event handlers to components, because nothing
runs them in the browser.

All interactivity lives in one dependency-free function, `src/lib/siteScript.ts`, inlined into
the page by `SiteScript`. Markup opts in with data attributes (`data-reveal`, `data-count`,
`data-tilt`, `data-spotlight`, `data-glow`, `data-magnetic`, `data-progress`, `data-header-bar`,
`data-nav`, `data-theme-toggle`, `data-roles`, `data-contact`). The function is serialised with
`.toString()`, so it must stay self-contained: no imports, no module-scope references, and no
syntax that needs a compiler helper (object spread, optional chaining, nullish coalescing).

`src/pages/_document.tsx` sets `<html lang>` from the page, inlines the stylesheet (no render-
blocking CSS request) and runs the pre-paint theme script. `src/pages/_app.tsx` loads the fonts
and global CSS (`src/styles/globals.css`).

**Component structure** follows atomic design — two levels only:

- `src/components/atoms/` — Button, AppTile, ProjectCard, FeaturedProjectCard, Reveal, Divider, Counter, Marquee, ContactForm, Effects, SeoHead, SiteScript …
- `src/components/organisms/` — HomePage, Header, Footer, Hero, About, Projects, Skills, Contact

**Bilingual (EN/BN)** — all user-facing text lives in `src/translations/index.ts`; components read
it with `getT(lang)` (`src/lib/i18n.ts`). Data files (`src/data/projects.ts`, `src/data/skills.ts`)
export objects keyed by `en`/`bn`. Language is the URL, not state, so both pages are crawlable.

**Theme** — `light`/`dark` class on `<html>`. The pre-paint script in `_document` applies the saved
choice (localStorage `theme`, stored as a JSON string) or the system preference; `siteScript`
handles the toggle. Icons for both states are rendered and swapped with `dark:` classes.

**Contact form** — `siteScript` posts to the EmailJS REST API; the public `NEXT_PUBLIC_EMAILJS_*`
ids are baked into data attributes at build time.

**Animations** — no animation library. Entrances, reveals and hovers are CSS (`.rise`, `.slide`,
`.word-in`, `.pop`, `.reveal`, `.draw` in `globals.css`, staggered with the `--d` variable).
Every animation must stop under `prefers-reduced-motion`. Position decorative layers in `rem`,
never in percentages of a section's height: a late font swap changes that height and the move
counts as layout shift.

**SEO** — site constants, keywords, per-language head data (`headFor`) and JSON-LD live in
`src/lib/seo.ts`; `SeoHead` renders the tags. `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
and the share image `og.png` are static files in `public/`. `e2e/seo.spec.ts` guards all of it.

**`src/lib/index.ts`** is a re-export barrel for React hooks, Next.js `Image` and `twMerge`, used by
tests; page components import from `react` / packages directly.

**Path alias** — `@/` maps to `src/`. Configured in `tsconfig.json` and mirrored in `jest.config.mjs` (`moduleNameMapper`).

**Tests** — Jest unit tests live in `__tests__/` folders next to what they test
(`src/lib/__tests__/`). Behaviour, SEO, accessibility and layout are covered by Playwright in `e2e/`.
