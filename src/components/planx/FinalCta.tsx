import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import night from "@/assets/night.jpg";

export function FinalCta({ onStart }: { onStart: () => void }) {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
      <img
        src={night}
        alt="Modern villa illuminated at night with lit pool and warm interiors"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 sm:px-10 md:px-16">
        <Reveal>
          <h2 className="display max-w-3xl text-4xl text-primary-foreground sm:text-5xl md:text-[4rem]">
            {t.final.headline}
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 border border-primary-foreground/30 px-7 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-ink"
            >
              {t.final.cta}
              <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <p className="text-[0.8125rem] text-primary-foreground/60">{t.final.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
