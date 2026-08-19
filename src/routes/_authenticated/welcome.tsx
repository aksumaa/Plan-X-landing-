import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Home, Compass, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/planx/app-i18n";

export const Route = createFileRoute("/_authenticated/welcome")({ component: Welcome });

const copy = {
  uz: {
    q: "Nima qurmoqchisiz?",
    hint: "Bu tanlov ishchi maydonni sizga moslashtiradi. Keyinroq sozlamalarda o'zgartirish mumkin.",
    homeowner: "Uy egasi",
    homeownerD: "O'zim yoki oilam uchun uy loyihalayapman.",
    pro: "Arxitektor / mutaxassis",
    proD: "Buyurtmachilar uchun loyihalar bilan ishlayman.",
    cont: "Davom etish",
  },
  ru: {
    q: "Что вы строите?",
    hint: "Этот выбор настроит рабочее пространство. Изменить можно в настройках.",
    homeowner: "Владелец дома",
    homeownerD: "Проектирую дом для себя или семьи.",
    pro: "Архитектор / специалист",
    proD: "Работаю над проектами для клиентов.",
    cont: "Продолжить",
  },
  en: {
    q: "What are you building?",
    hint: "This tailors your workspace. You can change it later in settings.",
    homeowner: "Homeowner",
    homeownerD: "I am designing a home for myself or my family.",
    pro: "Architect / professional",
    proD: "I work on projects for clients.",
    cont: "Continue",
  },
} as const;

function Welcome() {
  const { lang } = useT();
  const c = copy[lang];
  const navigate = useNavigate();
  const [choice, setChoice] = useState<"homeowner" | "professional" | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!choice) return;
    setBusy(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: auth.user.id, user_type: choice } as never, { onConflict: "id" });
      if (error) throw error;
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your choice");
    } finally {
      setBusy(false);
    }
  };

  const options = [
    { key: "homeowner" as const, icon: Home, label: c.homeowner, desc: c.homeownerD },
    { key: "professional" as const, icon: Compass, label: c.pro, desc: c.proD },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-2xl">
        <h1 className="display text-3xl sm:text-4xl">{c.q}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{c.hint}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {options.map((o) => (
            <button
              key={o.key}
              onClick={() => setChoice(o.key)}
              aria-pressed={choice === o.key}
              className={`flex flex-col items-start gap-3 border p-6 text-left transition-all hover:-translate-y-0.5 ${
                choice === o.key ? "border-pine bg-card" : "border-border bg-card/60 hover:border-pine"
              }`}
            >
              <o.icon className="size-5 text-pine" aria-hidden="true" />
              <span className="text-sm font-medium">{o.label}</span>
              <span className="text-[0.8125rem] text-muted-foreground">{o.desc}</span>
            </button>
          ))}
        </div>

        <button
          onClick={save}
          disabled={!choice || busy}
          className="mt-10 inline-flex items-center gap-2 bg-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-pine disabled:opacity-50"
        >
          {busy && <Loader2 className="size-3.5 animate-spin" />} {c.cont}
        </button>
      </div>
    </main>
  );
}
