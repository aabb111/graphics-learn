import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { DayEntry } from "@/lib/days/catalog";
import { cn } from "@/lib/utils";

type UpcomingDayProps = {
  entry: DayEntry;
};

export function UpcomingDay({ entry }: UpcomingDayProps) {
  return (
    <section className="mx-auto flex max-w-lg flex-1 flex-col justify-center py-16">
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">
        第 {entry.day} 天
      </p>
      <h1 className="mt-3 text-[28px] font-normal tracking-tight">{entry.title}</h1>
      <p className="mt-4 text-[14px] leading-6 text-muted-foreground">
        这一关还没写。先去第 1 关，把重心坐标拖明白。
      </p>
      <Link
        href="/days/1"
        className={cn(buttonVariants({ size: "lg" }), "mt-8 w-fit rounded-full px-5")}
      >
        回到第 1 关
      </Link>
    </section>
  );
}
