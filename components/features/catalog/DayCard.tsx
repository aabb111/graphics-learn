import Link from "next/link";

import type { DayEntry } from "@/lib/days/catalog";
import { cn } from "@/lib/utils";

type DayCardProps = {
  entry: DayEntry;
};

export function DayCard({ entry }: DayCardProps) {
  const playable = entry.status === "playable";
  const content = (
    <article
      className={cn(
        "flex items-start justify-between gap-6 border-b border-border/80 py-6",
        playable ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <div className="min-w-0">
        <p className="text-[11px] tracking-[0.16em] uppercase">第 {entry.day} 天</p>
        <h2 className="mt-2 text-[22px] font-normal tracking-tight md:text-[26px]">
          {entry.title}
        </h2>
        <p className="mt-2 max-w-xl text-[14px] leading-7 text-muted-foreground">
          {entry.lede}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 pt-7 text-[13px]",
          playable ? "text-primary" : "text-muted-foreground",
        )}
      >
        {playable ? "进入" : "未开放"}
      </span>
    </article>
  );

  if (!playable) {
    return (
      <div aria-disabled="true" className="cursor-default">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/days/${entry.day}`} className="block transition-opacity hover:opacity-70">
      {content}
    </Link>
  );
}
