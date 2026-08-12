import { LANGS, useLang } from "@/lib/i18n";

export function Footer() {
  const { lang, setLang, t } = useLang();
  const hrefs = ["#features", "#architecture", "#how", "#calculator", "#gallery"];

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 md:px-16">
        <div className="flex flex-col gap-8 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="display text-lg">
            PlanX
          </a>

          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {t.footer.links.map((l, i) => (
              <li key={l}>
                <a
                  href={hrefs[i]}
                  className="text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
                >
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
                className={`text-[0.6875rem] tracking-[0.16em] transition-colors ${
                  lang === l ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground/60">
          © {new Date().getFullYear()} PlanX. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
