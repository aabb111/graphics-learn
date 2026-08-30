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
    <section>
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">极小挑战</p>
      <p className="mt-3 text-[14px] leading-6">
        把探针放到淡圈上，或点「放到重心」。那是三个顶点的平均。
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-150"
          style={{ width: hud.solved ? "100%" : `${closeness * 100}%` }}
        />
      </div>
      <p
        className={cn(
          "mt-3 text-[14px] leading-6",
          hud.solved ? "text-success" : "text-muted-foreground",
        )}
      >
        {hud.solved
          ? "到了。三个角在这里各出三分之一。"
          : `接近程度 ${formatPercent(closeness)}`}
      </p>
    </section>
  );
}
