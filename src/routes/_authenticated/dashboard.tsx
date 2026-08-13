import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/planx-app/AppShell";
import { useT } from "@/lib/planx/app-i18n";
import { useProjects } from "@/lib/planx/data";

export const Route = createFileRoute("/_authenticated/dashboard")({ component: Dashboard });

function Dashboard() {
  const { t } = useT();
  const { data: projects = [], isLoading } = useProjects();
  const totalArea = projects.reduce((s, p) => s + (Number(p.area) || 0), 0);
  const scores = projects
    .map((p) => (p.score as { overall?: number })?.overall ?? 0)
    .filter((n) => n > 0);
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <AppShell title={t.dashboard.title}>
      <div className="mx-auto max-w-6xl">
        <h2 className="display text-3xl sm:text-4xl">{t.dashboard.greeting}</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label={t.dashboard.projects} value={String(projects.length)} />
          <Stat label={t.dashboard.totalArea} value={`${Math.round(totalArea)} m²`} />
          <Stat label={t.dashboard.avgScore} value={avg ? `${avg}/100` : "—"} />
        </div>

        <div className="mt-14 flex items-center gap-3">
          <h3 className="eyebrow">{t.dashboard.recent}</h3>
          <span className="h-px flex-1 bg-border" />
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-muted-foreground">…</p>
        ) : projects.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">{t.dashboard.empty}</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p) => (
              <li key={p.id}>
                <Link
                  to="/projects/$id"
                  params={{ id: p.id }}
                  className="block border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-pine"
                >
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="mt-2 text-[0.75rem] text-muted-foreground">
                    {p.area ?? "—"} m² · {p.floors ?? 1} {t.project.floors} · {p.style ?? "—"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-card p-6">
      <p className="eyebrow">{label}</p>
      <p className="display mt-3 text-3xl">{value}</p>
    </div>
  );
}
