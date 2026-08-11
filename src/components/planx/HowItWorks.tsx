import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";

type Step = { title: string; text: string };

const COPY: Record<Lang, { label: string; headline: string; steps: Step[] }> = {
  EN: {
    label: "How it works",
    headline: "From a sentence to a construction-ready home.",
    steps: [
      { title: "Idea", text: "Describe the home you imagine in plain language." },
      { title: "AI Analysis", text: "Site, climate, program and constraints are read and structured." },
      { title: "Floor Plan", text: "Zoned plans with circulation and usable areas." },
      { title: "3D Visualization", text: "An explorable cinematic model of the result." },
      { title: "Material Calculation", text: "Quantities and budget derived from the model." },
      { title: "Construction", text: "Documentation your builder can start from." },
    ],
  },
  RU: {
    label: "Как это работает",
    headline: "От фразы — до дома, готового к стройке.",
    steps: [
      { title: "Идея", text: "Опишите дом, который представляете, простыми словами." },
      { title: "AI-анализ", text: "Участок, климат, программа и ограничения структурируются." },
      { title: "Планировка", text: "Зонированные планы с логикой перемещения." },
      { title: "3D-визуализация", text: "Кинематографичная модель, которую можно изучать." },
      { title: "Расчёт материалов", text: "Объёмы и бюджет прямо из модели." },
      { title: "Строительство", text: "Документация, с которой начнёт подрядчик." },
    ],
  },
  UZ: {
    label: "Qanday ishlaydi",
    headline: "Bir gapdan qurilishga tayyor uygacha.",
    steps: [
      { title: "Fikr", text: "Tasavvur qilgan uyingizni oddiy so‘zlar bilan tavsiflang." },
      { title: "AI tahlil", text: "Yer, iqlim, talablar va cheklovlar tuzilmaga solinadi." },
      { title: "Reja", text: "Harakat mantiqli, zonalashtirilgan rejalar." },
      { title: "3D vizualizatsiya", text: "Natijaning kinematografik modeli." },
      { title: "Material hisobi", text: "Modeldan olingan hajm va byudjet." },
      { title: "Qurilish", text: "Quruvchi boshlashi mumkin bo‘lgan hujjatlar." },
    ],
  },
};

export function HowItWorks() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative overflow-hidden border-y border-border py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_0%_50%,color-mix(in_srgb,#01796F_10%,transparent),transparent),linear-gradient(180deg,color-mix(in_srgb,#B0C4DE_35%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 id="how-title" className="display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {c.headline}
          </h2>
        </Reveal>

        <ol className="relative mt-16 md:mt-24">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:inset-x-0 md:bottom-auto md:top-[7px] md:h-px md:w-full"
          />
          <div className="grid gap-10 md:grid-cols-6 md:gap-6">
            {c.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <li className="group relative flex gap-5 md:block">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-1.5 size-[15px] shrink-0 rounded-full border border-slate/40 bg-background transition-colors duration-500 group-hover:border-pine md:mt-0"
                  >
                    <span className="absolute inset-[4px] rounded-full bg-slate transition-colors duration-500 group-hover:bg-pine" />
                  </span>
                  <div className="md:mt-6">
                    <span className="text-[0.6875rem] tracking-[0.2em] text-pine">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display mt-2 text-lg md:text-xl">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate">
                      {s.text}
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
