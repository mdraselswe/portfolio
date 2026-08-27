# Portfolio — Muhammad Rasel

Personal portfolio of **Muhammad Rasel**, Senior Frontend Developer. A single-page,
bilingual (English / বাংলা) site built with Next.js 15, TypeScript and Tailwind CSS.

**Live:** [mdrasel.site](https://mdrasel.site)

## Features

- **Bilingual** — full EN/BN switch; every string lives in `src/translations/index.ts`
- **Light / dark theme** — follows `prefers-color-scheme`, remembers the choice in localStorage
- **Motion** — Framer Motion section reveals, Lenis smooth scroll, custom cursor, animated counters
- **Lazy sections** — every major section is `React.lazy` + `Suspense` loaded from `src/app/page.tsx`
- **Working contact form** — EmailJS, no backend required
- **SEO ready** — Open Graph and Twitter card metadata, long-lived cache headers for static assets
- **Accessible by default** — respects `prefers-reduced-motion`

## Tech stack

| Area      | Stack                                                |
| --------- | ---------------------------------------------------- |
| Framework | Next.js 15 (App Router, Turbopack in dev)            |
| Language  | TypeScript, React 19                                 |
| Styling   | Tailwind CSS 3, `tailwind-merge`                     |
| Motion    | Framer Motion, Lenis                                 |
| Email     | EmailJS                                              |
| Testing   | Jest, React Testing Library                          |
| Quality   | ESLint 9 (flat config), Prettier, Husky, lint-staged |
| Hosting   | Vercel                                               |

## Getting started

```bash
git clone git@github.com:mdraselswe/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The contact form needs an [EmailJS](https://www.emailjs.com/) account. Create `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

These are public by design (`NEXT_PUBLIC_*`) — they ship in the client bundle, so keep the
EmailJS template locked to your own domain. The same three variables must be set in the
Vercel project settings for the deployed site.

## Scripts

| Command                 | What it does               |
| ----------------------- | -------------------------- |
| `npm run dev`           | Dev server with Turbopack  |
| `npm run build`         | Production build           |
| `npm start`             | Serve the production build |
| `npm run lint`          | ESLint                     |
| `npm run format`        | Prettier write             |
| `npm run format:check`  | Prettier check (no writes) |
| `npm test`              | Jest with coverage         |
| `npm run test:watch`    | Jest in watch mode         |
| `npm run test:coverage` | Jest coverage report       |

A Husky pre-commit hook runs `eslint --fix` and `prettier --write` on staged files.

## Project structure

```
src/
├── app/                  # App Router entry — layout, page, global styles
├── components/
│   ├── atoms/            # Button, ProjectCard, SkillCard, cursor, loaders
│   └── organisms/        # Header, Hero, Skills, Projects, Stats, Contact, Footer
├── config/animations.ts  # Shared Framer Motion variants and timings
├── contexts/             # ThemeContext, LanguageContext
├── data/                 # projects.ts, skills.ts — keyed by `en` / `bn`
├── hooks/                # useLenis, useReducedMotion
├── lib/                  # Re-export barrel + localStorage helpers
├── translations/         # All UI copy, EN and BN
└── types/                # Shared TypeScript types
```

Content lives in `src/data/` and `src/translations/` — add a project or change copy there,
not in the components. Both files are keyed by language, so every entry needs an `en` **and**
a `bn` version.

`@/` is a path alias for `src/` (configured in `tsconfig.json`, mirrored in `jest.config.mjs`).

## Testing

```bash
npm test
```

Tests live in `__tests__/` folders next to the code they cover and run on jsdom with
React Testing Library.

## Deployment

Deployed on **Vercel**. Every push to `main` triggers a production deploy to
[mdrasel.site](https://mdrasel.site); pull requests get their own preview URL.

## Featured projects

| Project           | Live                                                     | Source                                                    |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| Pregnancy Tracker | [pregnancy.mdrasel.site](https://pregnancy.mdrasel.site) | [GitHub](https://github.com/mdraselswe/pregnancy-tracker) |
| LifeTrack         | [lifetrack.mdrasel.site](https://lifetrack.mdrasel.site) | [GitHub](https://github.com/mdraselswe/lifetrack)         |
| Husnul Dua        | [dua.mdrasel.site](https://dua.mdrasel.site)             | [GitHub](https://github.com/mdraselswe/husnul-dua)        |
| BloodReach        | [blood-reach.vercel.app](https://blood-reach.vercel.app) | [GitHub](https://github.com/mdraselswe/blood-reach)       |

## Contact

- Portfolio — [mdrasel.site](https://mdrasel.site)
- LinkedIn — [mdraselswe](https://www.linkedin.com/in/mdraselswe)
- GitHub — [mdraselswe](https://github.com/mdraselswe)
- X — [@mdraselswe](https://x.com/mdraselswe)
