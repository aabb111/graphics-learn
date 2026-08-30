import type { ColorHud } from "@/lib/day-02/studio";
import { cn } from "@/lib/utils";

type MatchMeterProps = {
  hud: ColorHud;
};

export function MatchMeter({ hud }: MatchMeterProps) {
  return (
    <section>
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">过关</p>
      <p className="mt-3 text-[14px] leading-6">
        三个顶点色对了，整面渐变就会对上；对上并稳住，才算过关。
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-150"
          style={{ width: `${hud.closeness * 100}%` }}
        />
      </div>
      <p
        className={cn(
          "mt-3 text-[14px] leading-6",
          hud.holding ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {hud.holding ? "稳住" : "对上并稳住，才算过关。"}
      </p>
    </section>
  );
}
