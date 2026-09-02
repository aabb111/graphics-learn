import Link from "next/link";

import { LessonAside } from "@/components/features/lesson/LessonAside";
import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { MatchMeter } from "@/components/features/day-02/MatchMeter";
import { WinFeedback } from "@/components/features/day-02/WinFeedback";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ColorHud } from "@/lib/day-02/studio";
import { L2_LINKS } from "@/lib/days/sources";
import { L2_KNOWLEDGE } from "@/lib/days/knowledge";
import { cn } from "@/lib/utils";

type ColorPanelProps = {
  hud: ColorHud;
  onReset: () => void;
};

export function ColorPanel({ hud, onReset }: ColorPanelProps) {
  return (
    <LessonAside
      kicker="第 2 关"
      title="顶点颜色插值"
      hud={<MatchMeter hud={hud} />}
      showFeedback={hud.solved || hud.holding}
      feedback={
        hud.solved ? (
          <div className="flex flex-col gap-3">
            <WinFeedback />
            <div className="flex flex-nowrap items-center gap-2">
              <Button variant="ghost" className="h-8" onClick={onReset}>
                再玩一次
              </Button>
              <Link href="/" className={cn(buttonVariants({ variant: "default" }), "h-8")}>
                回首页
              </Link>
            </div>
          </div>
        ) : (
          <HoldHint />
        )
      }
    >
      <LessonBlock ink={L2_KNOWLEDGE} mute="这叫顶点颜色插值。" links={L2_LINKS} />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置三角形
        </Button>
      )}
    </LessonAside>
  );
}
