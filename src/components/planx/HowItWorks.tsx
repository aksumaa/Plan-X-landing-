import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";

const COPY: Record<Lang, { label: string; headline: string; steps: string[] }> = {
  EN: {
    label: "How it works",
    headline: "From a sentence to a construction-ready home.",
    steps: ["Idea", "AI Analysis", "Floor Plan", "3D Visualization", "Material Calculation", "Construction"],
  },
  RU: {
    label: "Как это работает",
    headline: "От фразы — до дома, готового к стройке.",
    steps: ["Идея", "AI-анализ", "Планировка", "3D-визуализация", "Расчёт материалов", "Строительство"],
  },
  UZ: {
    label: "Qanday ishlaydi",
    headline: "Bir gapdan qurilishga tayyor uygacha.",
    steps: ["Fikr", "AI tahlil", "Reja", "3D vizualizatsiya", "Material hisobi", "Qurilish"],
  },
};

export function HowItWorks() {
  const { lang, t } = useLang();
  const c = COPY[lang];
  const details = t.how.steps;

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="border-y border-border bg-offwhite py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 id="how-title" className="display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {c.headline}
          </h2>
        </Reveal>

        {/* timeline */}
        <ol className="relative mt-16 md:mt-24">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-full"
          />
          <div className="grid gap-10 md:grid-cols-6 md:gap-6">
            {c.steps.map((s, i) => (
              <Reveal key={s} delay={i * 0.07}>
                <li className="group relative flex gap-5 md:block">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-1.5 size-[15px] shrink-0 rounded-full border border-border bg-background transition-colors duration-500 group-hover:border-accent md:mt-0"
                  >
                    <span className="absolute inset-[4px] rounded-full bg-concrete transition-colors duration-500 group-hover:bg-accent" />
                  </span>
                  <div className="md:mt-6">
                    <span className="text-[0.6875rem] tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display mt-2 text-lg md:text-xl">{s}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {details[i]?.text ?? ""}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
