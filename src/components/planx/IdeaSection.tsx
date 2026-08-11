import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import wireframe from "@/assets/wireframe-mist.jpg";

export function IdeaSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);

  return (
    <section id="architecture" ref={ref} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">{t.idea.label}</p>
              <h2 className="display mt-4 text-3xl leading-[1.2] sm:text-4xl md:text-5xl">
                {t.idea.headline}
              </h2>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-[1.7] text-slate">{t.idea.text}</p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <motion.div className="relative overflow-hidden rounded-2xl bg-offwhite" style={{ y }}>
                <motion.img
                  src={wireframe}
                  alt="Isometric architectural wireframe study"
                  loading="lazy"
                  width={1920}
                  height={1088}
                  className="w-full object-cover"
                  style={{ scale }}
                />
              </motion.div>
              <p className="mt-4 text-xs tracking-[0.16em] text-slate/70">{t.idea.caption}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
