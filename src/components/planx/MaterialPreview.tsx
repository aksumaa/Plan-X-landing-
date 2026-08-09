import { motion } from "framer-motion";
import { Grid2x2, Package, Bolt, Blocks, TreePine, Frame } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";

type Row = { key: string; qty: string; unit: string };

const ROWS: Row[] = [
  { key: "brick", qty: "12,540", unit: "pcs" },
  { key: "cement", qty: "72", unit: "bags" },
  { key: "steel", qty: "5.4", unit: "tons" },
  { key: "concrete", qty: "54", unit: "m³" },
  { key: "wood", qty: "18", unit: "m³" },
  { key: "glass", qty: "86", unit: "m²" },
];

const ICONS: Record<string, typeof Grid2x2> = {
  brick: Grid2x2,
  cement: Package,
  steel: Bolt,
  concrete: Blocks,
  wood: TreePine,
  glass: Frame,
};

const COPY: Record<
  Lang,
  { label: string; headline: string; text: string; note: string; names: Record<string, string>; units: Record<string, string> }
> = {
  EN: {
    label: "Material Preview",
    headline: "Every volume, translated into materials.",
    text: "A live bill of quantities generated from the model — updated the moment the design changes.",
    note: "Demo values for a 240 m² two-storey residence.",
    names: { brick: "Brick", cement: "Cement", steel: "Steel", concrete: "Concrete", wood: "Wood", glass: "Glass" },
    units: { pcs: "pcs", bags: "bags", tons: "tons", "m³": "m³", "m²": "m²" },
  },
  RU: {
    label: "Расчёт материалов",
    headline: "Каждый объём — в материалах.",
    text: "Ведомость материалов формируется из модели и обновляется при изменении проекта.",
    note: "Демо-значения для дома 240 м², два этажа.",
    names: { brick: "Кирпич", cement: "Цемент", steel: "Сталь", concrete: "Бетон", wood: "Дерево", glass: "Стекло" },
    units: { pcs: "шт", bags: "мешков", tons: "тонн", "m³": "м³", "m²": "м²" },
  },
  UZ: {
    label: "Materiallar hisobi",
    headline: "Har bir hajm — materiallarga aylanadi.",
    text: "Materiallar ro‘yxati modeldan shakllanadi va loyiha o‘zgarganda yangilanadi.",
    note: "240 m², ikki qavatli uy uchun demo qiymatlar.",
    names: { brick: "G‘isht", cement: "Sement", steel: "Po‘lat", concrete: "Beton", wood: "Yog‘och", glass: "Shisha" },
    units: { pcs: "dona", bags: "qop", tons: "tonna", "m³": "m³", "m²": "m²" },
  },
};

export function MaterialPreview() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section
      id="materials"
      aria-labelledby="materials-title"
      className="border-y border-border bg-offwhite py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="materials-title" className="display max-w-2xl text-3xl sm:text-4xl md:text-5xl">
              {c.headline}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-3">
          {ROWS.map((r, i) => {
            const Icon = ICONS[r.key] ?? Blocks;
            return (
              <Reveal key={r.key} delay={i * 0.05}>
                <motion.li
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group h-full border border-border bg-background p-6 transition-colors duration-500 hover:border-accent/40 md:p-8"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon
                      className="size-5 shrink-0 text-accent"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <span className="eyebrow text-[0.625rem]">{c.units[r.unit] ?? r.unit}</span>
                  </div>
                  <p className="display mt-8 text-3xl md:text-4xl">{r.qty}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.names[r.key]}</p>
                  <div className="mt-6 h-px w-full bg-border">
                    <div className="h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
                  </div>
                </motion.li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal>
          <p className="mt-10 text-xs text-muted-foreground">{c.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
