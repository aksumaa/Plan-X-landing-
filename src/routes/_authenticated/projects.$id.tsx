import { createFileRoute, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { AppShell } from "@/components/planx-app/AppShell";
import { FloorPlan2D } from "@/components/planx-app/FloorPlan2D";
import { Studio3D } from "@/components/planx-app/Studio3D";
import { useT } from "@/lib/planx/app-i18n";
import { useProject, useUpdateProject } from "@/lib/planx/data";
import { askDesigner } from "@/lib/planx/ai.functions";
import { estimateCost, estimateMaterials, formatMoney, generatePlan, scoreProject } from "@/lib/planx/engine";
import type { Brief, CostEstimate, FloorPlan, MaterialLine, ProjectScore, Room } from "@/lib/planx/types";

export const Route = createFileRoute("/_authenticated/projects/$id")({ component: Workspace });

type Tab = "overview" | "designer" | "plan" | "studio" | "materials" | "cost" | "reports";

function Workspace() {
  const { id } = useParams({ from: "/_authenticated/projects/$id" });
  const { t } = useT();
  const { data: project, isLoading } = useProject(id);
  const update = useUpdateProject();
  const [tab, setTab] = useState<Tab>("overview");

  if (isLoading) return <AppShell title="…"><p className="text-sm text-muted-foreground">…</p></AppShell>;
  if (!project) return <AppShell title="—"><p className="text-sm text-muted-foreground">Project not found.</p></AppShell>;

  const plan = project.plan as FloorPlan;
  const materials = ((project.materials as { lines?: MaterialLine[] })?.lines ?? []) as MaterialLine[];
  const cost = project.cost as CostEstimate;
  const score = project.score as ProjectScore;
  const brief = project.brief as Brief;

  const tabs: Tab[] = ["overview", "designer", "plan", "studio", "materials", "cost", "reports"];
  const label: Record<Tab, string> = {
    overview: t.project.overview,
    designer: t.designer.title,
    plan: t.nav.plan,
    studio: t.nav.studio,
    materials: t.nav.materials,
    cost: t.nav.cost,
    reports: t.nav.reports,
  };

  return (
    <AppShell title={project.name}>
      <div className="mx-auto max-w-6xl">
        <h2 className="display text-3xl">{project.name}</h2>
        <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.18em] text-sand">{t.project.preliminary}</p>

        <div className="mt-8 flex flex-wrap gap-1 border-b border-border" role="tablist">
          {tabs.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`px-4 py-3 text-[0.75rem] uppercase tracking-[0.14em] transition-colors ${
                tab === k ? "border-b-2 border-pine text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label[k]}
            </button>
          ))}
        </div>

        <div className="py-10">
          {tab === "overview" && <Overview project={project} score={score} cost={cost} />}
          {tab === "designer" && <Designer projectId={id} brief={brief} />}
          {tab === "plan" && (
            <PlanTab
              plan={plan}
              onSave={(rooms: Room[]) =>
                update.mutate(
                  { id, patch: { plan: { ...plan, rooms } } },
                  { onSuccess: () => toast.success(t.project.saved) },
                )
              }
            />
          )}
          {tab === "studio" && <StudioTab plan={plan} />}
          {tab === "materials" && <MaterialsTab lines={materials} />}
          {tab === "cost" && <CostTab cost={cost} />}
          {tab === "reports" && <ReportsTab />}
        </div>

        <p className="border-t border-border pt-6 text-[0.75rem] text-muted-foreground">{t.project.disclaimer}</p>
      </div>
    </AppShell>
  );
}

function Overview({
  project,
  score,
  cost,
}: {
  project: { area: number | null; floors: number | null; bedrooms: number | null; bathrooms: number | null; style: string | null; budget: number | null };
  score: ProjectScore;
  cost: CostEstimate;
}) {
  const { t } = useT();
  const rows = [
    [t.project.area, `${project.area ?? "—"} m²`],
    [t.project.floors, String(project.floors ?? "—")],
    [t.project.bedrooms, String(project.bedrooms ?? "—")],
    [t.project.bathrooms, String(project.bathrooms ?? "—")],
    [t.project.style, project.style ?? "—"],
    [t.cost.total, cost?.total ? formatMoney(cost.total, cost.currency) : "—"],
  ];
  const bars = [
    [t.project.space, score?.space ?? 0],
    [t.project.light, score?.light ?? 0],
    [t.project.budgetEff, score?.budget ?? 0],
    [t.project.functionality, score?.function ?? 0],
  ] as const;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <dl className="divide-y divide-border border-y border-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-3 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div>
        <h3 className="eyebrow">{t.project.analysis}</h3>
        <p className="display mt-3 text-4xl">{score?.overall ?? "—"}<span className="text-lg text-muted-foreground">/100</span></p>
        <ul className="mt-6 flex flex-col gap-4">
          {bars.map(([k, v]) => (
            <li key={k}>
              <div className="flex justify-between text-[0.75rem]">
                <span className="text-muted-foreground">{k}</span>
                <span>{v}</span>
              </div>
              <div className="mt-1.5 h-1 bg-border">
                <div className="h-1 bg-pine" style={{ width: `${v}%` }} />
              </div>
            </li>
          ))}
        </ul>

        <h3 className="eyebrow mt-10">{t.project.warnings}</h3>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          <li>✓ {t.warnings.ok1}</li>
          <li>✓ {t.warnings.ok2}</li>
          <li className="text-foreground">! {t.warnings.w1}</li>
          <li className="text-foreground">! {t.warnings.w2}</li>
          <li className="text-foreground">! {t.warnings.w3}</li>
        </ul>
      </div>
    </div>
  );
}

function Designer({ projectId, brief }: { projectId: string; brief: Brief }) {
  const { t } = useT();
  const ask = useServerFn(askDesigner);
  const update = useUpdateProject();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [proposal, setProposal] = useState<Record<string, number | string | boolean> | null>(null);

  const send = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput("");
    setLog((l) => [...l, { role: "user", text: message }]);
    setBusy(true);
    try {
      const res = await ask({ data: { projectId, message } });
      setLog((l) => [...l, { role: "ai", text: res.reply }]);
      setProposal(res.changes ? (res.changes as Record<string, number | string | boolean>) : null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "AI request failed");
    } finally {
      setBusy(false);
    }
  };

  const apply = () => {
    if (!proposal) return;
    const next: Brief = {
      ...brief,
      style: (proposal["style"] as string) ?? brief.style,
      req: {
        ...brief.req,
        area: Number(proposal["area"] ?? brief.req.area),
        floors: Number(proposal["floors"] ?? brief.req.floors),
        bedrooms: Number(proposal["bedrooms"] ?? brief.req.bedrooms),
        bathrooms: Number(proposal["bathrooms"] ?? brief.req.bathrooms),
        garage: Boolean(proposal["garage"] ?? brief.req.garage),
        pool: Boolean(proposal["pool"] ?? brief.req.pool),
        terrace: Boolean(proposal["terrace"] ?? brief.req.terrace),
      },
    };
    const plan = generatePlan(next);
    const cost = estimateCost(next.req.area);
    update.mutate(
      {
        id: projectId,
        patch: {
          brief: next,
          area: next.req.area,
          floors: next.req.floors,
          bedrooms: next.req.bedrooms,
          bathrooms: next.req.bathrooms,
          style: next.style,
          plan,
          materials: { lines: estimateMaterials(next.req.area, next.req.floors) },
          cost,
          score: scoreProject(next, plan, cost),
        },
      },
      {
        onSuccess: () => {
          setProposal(null);
          toast.success(t.designer.applied);
        },
      },
    );
  };

  return (
    <div className="max-w-2xl">
      <p className="text-[0.75rem] text-muted-foreground">{t.designer.contextNote}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {log.map((m, i) => (
          <li
            key={i}
            className={`max-w-[85%] border p-4 text-sm ${
              m.role === "user" ? "ml-auto border-border bg-secondary" : "border-border bg-card"
            }`}
          >
            {m.text}
          </li>
        ))}
        {busy && (
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" /> {t.designer.thinking}
          </li>
        )}
      </ul>

      {proposal && (
        <button
          onClick={apply}
          className="mt-6 bg-pine px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground"
        >
          {t.designer.apply}
        </button>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
        className="mt-8 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.designer.placeholder}
          aria-label={t.designer.title}
          className="flex-1 border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-pine"
        />
        <button
          type="submit"
          disabled={busy}
          aria-label={t.designer.send}
          className="bg-primary px-4 text-primary-foreground transition-colors hover:bg-pine disabled:opacity-60"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}

function PlanTab({ plan, onSave }: { plan: FloorPlan; onSave: (rooms: Room[]) => void }) {
  const { t } = useT();
  const [rooms, setRooms] = useState<Room[]>(plan.rooms ?? []);
  const floors = Array.from(new Set((plan.rooms ?? []).map((r) => r.floor))).sort();
  const [floor, setFloor] = useState(floors[0] ?? 0);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {floors.map((f) => (
          <button
            key={f}
            onClick={() => setFloor(f)}
            aria-pressed={floor === f}
            className={`border px-4 py-2 text-[0.75rem] uppercase tracking-[0.14em] ${
              floor === f ? "border-pine bg-pine text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {t.plan.floor} {f + 1}
          </button>
        ))}
        <button
          onClick={() => onSave(rooms)}
          className="ml-auto bg-primary px-5 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-pine"
        >
          {t.plan.save}
        </button>
      </div>
      <FloorPlan2D plan={{ ...plan, rooms }} floor={floor} onChange={setRooms} />
      <p className="mt-4 text-[0.75rem] text-muted-foreground">{t.plan.hint}</p>
    </div>
  );
}

