import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-03/WinFeedback";
import { Button } from "@/components/ui/button";
import type { RasterHud } from "@/lib/day-03/studio";
import { L3_LINKS } from "@/lib/days/sources";

type RasterPanelProps = {
  hud: RasterHud;
  onReset: () => void;
};

export function RasterPanel({ hud, onReset }: RasterPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 3 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">光栅化成像素</h1>
      </div>
      {hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint show={hud.holding} />}
      <LessonBlock
        ink="屏幕是格子。只看格子中心在不在三角里，在就整块涂上，斜边变成台阶。"
        mute="这叫光栅化。游戏里的三角，最后都变成这些格子。"
        links={L3_LINKS}
      />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置格子
        </Button>
      )}
    </aside>
  );
}
