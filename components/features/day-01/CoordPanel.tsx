import { ChallengeCard } from "@/components/features/day-01/ChallengeCard";
import { LessonStrip } from "@/components/features/day-01/LessonStrip";
import { MixSwatch } from "@/components/features/day-01/MixSwatch";
import { WeightBars } from "@/components/features/day-01/WeightBars";
import { Button } from "@/components/ui/button";
import type { StudioHud } from "@/lib/geometry/studio";

type CoordPanelProps = {
  hud: StudioHud;
  onReset: () => void;
  onTogglePin: () => void;
  onGoCenter: () => void;
};

export function CoordPanel({
  hud,
  onReset,
  onTogglePin,
  onGoCenter,
}: CoordPanelProps) {
  return (
    <aside className="flex flex-col gap-6 md:w-[300px] md:shrink-0">
      <div>
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 1 天</p>
        <h1 className="mt-2 text-[26px] font-normal tracking-tight">
          重心坐标把三角形涂满
        </h1>
      </div>
      <LessonStrip />
      <WeightBars hud={hud} />
      <MixSwatch hud={hud} />
      <ChallengeCard hud={hud} />
      <div className="flex flex-wrap gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={onTogglePin}>
          {hud.pinned ? "松开探针" : "钉住探针"}
        </Button>
        <Button variant="outline" size="sm" onClick={onGoCenter}>
          放到重心
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset}>
          重置三角形
        </Button>
      </div>
    </aside>
  );
}
