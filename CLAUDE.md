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
```

Pre-commit hook runs `eslint --fix` + `prettier --write` on staged files via lint-staged.

## Architecture

Single-page Next.js 15 portfolio. All major sections lazy-loaded in `src/app/page.tsx` via `React.lazy` + `Suspense`.

**Component structure** follows atomic design — two levels only:

- `src/components/atoms/` — Button, Loading, ProjectCard, SkillCard, motion wrapper
- `src/components/organisms/` — Header, Footer, Hero, Skills, Projects, Contact

**Bilingual (EN/BN)** — all user-facing text lives in `src/translations/index.ts`. Data files (`src/data/projects.ts`, `src/data/skills.ts`) export objects keyed by `en`/`bn`. Components consume the active language from `useLanguage()` to pick the right key.

**Two global contexts** (both persist to localStorage via `src/lib/storage.ts`):

- `ThemeContext` — `light`/`dark`, initializes from localStorage then falls back to `prefers-color-scheme`. Applies class to `<html>`. Use `useTheme()`.
- `LanguageContext` — `en`/`bn`. Use `useLanguage()`.

**`src/lib/index.ts`** is a central re-export barrel for React hooks, Next.js `Image`, `twMerge`, and Framer Motion `motion`. Always import from `@/lib` instead of directly from packages.

**Animations** — shared Framer Motion variants and timing constants live in `src/config/animations.ts` (`containerVariants`, `itemVariants`, `viewportConfig`). Use these rather than defining inline variants.

**Path alias** — `@/` maps to `src/`. Configured in `tsconfig.json` and mirrored in `jest.config.mjs` (`moduleNameMapper`).

**Tests** live in `__tests__/` folders adjacent to what they test. Current coverage: context tests in `src/contexts/__tests__/`.
