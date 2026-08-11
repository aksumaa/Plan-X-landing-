import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import villa from "@/assets/hero-lakeside.jpg";
import minimal from "@/assets/facade-mist.jpg";
import luxury from "@/assets/pool-mist.jpg";
import compact from "@/assets/interior-mist.jpg";

const images = [villa, minimal, luxury, compact];

export function Showcase() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.showcase.label}</p>
          <h2 className="display mt-4 max-w-2xl text-3xl leading-[1.2] sm:text-4xl md:text-5xl">
            {t.showcase.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2">
          {t.showcase.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <figure
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-offwhite">
                  <motion.img
                    src={images[i]}
                    alt={p.title}
                    loading="lazy"
                    width={1600}
                    height={1200}
                    className="h-full w-full object-cover"
                    animate={{ scale: hovered === i ? 1.04 : 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl leading-[1.25] tracking-[-0.02em] text-ink">
                    {p.title}
                  </h3>
                  <span className="text-xs tracking-[0.12em] text-slate">{p.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
