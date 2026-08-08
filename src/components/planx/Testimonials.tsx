import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="border-y border-border bg-offwhite py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow">{t.testimonials.label}</p>
          <h2 className="display mt-6 max-w-2xl text-4xl sm:text-5xl md:text-[3.4rem]">
            {t.testimonials.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {t.testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between border-t border-border pt-8">
                <blockquote className="text-lg leading-snug tracking-[-0.02em] text-foreground md:text-xl">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-10">
                  <p className="text-[0.875rem] text-foreground">{item.name}</p>
                  <p className="mt-1 text-[0.75rem] uppercase tracking-[0.16em] text-muted-foreground/70">
                    {item.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
