import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function TrustedBy() {
  const { t } = useLang();

  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <Reveal>
          <p className="eyebrow text-center">{t.trusted.label}</p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {t.trusted.logos.map((l) => (
              <li key={l} className="text-sm tracking-[0.12em] text-slate/70 transition hover:text-pine">
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
