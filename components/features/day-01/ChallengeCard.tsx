import { centerCloseness } from "@/lib/geometry/barycentric";
import type { StudioHud } from "@/lib/geometry/studio";
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
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">
        过关：把采样点放到正中，让 α、β、γ 都接近 0.33
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-150"
          style={{ width: `${closeness * 100}%` }}
        />
      </div>
      <p
        className={cn(
          "mt-3 text-[14px] leading-6",
          hud.nearCenter && !hud.pinned
            ? "text-foreground"
            : "text-muted-foreground",
        )}
      >
        {hud.nearCenter && !hud.pinned
          ? "停在这儿"
          : "三个数都要靠近 1/3"}
      </p>
    </section>
  );
}
