/** Scroll progress bar. `siteScript` scales it as the page scrolls. */
export default function Effects() {
  return (
    <div
      data-progress
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-accent"
    />
  );
}
