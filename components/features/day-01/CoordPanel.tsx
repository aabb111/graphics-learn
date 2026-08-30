import { ChallengeCard } from "@/components/features/day-01/ChallengeCard";
import { WeightBars } from "@/components/features/day-01/WeightBars";
import { WinFeedback } from "@/components/features/day-01/WinFeedback";
import { Button } from "@/components/ui/button";
import type { StudioHud } from "@/lib/geometry/studio";

type CoordPanelProps = {
  hud: StudioHud;
  onReset: () => void;
};

export function CoordPanel({ hud, onReset }: CoordPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 1 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">
          重心坐标把三角形涂满
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        {hud.solved ? null : (
          <p className="text-[14px] leading-6 text-muted-foreground">
            α、β、γ 是这一点到三个顶点的权重。正中时三个数一样，都是 1/3。
          </p>
        )}
        <WeightBars hud={hud} />
      </div>
      {hud.solved ? (
        <WinFeedback onReset={onReset} />
      ) : (
        <div className="flex flex-col gap-3">
          <ChallengeCard hud={hud} />
          <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
            重置三角形
          </Button>
        </div>
      )}
    </aside>
  );
}
