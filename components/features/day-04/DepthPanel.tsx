import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-04/WinFeedback";
import { Button } from "@/components/ui/button";
import type { DepthHud } from "@/lib/day-04/studio";
import { L4_LINKS } from "@/lib/days/sources";

type DepthPanelProps = {
  hud: DepthHud;
  onReset: () => void;
};

export function DepthPanel({ hud, onReset }: DepthPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 4 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">深度缓冲</h1>
      </div>
      {hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint show={hud.holding} />}
      <LessonBlock
        ink="两个三角叠在一起时，只留更近的那块颜色。远的不是没了，是比下去了。"
        mute="这叫深度缓冲。"
        links={L4_LINKS}
      />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置远近
        </Button>
      )}
    </aside>
  );
}
