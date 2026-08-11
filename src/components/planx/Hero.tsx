import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-lakeside.jpg";

export function Hero({ onStart, onExplore }: { onStart: () => void; onExplore: () => void }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Modern lakeside pavilion in soft morning mist"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          initial={{ scale: 1.06 }}
          animate={reduced ? { scale: 1.03 } : { scale: [1.06, 1.12, 1.06] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3f4a55]/80 via-[#3f4a55]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3f4a55]/55 via-transparent to-[#3f4a55]/20" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 sm:px-10 md:px-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="display text-5xl leading-[1.15] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
            Plan<span className="text-[#B0C4DE]">X</span>
          </p>

          <h1 className="mt-5 font-display text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-white/95 sm:text-3xl md:text-[2.1rem]">
            {t.hero.headline}
          </h1>

          <p className="mt-5 max-w-md text-[0.95rem] leading-[1.7] text-white/75">
            {t.hero.support}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-pine px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[color-mix(in_srgb,#01796F_88%,#000)]"
            >
              {t.hero.primary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onExplore}
              className="rounded-xl px-4 py-3.5 text-sm font-medium text-white/85 transition hover:text-white"
            >
              {t.hero.secondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
