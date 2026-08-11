import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGS, useLang } from "@/lib/i18n";

export function Nav({ onStart }: { onStart: () => void }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "#benefits", label: t.nav.features },
    { href: "#how", label: t.nav.how },
    { href: "#ai-demo", label: t.nav.ai },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#faq", label: "FAQ" },
  ];

  const light = !solid && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 md:px-8">
      <nav
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5 ${
          solid || open
            ? "border border-border bg-white/85 text-foreground shadow-sm backdrop-blur-xl"
            : "border border-white/15 bg-white/10 text-white backdrop-blur-md"
        }`}
      >
        <a href="#top" className="font-display text-lg tracking-[-0.03em]" aria-label="PlanX — home">
          PlanX
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className={`text-sm transition ${
                  light ? "text-white/75 hover:text-white" : "text-slate hover:text-ink"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-1.5 py-1 text-xs tracking-wide transition ${
                  lang === l
                    ? light
                      ? "text-white"
                      : "text-ink"
                    : light
                      ? "text-white/50 hover:text-white"
                      : "text-slate/70 hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={onStart}
            className="hidden rounded-xl bg-pine px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[color-mix(in_srgb,#01796F_88%,#000)] sm:inline-flex"
          >
            {t.nav.cta}
          </button>

          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-border bg-white text-foreground shadow-sm md:hidden"
          >
            <ul className="px-4 py-2">
              {items.map((i) => (
                <li key={i.href}>
                  <a href={i.href} onClick={() => setOpen(false)} className="block py-3 text-sm">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <div className="flex gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-xs ${lang === l ? "text-ink" : "text-slate"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  onStart();
                }}
                className="rounded-xl bg-pine px-3 py-2 text-xs font-medium text-white"
              >
                {t.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
