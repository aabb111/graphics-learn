import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-05/WinFeedback";
import { Button } from "@/components/ui/button";
import type { TransformHud } from "@/lib/day-05/studio";
import { L5_LINKS } from "@/lib/days/sources";

type TransformPanelProps = {
  hud: TransformHud;
  onReset: () => void;
};

export function TransformPanel({ hud, onReset }: TransformPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 5 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">2D 变换</h1>
      </div>
      {hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint show={hud.holding} />}
      <LessonBlock
        ink="挪、转、放大缩小是三件事。合在一起，才能对上那块淡影。"
        mute="这叫二维变换。"
        links={L5_LINKS}
      />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置变换
        </Button>
      )}
    </aside>
  );
}
