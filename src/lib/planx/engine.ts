import type {
  Brief,
  CostEstimate,
  FloorPlan,
  MaterialLine,
  ProjectScore,
  Room,
  RoomType,
} from "./types";

/**
 * Deterministic preliminary planning engine.
 * All numbers produced here are PRELIMINARY AI/parametric estimates, never
 * certified engineering calculations. UI must label them as such.
 */

const rid = () => Math.random().toString(36).slice(2, 9);

type Spec = { name: string; type: RoomType; area: number };

function roomProgram(brief: Brief): Spec[][] {
  const r = brief.req;
  const floors = Math.max(1, Math.min(4, r.floors || 1));
  const footprint = Math.max(40, (r.area || 120) / floors);

  const specs: Spec[] = [];
  specs.push({ name: "Hall", type: "hall", area: footprint * 0.09 });
  if (r.living) specs.push({ name: "Living room", type: "living", area: footprint * 0.24 });
  if (r.kitchen) specs.push({ name: "Kitchen", type: "kitchen", area: footprint * 0.16 });
  for (let i = 0; i < Math.max(0, r.bedrooms); i++)
    specs.push({ name: `Bedroom ${i + 1}`, type: "bedroom", area: footprint * 0.15 });
  for (let i = 0; i < Math.max(0, r.bathrooms); i++)
    specs.push({ name: `Bathroom ${i + 1}`, type: "bathroom", area: footprint * 0.06 });
  if (r.garage) specs.push({ name: "Garage", type: "garage", area: footprint * 0.16 });
  if (r.terrace) specs.push({ name: "Terrace", type: "terrace", area: footprint * 0.1 });
  if (floors > 1) specs.push({ name: "Stairs", type: "stairs", area: footprint * 0.05 });

  // distribute across floors: public spaces down, bedrooms up
  const perFloor: Spec[][] = Array.from({ length: floors }, () => []);
  const priorityGround: RoomType[] = ["hall", "living", "kitchen", "garage", "terrace"];
  let cursor = 0;
  for (const s of specs) {
    if (floors === 1) {
      perFloor[0]!.push(s);
      continue;
    }
    if (priorityGround.includes(s.type)) perFloor[0]!.push(s);
    else if (s.type === "stairs") perFloor.forEach((f) => f.push({ ...s }));
    else {
      const target = 1 + (cursor % (floors - 1));
      perFloor[target]!.push(s);
      cursor++;
    }
  }
  return perFloor;
}

/** Simple row-based packer producing an architectural-looking rectangular plan. */
export function generatePlan(brief: Brief): FloorPlan {
  const floors = Math.max(1, Math.min(4, brief.req.floors || 1));
  const footprint = Math.max(40, (brief.req.area || 120) / floors);
  const ratio =
    brief.land.width && brief.land.length
      ? Math.max(0.6, Math.min(1.8, brief.land.width / brief.land.length))
      : 1.3;
  const width = Math.round(Math.sqrt(footprint * ratio) * 10) / 10;
  const length = Math.round((footprint / width) * 10) / 10;

  const rooms: Room[] = [];
  const program = roomProgram(brief);

  program.forEach((specs, floor) => {
    const total = specs.reduce((s, x) => s + x.area, 0) || 1;
    const scale = footprint / total;
    let y = 0;
    let row: Spec[] = [];
    let rowArea = 0;
    const targetRow = footprint / Math.max(2, Math.round(Math.sqrt(specs.length)));

    const flushRow = () => {
      if (!row.length) return;
      const h = Math.max(2.4, (rowArea * scale) / width);
      let x = 0;
      row.forEach((s, i) => {
        const w = i === row.length - 1 ? width - x : ((s.area * scale) / h) * 1;
        rooms.push({
          id: rid(),
          name: s.name,
          type: s.type,
          x: round(x),
          y: round(y),
          w: round(Math.max(1.4, Math.min(w, width - x))),
          h: round(h),
          floor,
        });
        x += w;
      });
      y += h;
      row = [];
      rowArea = 0;
    };

    specs.forEach((s) => {
      row.push(s);
      rowArea += s.area;
      if (rowArea >= targetRow) flushRow();
    });
    flushRow();
  });

  const maxY = rooms.reduce((m, r) => Math.max(m, r.y + r.h), 0);
  return { width, length: Math.max(length, round(maxY)), rooms };
}

const round = (n: number) => Math.round(n * 10) / 10;

export function estimateMaterials(areaTotal: number, floors: number): MaterialLine[] {
  const a = Math.max(20, areaTotal || 120);
  const f = Math.max(1, floors || 1);
  const wallArea = a * 1.15 + Math.sqrt(a / f) * 4 * 3 * f;
  return [
    { key: "brick", qty: Math.round(wallArea * 52), unit: "pcs" },
    { key: "cement", qty: Math.round(a * 0.24 * f + a * 0.12), unit: "bags" },
    { key: "concrete", qty: Math.round(a * 0.17 * 10) / 10, unit: "m³" },
    { key: "steel", qty: Math.round(a * 0.017 * 10) / 10, unit: "t" },
    { key: "wood", qty: Math.round(a * 0.056 * 10) / 10, unit: "m³" },
    { key: "glass", qty: Math.round(a * 0.27), unit: "m²" },
    { key: "roof", qty: Math.round((a / f) * 1.25), unit: "m²" },
    { key: "tiles", qty: Math.round(a * 0.75), unit: "m²" },
  ];
}

/** Preliminary regional rate per m² in UZS (indicative only). */
const RATE_UZS = 2_650_000;

export function estimateCost(areaTotal: number, currency = "UZS"): CostEstimate {
  const a = Math.max(20, areaTotal || 120);
  const base = a * RATE_UZS;
  const lines = [
    { key: "materials", amount: Math.round(base * 0.44) },
    { key: "labor", amount: Math.round(base * 0.22) },
    { key: "finishing", amount: Math.round(base * 0.16) },
    { key: "engineering", amount: Math.round(base * 0.08) },
    { key: "transport", amount: Math.round(base * 0.04) },
    { key: "contingency", amount: Math.round(base * 0.06) },
  ];
  return { currency, lines, total: lines.reduce((s, l) => s + l.amount, 0) };
}

export function scoreProject(brief: Brief, plan: FloorPlan, cost: CostEstimate): ProjectScore {
  const planned = plan.rooms
    .filter((r) => r.floor === 0 || true)
    .reduce((s, r) => s + r.w * r.h, 0);
  const target = brief.req.area || planned || 1;
  const space = clamp(100 - Math.abs(1 - planned / target) * 120, 55, 97);
  const glazing = plan.rooms.filter((r) => ["living", "kitchen", "bedroom"].includes(r.type)).length;
  const light = clamp(60 + glazing * 5, 55, 96);
  const budget = brief.budget
    ? clamp(100 - Math.max(0, cost.total / brief.budget - 1) * 90, 35, 97)
    : 75;
  const beds = brief.req.bedrooms || 1;
  const fn = clamp(70 + Math.min(brief.req.bathrooms, beds) * 8 + (brief.req.living ? 6 : 0), 55, 98);
  const overall = Math.round((space + light + budget + fn) / 4);
  return {
    space: Math.round(space),
    light: Math.round(light),
    budget: Math.round(budget),
    function: Math.round(fn),
    overall,
  };
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function fallbackName(brief: Brief): string {
  const style = brief.style ? cap(brief.style) : "Modern";
  const kind = cap(brief.buildingType || "house");
  return `${style} ${kind}`;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function formatMoney(n: number, currency = "UZS", locale = "en-US") {
  return `${Math.round(n).toLocaleString(locale)} ${currency}`;
}
