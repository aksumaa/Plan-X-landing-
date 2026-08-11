import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";
import heroImg from "@/assets/hero-lakeside.jpg";

const COPY: Record<
  Lang,
  {
    label: string;
    headline: string;
    text: string;
    placeholder: string;
    prompt: string;
    cta: string;
    generating: string;
    stages: string[];
    ready: string;
    meta: string;
  }
> = {
  EN: {
    label: "AI Demo",
    headline: "Describe it. Watch it appear.",
    text: "A short prompt is enough. PlanX reads intent, then composes plan, volume and materials.",
    placeholder: "A two-storey concrete villa with a pool…",
    prompt: "A two-storey concrete villa with a pool and warm timber interiors",
    cta: "Generate",
    generating: "Generating",
    stages: ["Reading intent", "Massing volumes", "Resolving plan", "Rendering scene"],
    ready: "Concept ready",
    meta: "240 m² · 2 floors · concrete, glass, timber",
  },
  RU: {
    label: "AI-демо",
    headline: "Опишите — и увидите результат.",
    text: "Достаточно короткого запроса. PlanX собирает план, объём и материалы.",
    placeholder: "Двухэтажная бетонная вилла с бассейном…",
    prompt: "Двухэтажная бетонная вилла с бассейном и тёплым деревом внутри",
    cta: "Сгенерировать",
    generating: "Генерация",
    stages: ["Анализ запроса", "Построение объёмов", "Планировка", "Рендер сцены"],
    ready: "Концепт готов",
    meta: "240 м² · 2 этажа · бетон, стекло, дерево",
  },
  UZ: {
    label: "AI demo",
    headline: "Tavsiflang — natijani ko‘ring.",
    text: "Qisqa so‘rov kifoya. PlanX reja, hajm va materiallarni yig‘adi.",
    placeholder: "Basseynli ikki qavatli beton villa…",
    prompt: "Basseynli, ichi issiq yog‘ochli ikki qavatli beton villa",
    cta: "Yaratish",
    generating: "Yaratilmoqda",
    stages: ["So‘rov tahlili", "Hajmlar", "Reja", "Sahna renderi"],
    ready: "Konsepsiya tayyor",
    meta: "240 m² · 2 qavat · beton, shisha, yog‘och",
  },
};

export function AiDemo() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const [stage, setStage] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("run");
    setStage(0);
    c.stages.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStage(i), i * 800));
    });
    timers.current.push(setTimeout(() => setPhase("done"), c.stages.length * 800));
  };

  return (
    <section id="ai-demo" aria-labelledby="ai-demo-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="ai-demo-title" className="display max-w-2xl text-3xl sm:text-4xl md:text-5xl">
              {c.headline}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px border border-border bg-border md:mt-20 md:grid-cols-2">
            {/* prompt side */}
            <div className="bg-background p-7 md:p-10">
              <label htmlFor="ai-prompt" className="eyebrow">
                Prompt
              </label>
              <textarea
                id="ai-prompt"
                rows={4}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={c.placeholder}
                className="mt-4 w-full resize-none border-b border-border bg-transparent pb-3 text-base leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
              <button
                onClick={run}
                className="group mt-8 inline-flex min-h-11 items-center gap-3 bg-foreground px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent"
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
                {phase === "run" ? c.generating : c.cta}
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </button>

              <div aria-live="polite" className="mt-8 space-y-2">
                {c.stages.map((s, i) => {
                  const active = phase === "run" && stage === i;
                  const complete = phase === "done" || (phase === "run" && stage > i);
                  return (
                    <div key={s} className="flex items-center gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full transition-colors duration-500 ${
                          active ? "bg-accent" : complete ? "bg-foreground" : "bg-border"
                        }`}
                      />
                      <span className={active || complete ? "text-foreground" : "text-muted-foreground"}>
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* preview side */}
            <div className="relative min-h-[300px] overflow-hidden bg-offwhite md:min-h-[420px]">
              <AnimatePresence>
                {phase === "done" && (
                  <motion.img
                    key="render"
                    src={heroImg}
                    alt="Generated architectural concept"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </AnimatePresence>

              {phase !== "done" && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-full max-w-xs px-8">
                    <div className="h-px w-full overflow-hidden bg-border">
                      <motion.div
                        className="h-px bg-accent"
                        animate={{ width: phase === "run" ? "100%" : "0%" }}
                        transition={{ duration: c.stages.length * 0.8, ease: "linear" }}
                      />
                    </div>
                    <p className="eyebrow mt-4 text-center">
                      {phase === "run" ? c.generating : c.label}
                    </p>
                  </div>
                </div>
              )}

              {phase === "done" && (
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-background/85 px-5 py-3 backdrop-blur-md">
                  <span className="eyebrow text-foreground">{c.ready}</span>
                  <span className="text-xs text-muted-foreground">{c.meta}</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
