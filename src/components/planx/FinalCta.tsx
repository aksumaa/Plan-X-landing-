import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import night from "@/assets/night-mist.jpg";

export function FinalCta({ onStart }: { onStart: () => void }) {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
      <img
        src={night}
        alt="Modern villa in mountain mist at night"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-[color-mix(in_srgb,#01796F_25%,transparent)]" />
      <div aria-hidden className="mist-layer absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 sm:px-10 md:px-16">
        <Reveal>
          <h2 className="display max-w-3xl text-4xl text-[#E8EEF5] sm:text-5xl md:text-[4rem]">
            {t.final.headline}
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 bg-pine px-7 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-[color-mix(in_srgb,#01796F_80%,#B0C4DE)]"
            >
              {t.final.cta}
              <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <p className="text-[0.8125rem] text-[#B0C4DE]/75">{t.final.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
