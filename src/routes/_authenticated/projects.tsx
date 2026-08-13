import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";
import { AppShell } from "@/components/planx-app/AppShell";
import { useT } from "@/lib/planx/app-i18n";
import { useDeleteProject, useDuplicateProject, useProjects, useUpdateProject } from "@/lib/planx/data";

export const Route = createFileRoute("/_authenticated/projects")({ component: Projects });

function Projects() {
  const { t } = useT();
  const { data: projects = [] } = useProjects();
  const del = useDeleteProject();
  const dup = useDuplicateProject();
  const update = useUpdateProject();

  return (
    <AppShell title={t.nav.projects}>
      <div className="mx-auto max-w-6xl">
        <h2 className="display text-3xl">{t.nav.projects}</h2>
        {projects.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">{t.dashboard.empty}</p>
        ) : (
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {projects.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 py-4">
                <Link to="/projects/$id" params={{ id: p.id }} className="text-sm font-medium hover:text-pine">
                  {p.name}
                </Link>
                <span className="text-[0.75rem] text-muted-foreground">
                  {p.area ?? "—"} m² · {p.floors ?? 1} {t.project.floors}
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => {
                      const name = window.prompt(t.project.rename, p.name);
                      if (name) update.mutate({ id: p.id, patch: { name } });
                    }}
                    className="px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                  >
                    {t.project.rename}
                  </button>
                  <button
                    onClick={() => dup.mutate(p, { onSuccess: () => toast.success(t.project.saved) })}
                    aria-label={t.project.duplicate}
                    className="p-2 text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="size-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`${t.project.delete}: ${p.name}?`)) del.mutate(p.id);
                    }}
                    aria-label={t.project.delete}
                    className="p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
