import type { IconType } from "react-icons";

const SIZES = {
  sm: "w-11 text-lg",
  md: "w-14 max-w-full text-2xl",
  lg: "w-[4.5rem] max-w-full text-3xl sm:w-24 sm:text-4xl",
} as const;

interface AppTileProps {
  Icon: IconType;
  /** `.tile-N` hue from globals.css; omit for the neutral tile */
  tone?: number;
  size?: keyof typeof SIZES;
  className?: string;
  /** Seconds of delay for the idle bob; omit for a still tile */
  floatDelay?: number;
}

/** A rounded app-icon tile. Decorative: the label always lives next to it. */
export default function AppTile({
  Icon,
  tone,
  size = "md",
  className = "",
  floatDelay,
}: AppTileProps) {
  const toneClass = tone === undefined ? "tile-neutral" : `tile-${tone}`;

  return (
    <span
      aria-hidden
      style={floatDelay === undefined ? undefined : { animationDelay: `${floatDelay}s` }}
      className={`tile shrink-0 ${toneClass} ${SIZES[size]} ${
        floatDelay === undefined ? "" : "animate-bob"
      } ${className}`}
    >
      <Icon className="h-[46%] w-[46%]" />
    </span>
  );
}
