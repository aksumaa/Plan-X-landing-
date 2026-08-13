import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/planx-app/AppShell";
import { useT } from "@/lib/planx/app-i18n";

export const Route = createFileRoute("/_authenticated/review")({ component: Review });

function Review() {
  const { t } = useT();
  const roles = [t.review.architect, t.review.engineer, t.review.interior, t.review.contractor];

  return (
    <AppShell title={t.review.title}>
      <div className="mx-auto max-w-3xl">
        <h2 className="display text-3xl">{t.review.title}</h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.review.text}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {roles.map((r) => (
            <li key={r} className="border border-border bg-card p-6">
              <p className="text-sm font-medium">{r}</p>
              <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.18em] text-sand">{t.reports.soon}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[0.75rem] text-muted-foreground">{t.project.disclaimer}</p>
      </div>
    </AppShell>
  );
}
