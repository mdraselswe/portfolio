# Portfolio — Muhammad Rasel

Personal portfolio of **Muhammad Rasel**, Software Engineer and Frontend / React Developer in Dhaka.
Two statically generated pages, English at `/` and Bangla (বাংলা) at `/bn`, built with
Next.js 15, TypeScript and Tailwind CSS.

**Live:** [mdrasel.site](https://mdrasel.site)

## Features

- **Two real URLs** — `/` (English) and `/bn` (Bangla), each server-rendered, with `hreflang`
  alternates and both listed in the sitemap, so both can be indexed
- **No client framework** — both pages are static HTML with no React or Next.js runtime in the
  browser (`unstable_runtimeJS: false`); one small inline script handles every interaction, so
  Lighthouse blocking time is zero
- **Motion without a library** — CSS entrances, scroll reveals, count-ups, tilt, spotlight and
  magnetic effects driven by `data-*` attributes and one small client controller; View Transitions
  for the theme switch; everything stops under `prefers-reduced-motion`
- **Light / dark theme** — follows `prefers-color-scheme`, remembers the choice, no flash on load
- **SEO** — metadata per language, JSON-LD (`Person`, `WebSite`, `ProfilePage`, `ItemList`),
  `sitemap.xml`, `robots.txt`, web manifest and a share image
- **Accessible** — skip link, labelled form, visible focus, 44px touch targets, axe-checked in light
  and dark, English and Bangla
- **Working contact form** — sent through the EmailJS REST API, no SDK

## Tech stack

| Area      | Stack                                                |
| --------- | ---------------------------------------------------- |
| Framework | Next.js 15 (Pages Router, static, zero client JS)    |
| Language  | TypeScript, React 19                                 |
| Styling   | Tailwind CSS 3, `tailwind-merge`                     |
| Email     | EmailJS                                              |
| Testing   | Jest, React Testing Library, Playwright, axe-core    |
| Quality   | ESLint 9 (flat config), Prettier, Husky, lint-staged |
| Hosting   | Vercel                                               |

## Getting started

```bash
git clone git@github.com:mdraselswe/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (English) or
[http://localhost:3000/bn](http://localhost:3000/bn) (Bangla).

### Environment variables

The contact form needs an [EmailJS](https://www.emailjs.com/) account. Create `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
# optional: Google Search Console verification token
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token
```

These are public by design (`NEXT_PUBLIC_*`) and ship in the client bundle, so keep the EmailJS
template locked to your own domain. Set the same variables in the Vercel project settings.

## Scripts

| Command               | What it does                                         |
| --------------------- | ---------------------------------------------------- |
| `npm run dev`         | Dev server with Turbopack                            |
| `npm run build`       | Production build                                     |
| `npm start`           | Serve the production build                           |
| `npm run lint`        | ESLint                                               |
| `npm run format`      | Prettier write                                       |
| `npm test`            | Jest unit tests                                      |
| `npx playwright test` | End-to-end: SEO, accessibility (axe), motion, layout |

`npx playwright test` uses a dev server on port 3111, or any server you point `E2E_PORT` at
(use a production build for numbers that match Lighthouse). A Husky pre-commit hook runs
`eslint --fix` and `prettier --write` on staged files.

## Project structure

```
src/
├── pages/
│   ├── index.tsx, bn.tsx    # / and /bn, both without a client runtime
│   ├── _document.tsx        # <html lang>, inline CSS, pre-paint theme script
│   └── _app.tsx             # fonts and global CSS
├── styles/globals.css       # design tokens and all motion CSS
├── components/
│   ├── atoms/               # Button, AppTile, project cards, Reveal, Effects, ContactForm …
│   └── organisms/           # HomePage, Header, Hero, About, Projects, Skills, Contact, Footer
├── data/                    # projects.ts, skills.ts, appTiles.ts — keyed by `en` / `bn`
├── lib/                     # siteScript (all interactivity), i18n, seo (head + JSON-LD)
├── translations/            # all UI copy, EN and BN
└── types/
e2e/                         # Playwright specs
public/                      # og.png, CV PDF, robots.txt, sitemap.xml, manifest
```

## Adding a project

Add an entry to both the `en` and `bn` lists in `src/data/projects.ts` with the same `slug` and a
`group` (`featured`, `platform`, `more` or `earlier`), then add its position to `ORDER` at the bottom
of that file. Give it an icon in `src/data/appTiles.ts`. `featured` projects appear as large cards;
the first six slugs in `HERO_SLUGS` appear on the hero home screen.

## Testing

```bash
npm test               # unit tests
npx playwright test    # e2e (needs a server, see above)
```

## Deployment

Deployed on **Vercel**. Every push to `main` triggers a production deploy to
[mdrasel.site](https://mdrasel.site); pull requests get their own preview URL. After the first
deploy, add the domain to Google Search Console and submit `https://mdrasel.site/sitemap.xml`.

## Featured projects

| Project           | Live                                                           | Source                                                    |
| ----------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| Pregnancy Tracker | [pregnancy.mdrasel.site](https://pregnancy.mdrasel.site)       | [GitHub](https://github.com/mdraselswe/pregnancy-tracker) |
| LifeTrack         | [lifetrack.mdrasel.site](https://lifetrack.mdrasel.site)       | [GitHub](https://github.com/mdraselswe/lifetrack)         |
| Jelar Shad        | [jelarshad.shojashapta.com](https://jelarshad.shojashapta.com) | [GitHub](https://github.com/mdraselswe/jelarshad)         |
| GeduShop          | [gedushop.com](https://gedushop.com)                           | [GitHub](https://github.com/mdraselswe/gedushop-frontend) |
| CleanCV           | [cv.mdrasel.site](https://cv.mdrasel.site)                     | [GitHub](https://github.com/mdraselswe/cleancv)           |
| Husnul Dua        | [dua.mdrasel.site](https://dua.mdrasel.site)                   | [GitHub](https://github.com/mdraselswe/husnul-dua)        |

## Contact

- Portfolio — [mdrasel.site](https://mdrasel.site)
- LinkedIn — [mdraselswe](https://www.linkedin.com/in/mdraselswe)
- GitHub — [mdraselswe](https://github.com/mdraselswe)
- X — [@mdraselswe](https://x.com/mdraselswe)
