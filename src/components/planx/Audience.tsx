import { motion } from "framer-motion";
import { Home, Compass, Building2, Sofa, HardHat, Truck } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";

const ICONS = [Home, Compass, Building2, Sofa, HardHat, Truck];

const COPY: Record<Lang, { label: string; headline: string; items: { title: string; text: string }[] }> = {
  EN: {
    label: "Who is PlanX for?",
    headline: "Built for everyone who shapes a building.",
    items: [
      { title: "Homeowners", text: "See your future home before committing a single brick." },
      { title: "Architects", text: "Explore dozens of massing options in minutes, not weeks." },
      { title: "Developers", text: "Validate feasibility and budgets at concept stage." },
      { title: "Interior Designers", text: "Test materials, light and layouts inside real volumes." },
      { title: "Construction Companies", text: "Reliable quantities and sequencing from day one." },
      { title: "Material Suppliers", text: "Precise demand forecasts straight from live projects." },
    ],
  },
  RU: {
    label: "Для кого PlanX?",
    headline: "Для всех, кто создаёт здания.",
    items: [
      { title: "Домовладельцы", text: "Увидьте будущий дом до первого кирпича." },
      { title: "Архитекторы", text: "Десятки объёмных решений за минуты, а не недели." },
      { title: "Застройщики", text: "Проверка реализуемости и бюджета на этапе концепта." },
      { title: "Дизайнеры интерьера", text: "Материалы, свет и планировки в реальных объёмах." },
      { title: "Строительные компании", text: "Точные объёмы и последовательность работ." },
      { title: "Поставщики материалов", text: "Прогноз спроса напрямую из активных проектов." },
    ],
  },
  UZ: {
    label: "PlanX kimlar uchun?",
    headline: "Bino yaratadigan har bir kishi uchun.",
    items: [
      { title: "Uy egalari", text: "Birinchi g‘ishtdan oldin uyingizni ko‘ring." },
      { title: "Arxitektorlar", text: "O‘nlab variantni haftalar emas, daqiqalarda." },
      { title: "Developerlar", text: "Konsepsiya bosqichida byudjet va imkoniyatni tekshirish." },
      { title: "Interyer dizaynerlari", text: "Material, yorug‘lik va rejalarni real hajmda sinash." },
      { title: "Qurilish kompaniyalari", text: "Birinchi kundan ishonchli hajm va ketma-ketlik." },
      { title: "Material yetkazuvchilar", text: "Faol loyihalardan aniq talab prognozi." },
    ],
  },
};

export function Audience() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section id="audience" aria-labelledby="audience-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 id="audience-title" className="display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {c.headline}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {c.items.map((it, i) => {
            const Icon = ICONS[i] ?? Home;
            return (
              <Reveal key={it.title} delay={i * 0.05}>
                <motion.li
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full flex-col border border-border bg-card p-7 transition-colors duration-500 hover:border-accent/40 md:p-9"
                >
                  <Icon className="size-5 text-accent" strokeWidth={1.4} aria-hidden="true" />
                  <h3 className="display mt-7 text-xl md:text-2xl">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
                </motion.li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
