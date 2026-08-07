import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how" className="border-y border-border bg-offwhite py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.how.label}</p>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="grid items-baseline gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <span className="text-[0.75rem] tracking-[0.2em] text-accent md:col-span-2">
                  {s.n}
                </span>
                <h3 className="display text-3xl sm:text-4xl md:col-span-6 md:text-5xl">
                  {s.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground md:col-span-4">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>
  );
}
