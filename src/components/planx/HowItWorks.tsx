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
    <section id="how" aria-labelledby="how-title" className="bg-offwhite/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 id="how-title" className="display mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {c.headline}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {c.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <li>
                <span className="text-xs font-medium tracking-[0.16em] text-pine">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
