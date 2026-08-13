export type RoomType =
  | "living"
  | "kitchen"
  | "bedroom"
  | "bathroom"
  | "garage"
  | "hall"
  | "terrace"
  | "stairs"
  | "pool"
  | "other";

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  /** meters */
  x: number;
  y: number;
  w: number;
  h: number;
  floor: number;
};

export type FloorPlan = {
  width: number;
  length: number;
  rooms: Room[];
};

export type Brief = {
  who: string;
  buildingType: string;
  land: { area?: number; width?: number; length?: number; location?: string };
  req: {
    area: number;
    floors: number;
    bedrooms: number;
    bathrooms: number;
    kitchen: boolean;
    living: boolean;
    garage: boolean;
    pool: boolean;
    terrace: boolean;
    other?: string;
  };
  style: string;
  budget?: number;
  idea?: string;
  attachments?: { name: string; type: string }[];
};

export type MaterialLine = { key: string; qty: number; unit: string };

export type CostLine = { key: string; amount: number };

export type CostEstimate = {
  currency: string;
  lines: CostLine[];
  total: number;
};

export type ProjectScore = {
  space: number;
  light: number;
  budget: number;
  function: number;
  overall: number;
};

export type ProjectRow = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  brief: Brief | Record<string, unknown>;
  area: number | null;
  floors: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  style: string | null;
  budget: number | null;
  currency: string;
  plan: FloorPlan | Record<string, unknown>;
  model: Record<string, unknown>;
  materials: { lines?: MaterialLine[] } | Record<string, unknown>;
  cost: CostEstimate | Record<string, unknown>;
  score: ProjectScore | Record<string, unknown>;
  timeline: Record<string, unknown>;
  status: string;
  visibility: string;
  share_slug: string | null;
  created_at: string;
  updated_at: string;
};
