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
import heroMist from "@/assets/hero-mist.jpg";

export function Hero({ onStart, onExplore }: { onStart: () => void; onExplore: () => void }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 40, damping: 24, mass: 0.7 });

  const x = useTransform(sx, [-1, 1], [28, -28]);
  const y = useTransform(sy, [-1, 1], [16, -16]);
  const lightX = useTransform(sx, [-1, 1], ["28%", "72%"]);
  const lightY = useTransform(sy, [-1, 1], ["30%", "68%"]);
  const glare = useMotionTemplate`radial-gradient(55% 50% at ${lightX} ${lightY}, color-mix(in srgb, #B0C4DE 45%, transparent), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Full-bleed visual plane */}
      <motion.div className="absolute inset-0 -z-20" style={{ x, y }}>
        <motion.img
          src={heroMist}
          alt="Modern villa wrapped in mountain mist at dawn"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          initial={{ scale: 1.12 }}
          animate={reduced ? { scale: 1.08 } : { scale: [1.12, 1.2, 1.12] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Atmospheric washes — not badges/overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-[color-mix(in_srgb,#6D8196_35%,transparent)]" />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 mix-blend-soft-light"
        style={{ background: glare }}
      />
      {!reduced && <div aria-hidden className="mist-layer absolute inset-0 -z-10" />}

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:px-10 md:px-16 md:pb-20 md:pt-36">
        <motion.p
          className="display text-[clamp(3.2rem,12vw,8.5rem)] text-[#E8EEF5]"
          initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          PlanX
        </motion.p>

        <motion.h1
          className="mt-4 max-w-3xl font-display text-[clamp(1.55rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#B0C4DE]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.headline}
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <p className="max-w-md text-[0.95rem] leading-relaxed text-[#B0C4DE]/85">
            {t.hero.support}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 bg-pine px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-[color-mix(in_srgb,#01796F_85%,#5A5A5A)]"
            >
              {t.hero.primary}
              <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExplore}
              className="border-b border-[#B0C4DE]/45 pb-1 text-[0.75rem] uppercase tracking-[0.18em] text-[#E8EEF5] transition-colors hover:border-pine hover:text-pine"
            >
              {t.hero.secondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
