import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">{t.faq.label}</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">{t.faq.headline}</h2>
          </Reveal>

          <div className="md:col-span-8">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 0.04}>
                  <div className="border-t border-border">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-base tracking-[-0.01em] text-foreground md:text-lg">
                        {item.q}
                      </span>
                      <Plus
                        className={`mt-1 size-4 shrink-0 text-accent transition-transform duration-500 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-7 text-[0.9375rem] leading-relaxed text-muted-foreground">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
            <div className="hairline" />
          </div>
        </div>
      </div>
    </section>
  );
}
