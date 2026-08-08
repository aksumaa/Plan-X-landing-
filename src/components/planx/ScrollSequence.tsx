import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";

export type Frame = { src: string; label: string; alt: string };

function Layer({
  frame,
  index,
  total,
  progress,
}: {
  frame: Frame;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / Math.max(total - 1, 1);
  const start = Math.max((index - 0.9) * seg, 0);
  const end = Math.min((index - 0.1) * seg, 0.999);
  const opacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const scale = useTransform(progress, [0, 1], [1.08, 1.0]);


  return (
    <motion.div
      className="absolute inset-0"
      style={index === 0 ? { scale } : { opacity, scale }}
      aria-hidden={index > 0}
    >
      <img
        src={frame.src}
        alt={frame.alt}
        loading="lazy"
        width={1920}
        height={1088}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

export function ScrollSequence({
  frames,
  label,
  headline,
  id,
  className = "",
}: {
  frames: Frame[];
  label?: string;
  headline?: string;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.round(v * (frames.length - 1));
    setActive(Math.min(Math.max(i, 0), frames.length - 1));
  });

  return (
    <div id={id} ref={ref} style={{ height: `${frames.length * 90}vh` }} className={className}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {frames.map((f, i) => (
          <Layer key={f.src} frame={f} index={i} total={frames.length} progress={scrollYProgress} />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 md:px-16 md:pb-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-lg">
              {label && (
                <p className="eyebrow text-primary-foreground/60">{label}</p>
              )}
              {headline && (
                <h2 className="display mt-3 text-3xl text-primary-foreground sm:text-4xl md:text-5xl">
                  {headline}
                </h2>
              )}
            </div>

            <ol className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
              {frames.map((f, i) => (
                <li
                  key={f.label}
                  className={`text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                    i === active ? "text-primary-foreground" : "text-primary-foreground/35"
                  }`}
                >
                  {f.label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
