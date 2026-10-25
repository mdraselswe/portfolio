import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const SHOTS = process.env.SHOT_DIR ?? path.join("e2e", "screenshots");

async function open(page: Page, url = "/") {
  await page.goto(url);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Let the one hero entrance sequence finish before measuring or capturing.
  await page.waitForTimeout(1200);
}

/** Scrolls the whole page so every scroll-triggered reveal and counter has run. */
async function revealAll(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(2000);
}

test.describe("structure and content", () => {
  test("renders every section with no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    await open(page);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "I make the calls. AI makes me fast."
    );
    for (const name of ["About Muhammad Rasel", "Selected work", "Toolkit", "Let's talk"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    await expect(page.locator("article[id^=project-]")).toHaveCount(18);
    expect(errors).toEqual([]);
  });

  test("hero app tiles jump to their project", async ({ page }) => {
    await open(page);
    await page
      .getByRole("list", { name: /Products I've built/ })
      .getByRole("link", { name: "LifeTrack" })
      .click();
    await expect(page.locator("#project-lifetrack")).toBeInViewport();
    await expect(page).toHaveURL(/#project-lifetrack$/);
  });

  test("project links are labelled and open safely", async ({ page }) => {
    await open(page);
    const live = page.getByRole("link", { name: "Open live site for LifeTrack" });
    await expect(live).toHaveAttribute("href", "https://lifetrack.mdrasel.site");
    await expect(live).toHaveAttribute("rel", /noopener/);
    await expect(live).toHaveAttribute("target", "_blank");
  });
});

test.describe("interaction", () => {
  test("navigation marks the current section", async ({ page }) => {
    await open(page);
    const toolkit = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Toolkit" });
    await toolkit.click();
    await expect(toolkit).toHaveAttribute("aria-current", "true");
  });

  test("language switch navigates between / and /bn", async ({ page }) => {
    await open(page);
    await page.getByRole("link", { name: "Switch language to Bangla" }).click();
    await expect(page).toHaveURL(/\/bn\/?$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "bn");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("এআই-এর");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "bn");
    await page.getByRole("link", { name: /ইংরেজিতে/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("theme switch toggles dark mode and persists", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await open(page);
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("first visit follows the system theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await open(page);
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("skip link is first in tab order and targets main", async ({ page }) => {
    await open(page);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("contact form has labels and reports failure in text", async ({ page }) => {
    await page.route("**/api.emailjs.com/**", (route) =>
      route.fulfill({ status: 400, body: "Bad Request" })
    );
    await open(page);
    await page.locator("form").getByLabel("Name").fill("Test User");
    await page.locator("form").getByLabel("Email").fill("test@example.com");
    await page.locator("form").getByLabel("Message").fill("Hello there");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("form").getByRole("status")).toContainText(
      "Couldn't send your message"
    );
  });

  test("contact form reports success and clears", async ({ page }) => {
    await page.route("**/api.emailjs.com/**", (route) =>
      route.fulfill({ status: 200, body: "OK" })
    );
    await open(page);
    await page.locator("form").getByLabel("Name").fill("Test User");
    await page.locator("form").getByLabel("Email").fill("test@example.com");
    await page.locator("form").getByLabel("Message").fill("Hello there");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("form").getByRole("status")).toContainText("Message sent");
    await expect(page.locator("form").getByLabel("Name")).toHaveValue("");
  });

  test("reduced motion still shows all content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("list", { name: /Products I've built/ }).getByRole("link")
    ).toHaveCount(6);
  });
});

test.describe("responsive", () => {
  for (const width of [320, 360, 375, 414, 768, 820, 1024, 1280, 1440, 1920]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await open(page);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  for (const lang of ["/", "/bn"]) {
    test(`hero app tiles never overlap or leave the panel (${lang})`, async ({ page }) => {
      await open(page, lang);
      for (const width of [320, 360, 390, 768, 820, 1024, 1032, 1180, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForTimeout(150);
        const { tiles, panel } = await page.evaluate(() => {
          const panelEl = document.querySelector("#top [data-tilt]")!;
          const rect = (el: Element) => {
            const r = el.getBoundingClientRect();
            return { l: r.left, t: r.top, r: r.right, b: r.bottom };
          };
          return {
            panel: rect(panelEl),
            tiles: [...panelEl.querySelectorAll("ul")[0].querySelectorAll("li > a")].map(rect),
          };
        });
        expect(tiles, `${width}px`).toHaveLength(6);
        for (let i = 0; i < tiles.length; i++) {
          const a = tiles[i];
          expect(a.l, `${width}px tile ${i} inside panel`).toBeGreaterThanOrEqual(panel.l - 0.5);
          expect(a.r, `${width}px tile ${i} inside panel`).toBeLessThanOrEqual(panel.r + 0.5);
          for (let j = i + 1; j < tiles.length; j++) {
            const b = tiles[j];
            const overlaps =
              a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
            expect(overlaps, `${width}px tiles ${i} and ${j} overlap`).toBe(false);
          }
        }
      }
    });
  }

  test("touch targets are at least 44px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await open(page);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("header a, header button, form button")]
        .map((el) => ({
          t: el.textContent?.trim() || el.getAttribute("aria-label"),
          r: el.getBoundingClientRect(),
        }))
        .filter(({ r }) => r.width > 0 && (r.height < 43.5 || r.width < 43.5))
        .map(({ t, r }) => `${t}: ${Math.round(r.width)}x${Math.round(r.height)}`)
    );
    expect(small).toEqual([]);
  });
});

test.describe("accessibility (axe)", () => {
  for (const scheme of ["light", "dark"] as const) {
    for (const lang of ["en", "bn"] as const) {
      test(`${scheme} / ${lang}: no WCAG A/AA violations`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await open(page, lang === "bn" ? "/bn" : "/");
        await revealAll(page);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        expect(
          results.violations.map(
            (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`
          )
        ).toEqual([]);
      });
    }
  }
});

test.describe("screenshots for visual review", () => {
  const shots = [
    { name: "desktop-light-en", w: 1440, h: 900, scheme: "light", lang: "en" },
    { name: "desktop-dark-en", w: 1440, h: 900, scheme: "dark", lang: "en" },
    { name: "desktop-light-bn", w: 1440, h: 900, scheme: "light", lang: "bn" },
    { name: "mobile-light-en", w: 390, h: 844, scheme: "light", lang: "en" },
    { name: "mobile-dark-bn", w: 390, h: 844, scheme: "dark", lang: "bn" },
    { name: "phone-small-light-en", w: 360, h: 740, scheme: "light", lang: "en" },
    { name: "tablet-light-en", w: 820, h: 1180, scheme: "light", lang: "en" },
    { name: "tablet-dark-bn", w: 820, h: 1180, scheme: "dark", lang: "bn" },
    { name: "laptop-light-en", w: 1024, h: 768, scheme: "light", lang: "en" },
  ] as const;

  for (const s of shots) {
    test(s.name, async ({ page }) => {
      await page.setViewportSize({ width: s.w, height: s.h });
      await page.emulateMedia({ colorScheme: s.scheme });
      await open(page, s.lang === "bn" ? "/bn" : "/");
      await revealAll(page);
      // Full-page capture needs every section rendered at once.
      await page.addStyleTag({ content: "*{content-visibility:visible !important}" });
      await page.screenshot({ path: path.join(SHOTS, `${s.name}.png`), fullPage: true });
    });
  }
});

test.describe("CV download and toolkit", () => {
  test("the CV link downloads the PDF", async ({ page, request }) => {
    const res = await request.get("/Muhammad-Rasel-CV.pdf");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
    const body = await res.body();
    expect(body.subarray(0, 4).toString()).toBe("%PDF");
    expect(body.length).toBeGreaterThan(100_000);

    await open(page);
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("link", { name: "Download CV" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe("Muhammad-Rasel-CV.pdf");
  });

  test("the old CV file is gone", async ({ request }) => {
    const res = await request.get("/Sr_Frontend_Developer_(Muhammad_%20Rasel).pdf");
    expect(res.status()).toBe(404);
  });

  const cvSkills = [
    "Headless UI",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redux Toolkit",
    "TanStack Query",
    "Apollo Client",
    "Cursor",
    "Claude Code",
    "Gemini CLI",
    "MCP",
    "LLM APIs",
    "Git",
    "Figma",
    "Docz",
    "Strapi",
    "Apito",
  ];

  test("every skill from the CV is in the toolkit, English page", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const toolkit = html.slice(html.indexOf('id="toolkit"'));
    for (const skill of [
      ...cvSkills,
      "Team Mentoring",
      "Code Reviews",
      "Agile/Scrum",
      "Technical Leadership",
    ]) {
      expect(toolkit, `missing "${skill}"`).toContain(skill);
    }
  });

  test("every skill from the CV is in the toolkit, Bangla page", async ({ request }) => {
    const html = await (await request.get("/bn")).text();
    const toolkit = html.slice(html.indexOf('id="toolkit"'));
    for (const skill of [...cvSkills, "টিম মেন্টরিং", "কোড রিভিউ", "টেকনিক্যাল লিডারশিপ"]) {
      expect(toolkit, `missing "${skill}"`).toContain(skill);
    }
  });
});
