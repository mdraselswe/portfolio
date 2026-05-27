"use client";

import { Button } from "@/components/atoms/Button";
import SplitText from "@/components/atoms/SplitText";
import AnimatedCounter from "@/components/atoms/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useMotionValue, useSpring, useTransform, useEffect } from "@/lib";
import { FaFileDownload, MdEmail } from "@/lib/icons";
import { translations } from "@/translations";

const TECH_BARS = [
  { label: "React.js", pct: 95, gradient: "from-cyan-500 to-blue-500" },
  { label: "TypeScript", pct: 90, gradient: "from-blue-500 to-indigo-500" },
  { label: "Next.js", pct: 92, gradient: "from-violet-500 to-blue-400" },
];

const FLOATING_PILLS = [
  {
    label: "React.js",
    cls: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
    pos: "top-4 -left-20",
  },
  {
    label: "TypeScript",
    cls: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    pos: "top-[38%] -left-24",
  },
  {
    label: "GraphQL",
    cls: "text-pink-300 border-pink-500/30 bg-pink-500/10",
    pos: "bottom-16 -left-16",
  },
  {
    label: "Next.js",
    cls: "text-white/60 border-white/15 bg-white/[0.05]",
    pos: "top-2 -right-16",
  },
  {
    label: "Node.js",
    cls: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    pos: "top-[50%] -right-20",
  },
  {
    label: "Tailwind",
    cls: "text-sky-300 border-sky-500/30 bg-sky-500/10",
    pos: "bottom-12 -right-14",
  },
];

// ── Stat card ─────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center px-5 py-4 rounded-2xl border border-gray-200/80 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] backdrop-blur-md shadow-sm"
    >
      <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
        <AnimatedCounter to={value} suffix={suffix} duration={2} />
      </span>
      <span className="text-xs text-gray-500 dark:text-white/35 mt-0.5 text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

// ── Profile card (right column) ───────────────────────────────────────────
function ProfileCard({ name }: { name: string }) {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/20 to-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating tech pills — lg only */}
      {FLOATING_PILLS.map(({ label, cls, pos }, i) => (
        <motion.span
          key={label}
          className={`absolute ${pos} hidden xl:inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-sm whitespace-nowrap z-20 ${cls}`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + i * 0.1, duration: 0.5, type: "spring", stiffness: 280 }}
        >
          {label}
        </motion.span>
      ))}

      {/* Main card */}
      <motion.div
        className="relative w-72 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.09] bg-white dark:bg-[#0c0c16] shadow-xl shadow-black/10 dark:shadow-black/50"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-violet-400/30" />

        <div className="p-5">
          {/* Avatar + info row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-500/30">
                MR
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c0c16]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{name}</p>
              <p className="text-xs text-gray-500 dark:text-white/35 leading-tight mt-0.5">
                Senior Frontend Dev
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-mono tracking-wide">
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Tech skill bars */}
          <div className="space-y-2.5 mb-5">
            {TECH_BARS.map(({ label, pct, gradient }, i) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 dark:text-white/40 font-mono">
                    {label}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-white/20 font-mono">{pct}%</span>
                </div>
                <div className="h-[3px] bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      delay: 1.2 + i * 0.15,
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
            {[
              { v: "8+", l: "Years" },
              { v: "50+", l: "Projects" },
              { v: "100%", l: "Quality" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-gray-900 dark:text-white font-bold text-sm">{v}</p>
                <p className="text-gray-400 dark:text-white/25 text-[10px] font-mono">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" />
      </motion.div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const t = translations[language].hero;
  const name = translations[language].name;

  const prefix = t.greeting.replace(name, "").trim().replace(/,\s*$/, "").trim();

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 50, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 50, damping: 25 });
  const blob1X = useTransform(springX, [-1, 1], [-60, 60]);
  const blob1Y = useTransform(springY, [-1, 1], [-50, 50]);
  const blob2X = useTransform(springX, [-1, 1], [50, -50]);
  const blob2Y = useTransform(springY, [-1, 1], [35, -35]);

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReduced, rawX, rawY]);

  const stats = [
    { value: 8, suffix: "+", label: t.yearsLabel },
    { value: 50, suffix: "+", label: t.projectsLabel },
    { value: 15, suffix: "+", label: t.techLabel },
    { value: 100, suffix: "%", label: t.satisfactionLabel },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-[#050508]" />
        {/* Grid light */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Grid dark */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Fade masks */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,white_100%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,#050508_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#050508] to-transparent" />
        {/* Parallax blobs */}
        <motion.div
          className="absolute w-[700px] h-[500px] top-[5%] left-[5%] bg-blue-500/10 dark:bg-blue-500/18 rounded-full blur-[140px] animate-glow-breathe"
          style={prefersReduced ? {} : { x: blob1X, y: blob1Y }}
          aria-hidden
        />
        <motion.div
          className="absolute w-[600px] h-[450px] bottom-[10%] right-[5%] bg-violet-500/8 dark:bg-violet-500/14 rounded-full blur-[120px] animate-glow-breathe [animation-delay:2.5s]"
          style={prefersReduced ? {} : { x: blob2X, y: blob2Y }}
          aria-hidden
        />
        <div className="absolute w-[400px] h-[300px] top-[40%] right-[20%] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-glow-breathe [animation-delay:1.2s]" />
      </div>

      {/* ── Main 2-column ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm text-sm text-gray-600 dark:text-white/60 mb-8 shadow-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
              </span>
              {t.availability}
            </motion.div>

            {/* Headline */}
            <h1 className="mb-5 font-bold tracking-tight leading-none" aria-label={t.greeting}>
              <span className="block text-2xl sm:text-3xl font-medium text-gray-500 dark:text-white/35 mb-2">
                <SplitText text={prefix} mode="words" delay={0.15} stagger={0.07} />
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-br from-gray-900 via-blue-800 to-violet-700 dark:from-white dark:via-blue-200 dark:to-violet-300 bg-clip-text text-transparent animate-gradient-shift"
                style={{ backgroundSize: "200% 200%" }}
              >
                <SplitText text={name} mode="words" delay={0.3} stagger={0.1} duration={0.75} />
              </span>
            </h1>

            {/* Role tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-sm font-medium mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {t.role}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-gray-500 dark:text-white/45 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              {t.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="lg"
                rounded
                className="w-full sm:w-auto px-8 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <MdEmail className="w-4 h-4" />
                  {t.getInTouch}
                </span>
              </Button>
              <Button
                as="a"
                href="./Sr_Frontend_Developer_(Muhammad_ Rasel).pdf"
                variant="outline"
                size="lg"
                rounded
                className="w-full sm:w-auto px-8 hover:-translate-y-0.5"
                download
              >
                <span className="flex items-center gap-2">
                  <FaFileDownload className="w-4 h-4" />
                  {t.downloadResume}
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Right: profile card */}
          <div className="flex-none flex items-center justify-center">
            <ProfileCard name={name} />
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 lg:mt-16 max-w-2xl lg:max-w-none mx-auto">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={1.3 + i * 0.08}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden
      >
        <span className="text-xs text-gray-400 dark:text-white/25 font-mono tracking-widest uppercase">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 dark:from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
