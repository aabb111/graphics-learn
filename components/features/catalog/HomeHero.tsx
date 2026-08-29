import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="max-w-2xl pt-4 md:pt-8">
      <p className="text-[12px] tracking-[0.18em] text-muted-foreground">每天一关</p>
      <h1 className="mt-4 text-[36px] font-normal leading-tight tracking-tight md:text-[52px]">
        用手把图形学
        <br />
        拖明白。
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">
        打开就能玩。现在只有第 1 关：重心坐标如何把三角形涂满。后面的日子留着，方便一关一关往下加。
      </p>
      <div className="mt-8">
        <Link
          href="/days/1"
          className={cn(buttonVariants({ size: "lg" }), "rounded-full px-5")}
        >
          开始第 1 关
        </Link>
      </div>
    </section>
  );
}
