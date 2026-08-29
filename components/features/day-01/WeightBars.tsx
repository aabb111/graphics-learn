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
    <div className="space-y-3">
      {ROWS.map((row) => {
        const value = hud[row.key];
        const left = Math.max(0, Math.min(1, value));
        return (
          <div key={row.key} className="grid grid-cols-[1.4rem_1fr_3rem] items-center gap-3">
            <span className="text-[13px] text-muted-foreground">{row.label}</span>
            <div className="relative h-[3px] bg-border">
              <span
                className={cn("absolute inset-y-0 left-0", value < 0 && "opacity-40")}
                style={{ width: `${left * 100}%`, background: row.color }}
              />
            </div>
            <span
              className={cn(
                "text-right font-mono text-[12px] tabular-nums",
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
