/** A hairline that draws itself across as the section scrolls into view. */
export default function Divider() {
  return <div aria-hidden data-reveal className="draw h-px bg-ink/20" />;
}
