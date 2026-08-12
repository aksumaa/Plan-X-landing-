import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function Features() {
  const { t } = useLang();

  return (
    <section id="features" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.features.label}</p>
          <h2 className="display mt-6 max-w-2xl text-4xl sm:text-5xl md:text-[3.4rem]">
            {t.features.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid border-t border-border md:mt-24 md:grid-cols-3">
          {t.features.items.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 0.07}
              className="border-b border-border p-8 md:border-r md:p-10 [&:nth-child(3n)]:md:border-r-0"
            >
              <span className="text-[0.6875rem] tracking-[0.24em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl tracking-[-0.02em] md:text-2xl">{f.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
