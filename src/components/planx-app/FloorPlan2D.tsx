import { useState } from "react";
import type { FloorPlan, Room } from "@/lib/planx/types";

const SCALE = 26; // px per meter

/** Interactive architectural 2D plan: drag to move, corner to resize. */
export function FloorPlan2D({
  plan,
  floor,
  onChange,
}: {
  plan: FloorPlan;
  floor: number;
  onChange?: (rooms: Room[]) => void;
}) {
  const [drag, setDrag] = useState<{ id: string; mode: "move" | "resize"; x: number; y: number } | null>(null);
  const rooms = plan.rooms.filter((r) => r.floor === floor);
  const w = plan.width * SCALE;
  const h = plan.length * SCALE;

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag || !onChange) return;
    const dx = (e.clientX - drag.x) / SCALE;
    const dy = (e.clientY - drag.y) / SCALE;
    onChange(
      plan.rooms.map((r) => {
        if (r.id !== drag.id) return r;
        if (drag.mode === "move")
          return { ...r, x: round(Math.max(0, Math.min(plan.width - r.w, r.x + dx))), y: round(Math.max(0, r.y + dy)) };
        return { ...r, w: round(Math.max(1.2, r.w + dx)), h: round(Math.max(1.2, r.h + dy)) };
      }),
    );
    setDrag({ ...drag, x: e.clientX, y: e.clientY });
  };

  return (
    <div className="overflow-auto border border-border bg-background p-4">
      <svg
        viewBox={`-12 -12 ${w + 24} ${h + 24}`}
        width={w + 24}
        height={h + 24}
        role="img"
        aria-label="Interactive 2D floor plan"
        onPointerMove={onPointerMove}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
        className="max-w-full touch-none"
      >
        <defs>
          <pattern id="grid" width={SCALE} height={SCALE} patternUnits="userSpaceOnUse">
            <path d={`M ${SCALE} 0 L 0 0 0 ${SCALE}`} fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x={0} y={0} width={w} height={h} fill="url(#grid)" />
        <rect x={0} y={0} width={w} height={h} fill="none" stroke="var(--color-foreground)" strokeWidth="2.5" />

        {rooms.map((r) => (
          <g key={r.id}>
            <rect
              x={r.x * SCALE}
              y={r.y * SCALE}
              width={r.w * SCALE}
              height={r.h * SCALE}
              fill="var(--color-card)"
              fillOpacity="0.75"
              stroke="#3E5C76"
              strokeWidth="1.5"
              className={onChange ? "cursor-move" : ""}
              onPointerDown={(e) => setDrag({ id: r.id, mode: "move", x: e.clientX, y: e.clientY })}
            />
            <text
              x={r.x * SCALE + 8}
              y={r.y * SCALE + 18}
              fontSize="11"
              fill="var(--color-foreground)"
              className="pointer-events-none select-none"
            >
              {r.name}
            </text>
            <text
              x={r.x * SCALE + 8}
              y={r.y * SCALE + 32}
              fontSize="9.5"
              fill="var(--color-muted-foreground)"
              className="pointer-events-none select-none"
            >
              {r.w.toFixed(1)} × {r.h.toFixed(1)} m
            </text>
            {onChange && (
              <rect
                x={(r.x + r.w) * SCALE - 7}
                y={(r.y + r.h) * SCALE - 7}
                width={7}
                height={7}
                fill="#34443D"
                className="cursor-se-resize"
                onPointerDown={(e) => setDrag({ id: r.id, mode: "resize", x: e.clientX, y: e.clientY })}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

const round = (n: number) => Math.round(n * 10) / 10;
