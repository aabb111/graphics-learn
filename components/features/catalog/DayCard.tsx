import Link from "next/link";

import type { DayEntry } from "@/lib/days/catalog";
import { VERTEX_HEX } from "@/lib/geometry/colors";
import { cn } from "@/lib/utils";

type DayCardProps = {
  entry: DayEntry;
};

export function DayCard({ entry }: DayCardProps) {
  const playable = entry.status === "playable";
  const content = (
    <article
      className={cn(
        "border-b border-border/80 py-6",
        playable ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <p className="text-[11px] tracking-[0.16em]">第 {entry.day} 天</p>
      <div className="mt-2 flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3">
          {playable ? (
            <span className="flex shrink-0 items-center gap-1" aria-hidden>
              <span className="size-2 rounded-full" style={{ background: VERTEX_HEX.a }} />
              <span className="size-2 rounded-full" style={{ background: VERTEX_HEX.b }} />
              <span className="size-2 rounded-full" style={{ background: VERTEX_HEX.c }} />
            </span>
          ) : null}
          <h2 className="text-[28px] font-normal tracking-tight">{entry.title}</h2>
        </div>
        <span
          className={cn(
            "shrink-0 text-[14px] leading-6",
            playable ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {playable ? "进入" : "未开放"}
        </span>
      </div>
      <p className="mt-2 max-w-xl text-[14px] leading-6 text-muted-foreground">{entry.lede}</p>
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
