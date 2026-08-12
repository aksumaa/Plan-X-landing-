import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import wireframe from "@/assets/wireframe.jpg";

export function IdeaSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);

  return (
    <section id="architecture" ref={ref} className="bg-background py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">{t.idea.label}</p>
              <h2 className="display mt-6 text-4xl sm:text-5xl md:text-[3.4rem]">
                {t.idea.headline}
              </h2>
              <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">
                {t.idea.text}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <motion.div className="relative overflow-hidden bg-offwhite" style={{ y }}>
                <motion.img
                  src={wireframe}
                  alt="Isometric architectural wireframe of a modern villa with pool"
                  loading="lazy"
                  width={1920}
                  height={1088}
                  className="w-full object-cover mix-blend-multiply"
                  style={{ scale }}
                />
              </motion.div>
              <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                {t.idea.caption}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
