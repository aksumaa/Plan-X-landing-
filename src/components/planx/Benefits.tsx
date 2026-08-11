import { LayoutPanelTop, Box, Layers, Calculator } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";

const COPY: Record<Lang, { label: string; headline: string; items: { title: string; text: string }[] }> = {
  EN: {
    label: "Key Benefits",
    headline: "Four things PlanX does exceptionally well.",
    items: [
      { title: "AI Floor Plans", text: "Zoned, circulation-aware plans generated from a single description." },
      { title: "3D Visualization", text: "Walk your future home in cinematic real-time 3D before it exists." },
      { title: "Material Estimation", text: "Brick, cement, steel and glass quantities derived from your model." },
      { title: "Construction Cost", text: "Live budgets that update with every design decision you make." },
    ],
  },
  RU: {
    label: "Ключевые преимущества",
    headline: "Четыре вещи, которые PlanX делает превосходно.",
    items: [
      { title: "AI-планировки", text: "Зонированные планы с логикой перемещения — из одного описания." },
      { title: "3D-визуализация", text: "Пройдитесь по будущему дому в кинематографичном 3D." },
      { title: "Расчёт материалов", text: "Кирпич, цемент, сталь и стекло — количество из вашей модели." },
      { title: "Стоимость стройки", text: "Бюджет обновляется с каждым дизайн-решением." },
    ],
  },
  UZ: {
    label: "Asosiy afzalliklar",
    headline: "PlanX ayniqsa yaxshi bajaradigan to‘rt narsa.",
    items: [
      { title: "AI planlar", text: "Bitta tavsifdan zonalashtirilgan, harakat mantiqli rejalar." },
      { title: "3D vizualizatsiya", text: "Bo‘lajak uyingizni real vaqt 3D da aylanib chiqing." },
      { title: "Material hisobi", text: "G‘isht, sement, po‘lat va shisha miqdori modelingizdan." },
      { title: "Qurilish narxi", text: "Har bir qarorga qarab yangilanadigan byudjet." },
    ],
  },
};

const icons = [LayoutPanelTop, Box, Layers, Calculator];

export function Benefits() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section id="benefits" aria-labelledby="benefits-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 id="benefits-title" className="display mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {c.headline}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4 md:mt-16 md:gap-8">
          {c.items.map((it, i) => {
            const Icon = icons[i] ?? LayoutPanelTop;
            return (
              <Reveal key={it.title} delay={i * 0.05}>
                <li>
                  <Icon className="size-5 text-pine" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-5 font-display text-xl tracking-[-0.02em] text-ink">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{it.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
