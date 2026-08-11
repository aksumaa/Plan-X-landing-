import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import model from "@/assets/wireframe-mist.jpg";

export function AiSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section id="ai" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <Reveal>
          <h2 className="display text-3xl leading-[1.2] sm:text-4xl md:text-5xl">{t.ai.headline}</h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-[1.7] text-slate">
            {t.ai.text}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <motion.div className="mx-auto mt-12 max-w-4xl px-6 md:mt-16" style={{ y }}>
          <img
            src={model}
            alt="Architectural wireframe visualization"
            loading="lazy"
            width={1600}
            height={1088}
            className="w-full rounded-2xl"
          />
        </motion.div>
      </Reveal>
    </section>
  );
}
