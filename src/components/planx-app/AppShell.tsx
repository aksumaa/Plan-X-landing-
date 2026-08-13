import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  LayoutGrid,
  FolderOpen,
  MessageSquare,
  Ruler,
  Boxes,
  Wallet,
  FileText,
  Settings,
  BadgeCheck,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { APP_LANGS, useT, type AppLang } from "@/lib/planx/app-i18n";
import { useAppTheme } from "@/lib/planx/theme";
import mark from "@/assets/planx-mark.png";

export function AppShell({
  children,
  title,
  actions,
}: {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}) {
  const { t, lang, setLang } = useT();
  const { theme, setTheme } = useAppTheme();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/dashboard", label: t.nav.dashboard, icon: LayoutGrid },
    { to: "/projects", label: t.nav.projects, icon: FolderOpen },
    { to: "/review", label: t.nav.review, icon: BadgeCheck },
    { to: "/settings", label: t.nav.settings, icon: Settings },
  ] as const;

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border bg-card/60 px-4 py-6 lg:flex">
        <Link to="/dashboard" className="mb-8 flex items-center gap-2.5 px-2">
          <img src={mark} alt="" aria-hidden="true" width={96} height={104} className="h-7 w-auto" />
          <span className="display text-lg tracking-[-0.02em]">PlanX</span>
        </Link>

        <Link
          to="/onboarding"
          className="mb-6 inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-pine hover:text-primary-foreground"
        >
          <Plus className="size-3.5" /> {t.dashboard.newProject}
        </Link>

        <nav className="flex flex-col gap-1" aria-label={t.nav.dashboard}>
          {nav.map((i) => {
            const active = pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <i.icon className="size-4" aria-hidden="true" />
                {i.label}
                {active && <span className="ml-auto h-4 w-px bg-pine" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-1" role="group" aria-label={t.settings.language}>
            {APP_LANGS.map((l: AppLang) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2 py-1 text-[0.6875rem] uppercase tracking-[0.16em] transition-colors ${
                  lang === l ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t.settings.theme}
              className="ml-auto p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 px-1 text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> {t.nav.backToSite}
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-1 text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="size-3.5" /> {t.nav.signOut}
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-5 backdrop-blur-xl lg:pl-[16.5rem]">
        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <h1 className="truncate text-sm font-medium tracking-tight">{title}</h1>
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-card px-5 py-4 lg:hidden">
          <nav className="flex flex-col">
            {nav.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 text-sm"
              >
                <i.icon className="size-4" aria-hidden="true" /> {i.label}
              </Link>
            ))}
            <Link to="/onboarding" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm">
              <Plus className="size-4" aria-hidden="true" /> {t.dashboard.newProject}
            </Link>
            <button onClick={signOut} className="flex items-center gap-3 py-3 text-left text-sm">
              <LogOut className="size-4" aria-hidden="true" /> {t.nav.signOut}
            </button>
          </nav>
        </div>
      )}

      <main className="px-5 py-8 sm:px-8 lg:pl-[17rem] lg:pr-8">{children}</main>
    </div>
  );
}

export const workspaceTabs = [
  { key: "overview", icon: LayoutGrid },
  { key: "designer", icon: MessageSquare },
  { key: "plan", icon: Ruler },
  { key: "studio", icon: Boxes },
  { key: "materials", icon: Boxes },
  { key: "cost", icon: Wallet },
  { key: "reports", icon: FileText },
] as const;
