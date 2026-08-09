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
    <section id="benefits" aria-labelledby="benefits-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 id="benefits-title" className="display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {c.headline}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {c.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={it.title} delay={i * 0.06}>
                <li className="group h-full border-b border-border px-0 py-9 transition-colors duration-500 sm:px-6 sm:[&:not(:last-child)]:border-r">
                  <Icon
                    className="size-5 shrink-0 text-accent transition-transform duration-500 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                    strokeWidth={1.4}
                  />
                  <h3 className="display mt-6 text-xl md:text-2xl">{it.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{it.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
