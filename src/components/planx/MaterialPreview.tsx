import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useLang, type Lang } from "@/lib/i18n";

import brickImg from "@/assets/mat-brick.jpg";
import cementImg from "@/assets/mat-cement.jpg";
import steelImg from "@/assets/mat-steel.jpg";
import concreteImg from "@/assets/mat-concrete.jpg";
import woodImg from "@/assets/mat-wood.jpg";
import glassImg from "@/assets/mat-glass.jpg";

type Row = { key: string; qty: string; unit: string; img: string; alt: string };

const ROWS: Row[] = [
  { key: "brick", qty: "12,540", unit: "pcs", img: brickImg, alt: "Close-up of red terracotta brick wall texture" },
  { key: "cement", qty: "72", unit: "bags", img: cementImg, alt: "Close-up of grey cement powder and cement bag" },
  { key: "steel", qty: "5.4", unit: "tons", img: steelImg, alt: "Close-up of bundled steel reinforcement bars" },
  { key: "concrete", qty: "54", unit: "m³", img: concreteImg, alt: "Close-up of architectural board-formed concrete surface" },
  { key: "wood", qty: "18", unit: "m³", img: woodImg, alt: "Close-up of stacked natural construction timber planks" },
  { key: "glass", qty: "86", unit: "m²", img: glassImg, alt: "Close-up of architectural glass panels with reflections" },
];

const COPY: Record<
  Lang,
  { label: string; headline: string; text: string; note: string; names: Record<string, string>; units: Record<string, string> }
> = {
  EN: {
    label: "Material Preview",
    headline: "Every volume, translated into materials.",
    text: "A live bill of quantities generated from the model — updated the moment the design changes.",
    note: "Estimated demo calculation — values shown for a 240 m² two-storey residence.",
    names: { brick: "Brick", cement: "Cement", steel: "Steel", concrete: "Concrete", wood: "Wood", glass: "Glass" },
    units: { pcs: "pcs", bags: "bags", tons: "tons", "m³": "m³", "m²": "m²" },
  },
  RU: {
    label: "Расчёт материалов",
    headline: "Каждый объём — в материалах.",
    text: "Ведомость материалов формируется из модели и обновляется при изменении проекта.",
    note: "Предварительный демо-расчёт — значения для дома 240 м², два этажа.",
    names: { brick: "Кирпич", cement: "Цемент", steel: "Сталь", concrete: "Бетон", wood: "Дерево", glass: "Стекло" },
    units: { pcs: "шт", bags: "мешков", tons: "тонн", "m³": "м³", "m²": "м²" },
  },
  UZ: {
    label: "Materiallar hisobi",
    headline: "Har bir hajm — materiallarga aylanadi.",
    text: "Materiallar ro‘yxati modeldan shakllanadi va loyiha o‘zgarganda yangilanadi.",
    note: "Taxminiy demo hisob — 240 m², ikki qavatli uy uchun qiymatlar.",
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
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-pine" />
            <p className="eyebrow">{c.label}</p>
          </div>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="materials-title" className="display max-w-2xl text-3xl sm:text-4xl md:text-5xl">
              {c.headline}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-3">
          {ROWS.map((r, i) => (
            <Reveal key={r.key} delay={i * 0.05}>
              <motion.li
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group h-full overflow-hidden rounded-sm border border-border bg-card transition-colors duration-300 hover:border-pine"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                  <img
                    src={r.img}
                    alt={r.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 size-1.5 rounded-full bg-pine opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div className="p-5 md:p-6">
                  <p className="eyebrow text-[0.625rem] text-sand">{c.units[r.unit] ?? r.unit}</p>
                  <p className="display mt-2 text-3xl md:text-4xl">{r.qty}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.names[r.key]}</p>
                  <div className="mt-4 h-px w-full bg-border">
                    <div className="h-px w-0 bg-pine transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </motion.li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 text-xs text-muted-foreground">{c.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
