import { centerCloseness } from "@/lib/geometry/barycentric";
import type { StudioHud } from "@/lib/geometry/studio";

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
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">过关</p>
      <p className="mt-3 text-[14px] leading-6 text-foreground">
        三个数 α、β、γ 都接近 0.33 就过关。
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-150"
          style={{ width: `${closeness * 100}%` }}
        />
      </div>
      {hud.holding ? (
        <p className="mt-3 text-[14px] leading-6 text-foreground">停在这儿</p>
      ) : null}
    </section>
  );
}
