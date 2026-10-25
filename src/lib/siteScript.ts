/**
 * Everything interactive on the page, in one dependency-free function that is inlined into the
 * HTML as `(${siteScript})()`. The pages ship no React or Next.js runtime (see
 * `unstable_runtimeJS` in src/pages), which is what keeps Lighthouse blocking time at zero.
 *
 * Because the function is serialised with `.toString()`, it must stay self-contained: no imports,
 * no closures over module scope, and no syntax that needs a compiler helper (object spread,
 * optional chaining, nullish coalescing, classes). Markup opts in through data attributes:
 *
 *   [data-reveal]        fade/draw in once when scrolled into view (adds data-shown)
 *   [data-count]         count up once when scrolled into view
 *   [data-spotlight], [data-glow], [data-tilt], [data-magnetic]   mouse-only pointer effects
 *   [data-progress]      scroll progress bar
 *   [data-header-bar]    gets data-scrolled once the page moves
 *   [data-nav]           links with data-section; [data-pill] slides behind the current one
 *   [data-theme-toggle]  light/dark switch with a circular View Transition
 *   [data-roles]         cycles through a JSON list of job titles
 *   [data-contact]       contact form, sent through the EmailJS REST API
 */
export function siteScript() {
  const doc = document;
  const root = doc.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Reveal + count-up ────────────────────────────────────────────────────────────────────
  const countUp = (el: HTMLElement) => {
    if (reduced) return;
    const to = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.setAttribute("data-shown", "");
        if (el.dataset.count !== undefined) countUp(el);
        revealer.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -80px 0px" }
  );
  doc.querySelectorAll("[data-reveal], [data-count]").forEach((el) => revealer.observe(el));

  // ── Pointer effects (mouse only, one delegated listener) ─────────────────────────────────
  let tilted: HTMLElement | null = null;
  let pulled: HTMLElement | null = null;
  doc.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      if (reduced || e.pointerType !== "mouse") return;
      const target = e.target as Element | null;
      if (!target || !target.closest) return;

      const spot = doc.querySelector<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--sx", e.clientX - r.left + "px");
        spot.style.setProperty("--sy", e.clientY - r.top + "px");
      }

      const glow = target.closest<HTMLElement>("[data-glow]");
      if (glow) {
        const r = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", e.clientX - r.left + "px");
        glow.style.setProperty("--my", e.clientY - r.top + "px");
      }

      const tilt = target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) tilted.style.transform = "";
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform =
          "perspective(1100px) rotateX(" +
          (-py * 14).toFixed(2) +
          "deg) rotateY(" +
          (px * 14).toFixed(2) +
          "deg)";
      }

      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (pulled && pulled !== mag) pulled.style.transform = "";
      pulled = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        mag.style.transform = "translate3d(" + dx + "px, " + dy + "px, 0)";
      }
    },
    { passive: true }
  );

  // ── Continuous loops start on the visitor's first interaction (see globals.css) ─────────
  const loopEvents = ["pointermove", "scroll", "touchstart", "keydown"];
  const startLoops = () => {
    root.classList.add("motion-on");
    loopEvents.forEach((type) => window.removeEventListener(type, startLoops));
  };
  loopEvents.forEach((type) => window.addEventListener(type, startLoops, { passive: true }));
  window.setTimeout(startLoops, 6000);

  // ── Scroll: progress bar and header state ────────────────────────────────────────────────
  const progress = doc.querySelector<HTMLElement>("[data-progress]");
  const headerBar = doc.querySelector<HTMLElement>("[data-header-bar]");
  let frame = 0;
  const onFrame = () => {
    frame = 0;
    const max = root.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    if (progress) progress.style.transform = "scaleX(" + p + ")";
    if (headerBar) headerBar.toggleAttribute("data-scrolled", window.scrollY > 24);
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(onFrame);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Read layout only once the page has settled, never inside the first script task.
  window.setTimeout(onScroll, 1200);

  // ── Navigation: current section and sliding pill ─────────────────────────────────────────
  const nav = doc.querySelector<HTMLElement>("[data-nav]");
  const pill = nav ? nav.querySelector<HTMLElement>("[data-pill]") : null;
  const links = nav ? Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-section]")) : [];
  const placePill = () => {
    if (!nav || !pill) return;
    const current = nav.querySelector<HTMLElement>('[aria-current="true"]');
    if (!current) {
      pill.hidden = true;
      return;
    }
    pill.hidden = false;
    pill.style.width = current.offsetWidth + "px";
    pill.style.transform = "translateX(" + current.offsetLeft + "px)";
  };
  const setActive = (id: string) => {
    links.forEach((a) => {
      if (a.dataset.section === id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    placePill();
  };
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["top", "about", "work", "toolkit", "contact"].forEach((id) => {
    const el = doc.getElementById(id);
    if (el) spy.observe(el);
  });
  window.addEventListener("resize", placePill);

  // ── Theme: light/dark with a circular reveal ─────────────────────────────────────────────
  type TransitionDoc = Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  const withTransition = (update: () => void, mode: string, x?: number, y?: number) => {
    const d = doc as TransitionDoc;
    if (!d.startViewTransition || reduced) {
      update();
      return;
    }
    root.dataset.vt = mode;
    if (x !== undefined && y !== undefined) {
      root.style.setProperty("--vt-x", x + "px");
      root.style.setProperty("--vt-y", y + "px");
    }
    d.startViewTransition(update).finished.finally(() => {
      delete root.dataset.vt;
    });
  };

  const themeButton = doc.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (themeButton) {
    const syncLabel = () => {
      const dark = root.classList.contains("dark");
      themeButton.setAttribute(
        "aria-label",
        (dark ? themeButton.dataset.labelLight : themeButton.dataset.labelDark) || ""
      );
    };
    syncLabel();
    themeButton.addEventListener("click", () => {
      const next = root.classList.contains("dark") ? "light" : "dark";
      const r = themeButton.getBoundingClientRect();
      withTransition(
        () => {
          root.classList.remove("light", "dark");
          root.classList.add(next);
          try {
            // Same format as the pre-paint script reads: a JSON string.
            localStorage.setItem("theme", JSON.stringify(next));
          } catch {
            /* storage can be unavailable (private mode); the switch still works */
          }
          syncLabel();
        },
        "circle",
        r.left + r.width / 2,
        r.top + r.height / 2
      );
    });
  }

  // ── Role rotator ─────────────────────────────────────────────────────────────────────────
  let role = doc.querySelector<HTMLElement>("[data-roles]");
  if (role && !reduced) {
    const roles: string[] = JSON.parse(role.dataset.roles || "[]");
    let index = 0;
    if (roles.length > 1) {
      window.setInterval(() => {
        if (!role) return;
        index = (index + 1) % roles.length;
        // A fresh node restarts the CSS entrance animation.
        const next = role.cloneNode(false) as HTMLElement;
        next.textContent = roles[index];
        role.replaceWith(next);
        role = next;
      }, 2600);
    }
  }

  // ── Contact form (EmailJS REST API, no SDK) ──────────────────────────────────────────────
  const form = doc.querySelector<HTMLFormElement>("[data-contact]");
  if (form) {
    const status = form.querySelector<HTMLElement>('[role="status"]');
    const label = form.querySelector<HTMLElement>("[data-send-label]");
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const fields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
    );
    const value = (name: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      return el ? el.value : "";
    };
    const setBusy = (busy: boolean) => {
      fields.forEach((f) => (f.disabled = busy));
      if (button) {
        button.disabled = busy;
        button.toggleAttribute("aria-busy", busy);
      }
      if (label) label.textContent = (busy ? form.dataset.sending : form.dataset.send) || "";
    };
    const show = (state: string, text: string) => {
      if (!status) return;
      status.dataset.state = state;
      status.textContent = text;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      setBusy(true);
      show("", "");
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: form.dataset.service,
          template_id: form.dataset.template,
          user_id: form.dataset.key,
          template_params: {
            from_name: value("name"),
            from_email: value("email"),
            message: value("message"),
            to_email: "mdraselswe@gmail.com",
          },
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("EmailJS responded " + res.status);
          setBusy(false);
          form.reset();
          show("success", form.dataset.sent || "");
          window.setTimeout(() => show("", ""), 6000);
        })
        .catch((err) => {
          // Surfaces misconfiguration (missing NEXT_PUBLIC_EMAILJS_* at build) instead of
          // failing silently.
          console.error("EmailJS send failed:", err);
          setBusy(false);
          show("error", form.dataset.error || "");
        });
    });
  }
}
