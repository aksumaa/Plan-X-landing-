import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import night from "@/assets/night-mist.jpg";

export function FinalCta({ onStart }: { onStart: () => void }) {
  const { t } = useLang();

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <img
        src={night}
        alt="Modern villa in mountain mist at night"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#3f4a55]/65" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 py-20 sm:px-10 md:px-16">
        <Reveal>
          <h2 className="display max-w-2xl text-4xl leading-[1.2] text-white sm:text-5xl">
            {t.final.headline}
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-pine px-5 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
            >
              {t.final.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-sm text-white/65">{t.final.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
