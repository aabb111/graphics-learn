import { centerCloseness } from "@/lib/geometry/barycentric";
import type { StudioHud } from "@/lib/geometry/studio";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type ChallengeCardProps = {
  hud: StudioHud;
};

export function ChallengeCard({ hud }: ChallengeCardProps) {
  const closeness = centerCloseness({
    alpha: hud.alpha,
    beta: hud.beta,
    gamma: hud.gamma,
    degenerate: hud.degenerate,
  });

  return (
    <section className="border-t border-border/80 pt-5">
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">极小挑战</p>
      <p className="mt-2 text-[15px] leading-7">
        把探针放到三角形中心：让 α、β、γ 都靠近 1/3。
      </p>
      <div className="mt-4 h-[2px] bg-border">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: hud.solved ? "100%" : `${closeness * 100}%` }}
        />
      </div>
      <p className={cn("mt-3 text-[13px]", hud.solved ? "text-primary" : "text-muted-foreground")}>
        {hud.solved
          ? "到了。三个角在这里各出三分之一。"
          : `接近程度 ${formatPercent(closeness)}`}
      </p>
    </section>
  );
}
