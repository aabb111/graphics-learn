import { VERTEX_HEX } from "@/lib/geometry/colors";
import type { StudioHud } from "@/lib/geometry/studio";
import { formatWeight } from "@/lib/format";
import { cn } from "@/lib/utils";

const ROWS = [
  { key: "alpha", label: "α", color: VERTEX_HEX.a },
  { key: "beta", label: "β", color: VERTEX_HEX.b },
  { key: "gamma", label: "γ", color: VERTEX_HEX.c },
] as const;

type WeightBarsProps = {
  hud: StudioHud;
};

export function WeightBars({ hud }: WeightBarsProps) {
  return (
    <div className="flex flex-col gap-3">
      {ROWS.map((row) => {
        const value = hud[row.key];
        const left = Math.max(0, Math.min(1, value));
        return (
          <div key={row.key} className="grid grid-cols-[1.4rem_1fr_3.2rem] items-center gap-3">
            <span className="text-[14px] leading-6" style={{ color: row.color }}>
              {row.label}
            </span>
            <div className="relative h-2 overflow-hidden rounded-full bg-border">
              <span
                className={cn("absolute inset-y-0 left-0 rounded-full", value < 0 && "opacity-40")}
                style={{ width: `${left * 100}%`, background: row.color }}
              />
            </div>
            <span
              className={cn(
                "text-right font-mono text-[14px] leading-6 tabular-nums",
                value < 0 ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {formatWeight(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
