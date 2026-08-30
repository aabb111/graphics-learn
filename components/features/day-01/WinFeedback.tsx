import Link from "next/link";

import { PassStamp } from "@/components/features/day-01/PassStamp";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WinFeedbackProps = {
  onReset: () => void;
};

export function WinFeedback({ onReset }: WinFeedbackProps) {
  return (
    <section className="flex flex-col gap-3">
      <p className="motion-pass-title text-[14px] leading-6 text-success">过关了</p>
      <PassStamp />
      <p className="motion-pass-late text-[14px] leading-6">
        三个数都是 1/3，因为离三个顶点一样远。
      </p>
      <div className="motion-pass-late flex flex-nowrap items-center gap-2">
        <Link href="/days/2" className={cn(buttonVariants({ variant: "default" }), "h-8")}>
          去第 2 关
        </Link>
        <Button variant="ghost" className="h-8" onClick={onReset}>
          再玩一次
        </Button>
      </div>
    </section>
  );
}
