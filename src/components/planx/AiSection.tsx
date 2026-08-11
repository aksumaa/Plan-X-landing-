import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import model from "@/assets/wireframe-mist.jpg";

export function AiSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="ai" ref={ref} className="relative overflow-hidden border-y border-border py-28 md:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_srgb,#B0C4DE_55%,transparent),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
        <Reveal>
          <h2 className="display text-4xl sm:text-5xl md:text-[3.4rem]">{t.ai.headline}</h2>
          <p className="mx-auto mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground">
            {t.ai.text}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <motion.div className="relative mx-auto mt-16 max-w-3xl px-6 md:mt-24" style={{ y }}>
          <img
            src={model}
            alt="Architectural wireframe of a modern villa in mist"
            loading="lazy"
            width={1600}
            height={1088}
            className="w-full"
          />
        </motion.div>
      </Reveal>
    </section>
  );
}
