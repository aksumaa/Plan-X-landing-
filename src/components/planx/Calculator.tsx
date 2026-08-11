import { useState } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import blueprint from "@/assets/blueprint-mist.jpg";

const RATES = [520, 780, 1150];
const FLOOR_FACTOR = [1, 0.94, 0.9];

export function Calculator({ onStart }: { onStart: () => void }) {
  const { t } = useLang();
  const [area, setArea] = useState(220);
  const [floors, setFloors] = useState(2);
  const [tier, setTier] = useState(1);

  const perSqm = Math.round((RATES[tier] ?? RATES[1]!) * (FLOOR_FACTOR[floors - 1] ?? 1));
  const total = perSqm * area;
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <section id="calculator" className="border-y border-border bg-offwhite py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.calc.label}</p>
          <h2 className="display mt-6 max-w-2xl text-4xl sm:text-5xl md:text-[3.4rem]">
            {t.calc.headline}
          </h2>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
            {t.calc.text}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <div className="space-y-10">
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="calc-area" className="eyebrow">
                    {t.calc.area}
                  </label>
                  <span className="display text-2xl">{area} m²</span>
                </div>
                <input
                  id="calc-area"
                  type="range"
                  min={60}
                  max={800}
                  step={10}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="mt-5 h-[2px] w-full cursor-pointer appearance-none bg-border accent-accent"
                />
              </div>

              <div>
                <p className="eyebrow">{t.calc.floors}</p>
                <div className="mt-4 flex gap-3">
                  {[1, 2, 3].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      aria-pressed={floors === f}
                      className={`h-11 w-14 border text-sm transition-colors ${
                        floors === f
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow">{t.calc.quality}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {t.calc.tiers.map((q, i) => (
                    <button
                      key={q}
                      onClick={() => setTier(i)}
                      aria-pressed={tier === i}
                      className={`border px-5 py-3 text-[0.75rem] uppercase tracking-[0.16em] transition-colors ${
                        tier === i
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <div className="relative overflow-hidden border border-border bg-ink p-8 md:p-10">
              <img
                src={blueprint}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-15"
              />
              <div className="relative">
                <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-primary-foreground/60">
                  {t.calc.estimate}
                </p>
                <p className="display mt-6 text-4xl text-primary-foreground sm:text-5xl">
                  {money.format(total)}
                </p>
                <p className="mt-4 text-[0.8125rem] text-primary-foreground/60">
                  {money.format(perSqm)} {t.calc.perSqm}
                </p>
                <div className="mt-8 h-px bg-primary-foreground/15" />
                <p className="mt-6 text-[0.75rem] leading-relaxed text-primary-foreground/50">
                  {t.calc.note}
                </p>
                <button
                  onClick={onStart}
                  className="mt-8 w-full border border-primary-foreground/30 px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-ink"
                >
                  {t.calc.cta}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
