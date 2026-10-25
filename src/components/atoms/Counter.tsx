interface CounterProps {
  to: number;
  suffix?: string;
}

/** Renders the final value for crawlers and no-JS; `Effects` counts it up once when visible. */
export default function Counter({ to, suffix = "" }: CounterProps) {
  return (
    <span data-count={to} data-suffix={suffix} className="tabular-nums">
      {to}
      {suffix}
    </span>
  );
}
