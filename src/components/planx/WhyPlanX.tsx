import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { Check } from "lucide-react";
import concrete from "@/assets/concrete-mist.jpg";

export function WhyPlanX() {
  const { t } = useLang();

  return (
    <section id="why" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-6">
            <p className="eyebrow">{t.why.label}</p>
            <h2 className="display mt-4 text-3xl leading-[1.2] sm:text-4xl md:text-5xl">
              {t.why.headline}
            </h2>
            <ul className="mt-8 space-y-4">
              {t.why.points.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-slate">
                  <Check className="mt-1 size-4 shrink-0 text-pine" />
                  {p}
                </li>
              ))}
            </ul>

            <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-border pt-8">
              {t.why.stats.map((s) => (
                <div key={s.label}>
                  <dt className="display text-3xl leading-[1.2] text-ink md:text-4xl">{s.value}</dt>
                  <dd className="mt-2 text-sm text-slate">{s.label}</dd>
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
              className="h-full w-full rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
