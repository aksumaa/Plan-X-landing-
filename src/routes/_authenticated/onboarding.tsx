import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2, Upload } from "lucide-react";
import { AppShell } from "@/components/planx-app/AppShell";
import { useT } from "@/lib/planx/app-i18n";
import { createProjectFromBrief } from "@/lib/planx/data";
import type { Brief } from "@/lib/planx/types";

import facade from "@/assets/facade.jpg";
import interior from "@/assets/interior.jpg";
import concrete from "@/assets/concrete.jpg";
import night from "@/assets/night.jpg";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: Onboarding,
});

const STYLES = [
  { key: "modern", img: facade, label: "Modern" },
  { key: "minimal", img: interior, label: "Minimal" },
  { key: "brutalist", img: concrete, label: "Concrete" },
  { key: "classic", img: night, label: "Classic" },
];

function Onboarding() {
  const { t } = useT();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [creating, setCreating] = useState(false);
  const [brief, setBrief] = useState<Brief>({
    who: "myself",
    buildingType: "house",
    land: {},
    req: {
      area: 180,
      floors: 2,
      bedrooms: 3,
      bathrooms: 2,
      kitchen: true,
      living: true,
      garage: true,
      pool: false,
      terrace: true,
    },
    style: "modern",
    budget: undefined,
    idea: "",
    attachments: [],
  });

  const total = 7;
  const set = (patch: Partial<Brief>) => setBrief((b) => ({ ...b, ...patch }));
  const setReq = (patch: Partial<Brief["req"]>) => setBrief((b) => ({ ...b, req: { ...b.req, ...patch } }));

  const finish = () => setCreating(true);

  if (creating) return <Generating brief={brief} onDone={(id) => navigate({ to: "/projects/$id", params: { id } })} />;

  const titles = [t.onboarding.s1, t.onboarding.s2, t.onboarding.s3, t.onboarding.s4, t.onboarding.s5, t.onboarding.s6, t.onboarding.s7];

  return (
    <AppShell title={t.onboarding.title}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="eyebrow">
            {t.onboarding.step} {step + 1} {t.onboarding.of} {total}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-3 flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={total}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`h-0.5 flex-1 ${i <= step ? "bg-pine" : "bg-border"}`} />
          ))}
        </div>

        <motion.h2 key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="display mt-8 text-3xl sm:text-4xl">
          {titles[step]}
        </motion.h2>

        <div className="mt-10">
          {step === 0 && (
            <Cards
              options={[
                { key: "myself", label: t.onboarding.who.myself },
                { key: "family", label: t.onboarding.who.family },
                { key: "client", label: t.onboarding.who.client },
                { key: "business", label: t.onboarding.who.business },
              ]}
              value={brief.who}
              onChange={(v) => set({ who: v })}
            />
          )}

          {step === 1 && (
            <Cards
              options={Object.entries(t.onboarding.types).map(([key, label]) => ({ key, label }))}
              value={brief.buildingType}
              onChange={(v) => set({ buildingType: v })}
            />
          )}

          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <NumField label={t.onboarding.landArea} value={brief.land.area} onChange={(v) => set({ land: { ...brief.land, area: v } })} />
              <TextField
                label={t.onboarding.location}
                value={brief.land.location ?? ""}
                onChange={(v) => set({ land: { ...brief.land, location: v } })}
              />
              <NumField label={t.onboarding.landWidth} value={brief.land.width} onChange={(v) => set({ land: { ...brief.land, width: v } })} />
              <NumField label={t.onboarding.landLength} value={brief.land.length} onChange={(v) => set({ land: { ...brief.land, length: v } })} />
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <NumField label={t.onboarding.area} value={brief.req.area} onChange={(v) => setReq({ area: v ?? 120 })} />
                <Stepper label={t.onboarding.floors} value={brief.req.floors} min={1} max={4} onChange={(v) => setReq({ floors: v })} />
                <Stepper label={t.onboarding.bedrooms} value={brief.req.bedrooms} min={1} max={8} onChange={(v) => setReq({ bedrooms: v })} />
                <Stepper label={t.onboarding.bathrooms} value={brief.req.bathrooms} min={1} max={6} onChange={(v) => setReq({ bathrooms: v })} />
              </div>
              <fieldset>
                <legend className="eyebrow mb-3">{t.onboarding.extras}</legend>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["kitchen", t.onboarding.kitchen],
                      ["living", t.onboarding.living],
                      ["garage", t.onboarding.garage],
                      ["pool", t.onboarding.pool],
                      ["terrace", t.onboarding.terrace],
                    ] as const
                  ).map(([key, label]) => {
                    const on = brief.req[key] as boolean;
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setReq({ [key]: !on } as Partial<Brief["req"]>)}
                        className={`border px-4 py-2 text-sm transition-colors ${
                          on ? "border-pine bg-pine text-primary-foreground" : "border-border bg-card hover:bg-secondary"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <TextField
                label={t.onboarding.otherRooms}
                value={brief.req.other ?? ""}
                onChange={(v) => setReq({ other: v })}
              />
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STYLES.map((s) => {
                const on = brief.style === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => set({ style: s.key })}
                    aria-pressed={on}
                    className={`group overflow-hidden border text-left transition-all ${
                      on ? "border-pine" : "border-border hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={s.img}
                        alt={`${s.label} architecture reference`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between bg-card px-3 py-2.5 text-sm">
                      {s.label}
                      {on && <Check className="size-3.5 text-pine" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 5 && (
            <div className="max-w-sm">
              <NumField label={t.onboarding.budget} value={brief.budget} onChange={(v) => set({ budget: v })} />
              <p className="mt-4 text-sm text-muted-foreground">{t.project.disclaimer}</p>
            </div>
          )}

          {step === 6 && (
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="eyebrow">{t.onboarding.s7}</span>
                <textarea
                  value={brief.idea ?? ""}
                  onChange={(e) => set({ idea: e.target.value })}
                  rows={7}
                  placeholder={t.onboarding.ideaPlaceholder}
                  className="border border-border bg-card p-4 text-sm leading-relaxed outline-none transition-colors focus:border-pine"
                />
              </label>
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-border bg-card px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-pine">
                <Upload className="size-4" />
                {t.onboarding.upload}
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    set({
                      attachments: Array.from(e.target.files ?? []).map((f) => ({ name: f.name, type: f.type })),
                    })
                  }
                />
              </label>
              {!!brief.attachments?.length && (
                <ul className="text-[0.75rem] text-muted-foreground">
                  {brief.attachments.map((a) => (
                    <li key={a.name}>• {a.name}</li>
                  ))}
                </ul>
              )}
              <p className="text-[0.75rem] text-muted-foreground">{t.onboarding.uploadNote}</p>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-3 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" /> {t.onboarding.back}
          </button>
          <button
            onClick={() => (step === total - 1 ? finish() : setStep((s) => s + 1))}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-pine"
          >
            {step === total - 1 ? t.onboarding.finish : t.onboarding.next}
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Generating({ brief, onDone }: { brief: Brief; onDone: (id: string) => void }) {
  const { t } = useT();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timer = setInterval(() => setStage((s) => Math.min(s + 1, t.generating.steps.length - 1)), 620);
    createProjectFromBrief(brief)
      .then((id) => {
        setTimeout(() => {
          if (!cancelled) onDone(id);
        }, 900);
      })
      .catch((e: unknown) => {
        toast.error(e instanceof Error ? e.message : "Could not create the project");
      });
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell title={t.generating.title}>
      <div className="mx-auto max-w-xl py-16">
        <h2 className="display text-3xl">{t.generating.title}</h2>
        <ul className="mt-10 flex flex-col gap-4">
          {t.generating.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 text-sm">
              <span className="flex size-6 items-center justify-center border border-border bg-card">
                {i < stage ? (
                  <Check className="size-3.5 text-pine" />
                ) : i === stage ? (
                  <Loader2 className="size-3.5 animate-spin text-pine" />
                ) : (
                  <span className="size-1 bg-border" />
                )}
              </span>
              <span className={i <= stage ? "text-foreground" : "text-muted-foreground/60"}>{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[0.75rem] text-muted-foreground">{t.project.disclaimer}</p>
      </div>
    </AppShell>
  );
}

function Cards({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((o) => {
        const on = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            aria-pressed={on}
            className={`flex items-center justify-between border px-5 py-5 text-left text-sm transition-all ${
              on ? "border-pine bg-card" : "border-border bg-card hover:-translate-y-0.5 hover:border-charcoal/40"
            }`}
          >
            {o.label}
            {on && <Check className="size-4 text-pine" />}
          </button>
        );
      })}
    </div>
  );
}

function NumField({ label, value, onChange }: { label: string; value?: number | undefined; onChange: (v?: number | undefined) => void }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
        className="border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-pine"
      />
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-pine"
      />
    </label>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <div className="flex items-center border border-border bg-card">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`${label} −`}
          className="px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          −
        </button>
        <span className="flex-1 text-center text-sm">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`${label} +`}
          className="px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          +
        </button>
      </div>
    </div>
  );
}
