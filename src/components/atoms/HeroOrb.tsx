const RING = "REACT · NEXT.JS · TYPESCRIPT · GRAPHQL · OPEN TO WORK · DHAKA · ";

/**
 * Decorative glowing sphere with a turning text ring and a few sparks, behind the hero card.
 * Pure CSS and one inline SVG: hidden below 1024px, so phones never pay for it. Positioned in
 * rem (not %) so a late font swap cannot move it and cause layout shift.
 */
export default function HeroOrb() {
  return (
    <div aria-hidden className="orb pointer-events-none absolute -z-10 hidden lg:block">
      <div className="orb-core" />
      <svg className="orb-ring" viewBox="0 0 400 400" focusable="false">
        <defs>
          <path id="orb-path" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
        </defs>
        <text>
          <textPath href="#orb-path" textLength="1060" lengthAdjust="spacing">
            {RING}
          </textPath>
        </text>
      </svg>
      <i className="spark" style={{ left: "6rem", top: "14rem" }} />
      <i className="spark" style={{ left: "30rem", top: "10rem", animationDelay: "-2s" }} />
      <i className="spark" style={{ left: "12rem", top: "26rem", animationDelay: "-4s" }} />
      <i className="spark" style={{ left: "34rem", top: "24rem", animationDelay: "-6s" }} />
      <i className="spark" style={{ left: "20rem", top: "5rem", animationDelay: "-3s" }} />
    </div>
  );
}
