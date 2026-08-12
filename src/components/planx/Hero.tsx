import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroVilla from "@/assets/hero-villa.jpg";

export function Hero({ onStart, onExplore }: { onStart: () => void; onExplore: () => void }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.6 });

  const x = useTransform(sx, [-1, 1], [18, -18]);
  const y = useTransform(sy, [-1, 1], [10, -10]);
  const lightX = useTransform(sx, [-1, 1], ["30%", "70%"]);
  const lightY = useTransform(sy, [-1, 1], ["35%", "65%"]);
  const glareOpacity = useTransform(sx, [-1, 0, 1], [0.1, 0.22, 0.1]);
  const glare = useMotionTemplate`radial-gradient(60% 60% at ${lightX} ${lightY}, oklch(0.98 0.05 80 / 0.55), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-16">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          className="display mt-6 max-w-4xl text-[2.6rem] leading-[0.94] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.headline}
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
            {t.hero.support}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 bg-foreground px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent"
            >
              {t.hero.primary}
              <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExplore}
              className="border-b border-foreground/25 pb-1 text-[0.75rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.secondary}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative mt-12 h-[52vh] w-full overflow-hidden md:mt-16 md:h-[58vh]"
        onMouseMove={onMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.25 }}
      >
        {/* mouse parallax + gentle float */}
        <motion.div
          className="absolute inset-0"
          style={{ x, y }}
          animate={reduced ? { y: 0 } : { y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* slow cinematic zoom */}
          <motion.img
            src={heroVilla}
            alt="Modern concrete villa with floor-to-ceiling glass, swimming pool and landscaped garden at golden hour"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.06 }}
            animate={reduced ? { scale: 1.06 } : { scale: [1.06, 1.16, 1.06] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* subtle light that follows the cursor — reads as changing sun angle */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: glareOpacity, background: glare }}
        />
        {/* soft drifting light, independent of the cursor */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(45% 55% at 50% 45%, oklch(0.99 0.04 85 / 0.5), transparent 70%)",
            }}
            animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

    </section>
  );
}
