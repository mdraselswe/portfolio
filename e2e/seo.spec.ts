import { expect, test } from "@playwright/test";

const SITE = "https://mdrasel.site";

test.describe("on-page SEO", () => {
  test("title, description and canonical", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("Muhammad Rasel");
    expect(title).toMatch(/Frontend/i);
    expect(title).toMatch(/React/i);
    expect(title).toMatch(/Software Engineer/i);
    expect(title.length).toBeLessThanOrEqual(65);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThanOrEqual(110);
    expect(description!.length).toBeLessThanOrEqual(160);
    for (const kw of ["Software Engineer", "Frontend Developer", "React"]) {
      expect(description).toContain(kw);
    }

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/mdrasel\.site\/?$/
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("robots meta allows indexing", async ({ page }) => {
    await page.goto("/");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("index");
    expect(robots).not.toContain("noindex");
  });

  test("Open Graph and Twitter tags are complete", async ({ page }) => {
    await page.goto("/");
    const og = (p: string) => page.locator(`meta[property="${p}"]`).first().getAttribute("content");
    expect(await og("og:title")).toContain("Muhammad Rasel");
    expect(await og("og:description")).toBeTruthy();
    expect(await og("og:url")).toBe(SITE);
    expect(await og("og:image")).toContain("/og.png");
    expect(await og("og:type")).toBe("profile");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);
  });

  test("exactly one h1 and a sensible heading outline", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Muhammad Rasel");
    const levels = await page.$$eval("h1,h2,h3,h4", (els) => els.map((e) => Number(e.tagName[1])));
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test("target keywords are in the server-rendered HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const kw of [
      "Software Engineer",
      "Frontend Developer",
      "React Developer",
      "Muhammad Rasel",
      "Dhaka",
      "Next.js",
    ]) {
      expect(html, `missing "${kw}" in initial HTML`).toContain(kw);
    }
  });

  test("JSON-LD is valid and describes the Person", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(raw.length).toBeGreaterThan(0);
    const graph = JSON.parse(raw[0])["@graph"] as Array<Record<string, unknown>>;
    const types = graph.map((n) => n["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Person", "WebSite", "ProfilePage", "ItemList"]));

    const person = graph.find((n) => n["@type"] === "Person")!;
    expect(person.name).toBe("Muhammad Rasel");
    expect(person.jobTitle).toEqual(
      expect.arrayContaining(["Software Engineer", "Frontend Developer", "React Developer"])
    );
    expect(person.url).toBe(SITE);
    expect(person.sameAs as string[]).toEqual(
      expect.arrayContaining([
        expect.stringContaining("github.com"),
        expect.stringContaining("linkedin.com"),
      ])
    );
    const list = graph.find((n) => n["@type"] === "ItemList") as { itemListElement: unknown[] };
    expect(list.itemListElement).toHaveLength(18);
  });

  test("every external link is safe and every image has alt text", async ({ page }) => {
    await page.goto("/");
    const unsafe = await page.$$eval('a[target="_blank"]', (els) =>
      els
        .filter((a) => !/noopener/.test(a.getAttribute("rel") ?? ""))
        .map((a) => a.getAttribute("href"))
    );
    expect(unsafe).toEqual([]);
    const noAlt = await page.$$eval("img:not([alt])", (els) => els.length);
    expect(noAlt).toBe(0);
  });
});

test.describe("Bangla page (/bn)", () => {
  test("has its own title, canonical and language", async ({ page }) => {
    await page.goto("/bn");
    await expect(page.locator("html")).toHaveAttribute("lang", "bn");
    expect(await page.title()).toContain("মোহাম্মদ রাসেল");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/mdrasel\.site\/bn\/?$/
    );
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("both pages declare hreflang alternates", async ({ page }) => {
    for (const url of ["/", "/bn"]) {
      await page.goto(url);
      const langs = await page.$$eval('link[rel="alternate"][hreflang]', (els) =>
        els.map((e) => `${e.getAttribute("hreflang")}=${e.getAttribute("href")}`)
      );
      expect(langs.join(" ")).toMatch(/en=https:\/\/mdrasel\.site\/?(\s|$)/);
      expect(langs.join(" ")).toMatch(/bn=https:\/\/mdrasel\.site\/bn/);
      expect(langs.join(" ")).toContain("x-default=");
    }
  });

  test("JSON-LD ProfilePage is in Bangla", async ({ page }) => {
    await page.goto("/bn");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(raw!)["@graph"] as Array<Record<string, unknown>>;
    const profile = graph.find((n) => n["@type"] === "ProfilePage")!;
    expect(profile.inLanguage).toBe("bn");
  });

  test("Bangla content is in the server-rendered HTML", async ({ request }) => {
    const html = await (await request.get("/bn")).text();
    expect(html).toContain("নির্বাচিত কাজ");
    expect(html).toContain("প্রেগন্যান্সি ট্র্যাকার");
  });
});

test.describe("server rendering", () => {
  test("sections are in the raw HTML, no JavaScript needed", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const text of [
      "About Muhammad Rasel",
      "Selected work",
      "Pregnancy Tracker",
      "Bohubrihi - Learning Platform",
      "Let&#x27;s talk",
    ]) {
      expect(html, `missing "${text}"`).toContain(text);
    }
  });

  test("content is visible with JavaScript disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 2, name: "Selected work" })).toBeVisible();
    const opacity = await page
      .locator("#work .reveal")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
    await context.close();
  });
});

test.describe("crawler files", () => {
  test("sitemap.xml lists the canonical URL", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain(`<loc>${SITE}</loc>`);
    expect(xml).toContain(`<loc>${SITE}/bn</loc>`);
    expect(xml).toContain('hreflang="bn"');
  });

  test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Allow: /");
    expect(body).not.toMatch(/Disallow:\s*\/\s*$/m);
    expect(body).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  test("Open Graph image renders as a PNG", async ({ request }) => {
    const res = await request.get("/og.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("web app manifest is served", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
    expect((await res.json()).name).toContain("Muhammad Rasel");
  });
});

test.describe("motion", () => {
  test("theme switch runs a view transition and ends clean", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: /Switch to (dark|light) theme/ }).click();
    await page.waitForTimeout(1200);
    await expect(page.locator("html")).not.toHaveAttribute("data-vt", /.+/);
    await expect(page.locator("html")).toHaveClass(/dark|light/);
  });

  test("scroll progress bar grows with scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(800);
    const bar = page.locator("div.fixed.top-0.h-\\[3px\\]");
    const before = await bar.evaluate((el) => el.getBoundingClientRect().width);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(900);
    const after = await bar.evaluate((el) => el.getBoundingClientRect().width);
    expect(after).toBeGreaterThan(before + 100);
  });

  test("counters reach their final values", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about dl").scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    await expect(page.locator("#about dl dd").first()).toHaveText("8+");
    await expect(page.locator("#about dl dd").nth(1)).toHaveText("3M+");
  });

  test("role rotator keeps every title readable for assistive tech", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#top .sr-only")).toContainText(
      "Software Engineer, Frontend Developer, React Developer"
    );
  });

  test("reduced motion: no animated transform on the ticker", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const name = await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toBe("none");
  });
});
