import { LANGS, useLang } from "@/lib/i18n";

export function Footer() {
  const { lang, setLang, t } = useLang();
  const hrefs = ["#features", "#architecture", "#how", "#calculator", "#gallery"];

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 md:px-16">
        <div className="flex flex-col gap-8 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="font-display text-lg tracking-[-0.03em] text-ink">
            PlanX
          </a>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {t.footer.links.map((l, i) => (
              <li key={l}>
                <a href={hrefs[i]} className="text-sm text-slate transition hover:text-pine">
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`text-xs tracking-wide transition ${
                  lang === l ? "text-ink" : "text-slate/60 hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs tracking-[0.14em] text-slate/60">
          © {new Date().getFullYear()} PlanX. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
