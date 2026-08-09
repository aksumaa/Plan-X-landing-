import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    { href: "#features", label: t.nav.features },
    { href: "#how", label: t.nav.how },
    { href: "#ai", label: t.nav.ai },
    { href: "#calculator", label: t.nav.calculator },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid ? "border-border/70 bg-background/75 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10 md:h-20 md:px-16">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="PlanX — home">
          <img
            src={mark}
            alt=""
            aria-hidden="true"
            width={96}
            height={104}
            className="h-7 w-auto transition-transform duration-500 group-hover:-translate-y-0.5 md:h-8"
          />
          <span className="display text-lg tracking-[-0.02em] text-foreground">PlanX</span>
        </a>


        <ul className="hidden items-center gap-9 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className="text-[0.8125rem] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden items-center gap-1 sm:flex" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-1.5 py-1 text-[0.6875rem] tracking-[0.16em] transition-colors ${
                  lang === l ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={onStart}
            className="hidden border border-foreground/25 px-4 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-foreground hover:text-background sm:block"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {items.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm text-foreground"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
              <div className="flex gap-3">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[0.6875rem] tracking-[0.16em] ${
                      lang === l ? "text-foreground" : "text-muted-foreground/60"
                    }`}
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
                className="border border-foreground/25 px-4 py-2 text-[0.75rem] uppercase tracking-[0.16em]"
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
