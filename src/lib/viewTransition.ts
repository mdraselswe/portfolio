import { flushSync } from "react-dom";

type Mode = "circle" | "fade";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/**
 * Runs a state change inside a View Transition when the browser supports it
 * and the person has not asked for reduced motion. Falls back to a plain update.
 */
export function withViewTransition(
  update: () => void,
  mode: Mode,
  origin?: { x: number; y: number }
) {
  const doc = document as unknown as ViewTransitionDocument;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduced) {
    update();
    return;
  }

  const root = document.documentElement;
  root.dataset.vt = mode;
  if (origin) {
    root.style.setProperty("--vt-x", `${origin.x}px`);
    root.style.setProperty("--vt-y", `${origin.y}px`);
  }

  const transition = doc.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => {
    delete root.dataset.vt;
  });
}
