import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function TrustedBy() {
  const { t } = useLang();

  return (
    <section className="relative border-y border-border py-14 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,#B0C4DE_40%,transparent),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow text-center">{t.trusted.label}</p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
            {t.trusted.logos.map((l) => (
              <li
                key={l}
                className="text-[0.75rem] tracking-[0.28em] text-slate/70 transition-colors hover:text-pine"
              >
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
