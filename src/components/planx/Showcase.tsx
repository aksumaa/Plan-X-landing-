import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import villa from "@/assets/hero-villa.jpg";
import minimal from "@/assets/project-minimal.jpg";
import luxury from "@/assets/project-luxury.jpg";
import compact from "@/assets/project-compact.jpg";

const images = [villa, minimal, luxury, compact];

export function Showcase() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.showcase.label}</p>
          <h2 className="display mt-6 max-w-2xl text-4xl sm:text-5xl md:text-[3.4rem]">
            {t.showcase.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {t.showcase.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <figure
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-offwhite">
                  <motion.img
                    src={images[i]}
                    alt={p.title}
                    loading="lazy"
                    width={1600}
                    height={1200}
                    className="h-full w-full object-cover"
                    animate={{
                      scale: hovered === i ? 1.05 : 1,
                      x: hovered === i ? -8 : 0,
                    }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent"
                    animate={{ opacity: hovered === i ? 0.25 : 0.6 }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                  <h3 className="display text-xl md:text-2xl">{p.title}</h3>
                  <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {p.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
