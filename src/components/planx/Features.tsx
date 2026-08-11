import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function Features() {
  const { t } = useLang();

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.features.label}</p>
          <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {t.features.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-border pt-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {t.features.items.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <span className="text-xs font-medium tracking-[0.16em] text-pine">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl tracking-[-0.02em] text-ink md:text-2xl">
                {f.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
