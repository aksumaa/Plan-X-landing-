import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/planx-app/AppShell";
import { APP_LANGS, useT, type AppLang } from "@/lib/planx/app-i18n";
import { useAppTheme } from "@/lib/planx/theme";
import { useProfile } from "@/lib/planx/data";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/settings")({ component: Settings });

function Settings() {
  const { t, lang, setLang } = useT();
  const { theme, setTheme } = useAppTheme();
  const { data: profile } = useProfile();
  const [name, setName] = useState<string>((profile?.["full_name"] as string) ?? "");

  const save = async () => {
    const id = profile?.["id"] as string | undefined;
    if (!id) return;
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name, language: lang, theme } as never)
      .eq("id", id);
    if (error) toast.error(error.message);
    else toast.success(t.project.saved);
  };

  return (
    <AppShell title={t.settings.title}>
      <div className="mx-auto max-w-lg">
        <h2 className="display text-3xl">{t.settings.title}</h2>

        <label className="mt-10 flex flex-col gap-2">
          <span className="eyebrow">{t.settings.name}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-pine"
          />
        </label>

        <div className="mt-6 flex flex-col gap-2">
          <span className="eyebrow">{t.settings.email}</span>
          <p className="text-sm text-muted-foreground">{(profile?.["email"] as string) ?? "—"}</p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <span className="eyebrow">{t.settings.language}</span>
          <div className="flex gap-2">
            {APP_LANGS.map((l: AppLang) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`border px-4 py-2 text-sm uppercase ${
                  lang === l ? "border-pine bg-pine text-primary-foreground" : "border-border bg-card"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <span className="eyebrow">{t.settings.theme}</span>
          <div className="flex gap-2">
            {(["light", "dark"] as const).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                aria-pressed={theme === th}
                className={`border px-4 py-2 text-sm ${
                  theme === th ? "border-pine bg-pine text-primary-foreground" : "border-border bg-card"
                }`}
              >
                {th === "light" ? t.settings.light : t.settings.dark}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={save}
          className="mt-10 bg-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-pine"
        >
          {t.settings.save}
        </button>
      </div>
    </AppShell>
  );
}
