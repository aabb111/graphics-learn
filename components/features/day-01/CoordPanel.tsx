import Link from "next/link";

import { ChallengeCard } from "@/components/features/day-01/ChallengeCard";
import { MixSwatch } from "@/components/features/day-01/MixSwatch";
import { WeightBars } from "@/components/features/day-01/WeightBars";
import { WinFeedback } from "@/components/features/day-01/WinFeedback";
import { Button, buttonVariants } from "@/components/ui/button";
import type { StudioHud } from "@/lib/geometry/studio";
import { cn } from "@/lib/utils";

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
        <WeightBars hud={hud} />
        <MixSwatch hud={hud} />
      </div>
      <div className="flex flex-col gap-3">
        {hud.solved ? <WinFeedback /> : <ChallengeCard hud={hud} />}
        <div className="flex flex-nowrap items-center gap-2">
          <Button variant="ghost" className="h-8" onClick={onReset}>
            {hud.solved ? "再玩一次" : "重置三角形"}
          </Button>
          {hud.solved ? (
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }), "h-8")}
            >
              回首页
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
