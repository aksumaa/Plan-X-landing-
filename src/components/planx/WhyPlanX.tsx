import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { Check } from "lucide-react";
import concrete from "@/assets/concrete-mist.jpg";

export function WhyPlanX() {
  const { t } = useLang();

  return (
    <section id="why" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-6">
            <p className="eyebrow">{t.why.label}</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl md:text-[3.4rem]">
              {t.why.headline}
            </h2>
            <ul className="mt-10 space-y-4">
              {t.why.points.map((p) => (
                <li key={p} className="flex gap-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <dl className="mt-14 grid grid-cols-2 gap-y-10 border-t border-border pt-10">
              {t.why.stats.map((s) => (
                <div key={s.label}>
                  <dt className="display text-3xl text-foreground md:text-4xl">{s.value}</dt>
                  <dd className="mt-2 text-[0.8125rem] text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6">
            <img
              src={concrete}
              alt="Concrete massing study of a modern residence"
              loading="lazy"
              width={1600}
              height={1088}
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