function StudioTab({ plan }: { plan: FloorPlan }) {
  const { t } = useT();
  const [night, setNight] = useState(false);
  const [interior, setInterior] = useState(false);
  const [roof, setRoof] = useState(true);

  const toggles = [
    { label: t.studio.interior, on: interior, set: setInterior },
    { label: t.studio.night, on: night, set: setNight },
    { label: t.studio.roof, on: roof, set: setRoof },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {toggles.map((tg) => (
          <button
            key={tg.label}
            onClick={() => tg.set(!tg.on)}
            aria-pressed={tg.on}
            className={`border px-4 py-2 text-[0.75rem] uppercase tracking-[0.14em] ${
              tg.on ? "border-pine bg-pine text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {tg.label}
          </button>
        ))}
      </div>
      <Studio3D plan={plan} night={night} interior={interior} showRoof={roof} />
    </div>
  );
}

function MaterialsTab({ lines }: { lines: MaterialLine[] }) {
  const { t } = useT();
  const names = t.materials as unknown as Record<string, string>;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {lines.map((l) => (
        <li key={l.key} className="border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-pine">
          <p className="display text-2xl">
            {l.qty.toLocaleString("en-US")} <span className="text-xs text-sand">{l.unit}</span>
          </p>
          <p className="mt-2 text-[0.75rem] text-muted-foreground">{names[l.key] ?? l.key}</p>
        </li>
      ))}
    </ul>
  );
}

function CostTab({ cost }: { cost: CostEstimate }) {
  const { t } = useT();
  const names = t.cost as unknown as Record<string, string>;
  return (
    <div className="max-w-xl">
      <dl className="divide-y divide-border border-y border-border">
        {(cost?.lines ?? []).map((l) => (
          <div key={l.key} className="flex justify-between py-3 text-sm">
            <dt className="text-muted-foreground">{names[l.key] ?? l.key}</dt>
            <dd>{formatMoney(l.amount, cost.currency)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex justify-between text-sm">
        <span className="eyebrow">{t.cost.total}</span>
        <span className="display text-2xl">{cost?.total ? formatMoney(cost.total, cost.currency) : "—"}</span>
      </p>
    </div>
  );
}

function ReportsTab() {
  const { t } = useT();
  const items = [t.reports.pdf, t.reports.plan2d, t.reports.images3d, t.reports.materials, t.reports.cost, t.reports.pro];
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex items-center justify-between border border-border bg-card p-5 text-sm">
          {i}
          <button
            onClick={() => window.print()}
            className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            {t.reports.export}
          </button>
        </li>
      ))}
    </ul>
  );
}
