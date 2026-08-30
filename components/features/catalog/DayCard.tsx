import Link from "next/link";

import type { DayEntry } from "@/lib/days/catalog";
import { VERTEX_HEX } from "@/lib/geometry/colors";

type DayCardProps = {
  entry: DayEntry;
};

export function DayCard({ entry }: DayCardProps) {
  return (
    <Link
      href={`/days/${entry.day}`}
      className="block border-b border-border/80 py-6 text-foreground transition-opacity hover:opacity-70"
    >
      <p className="text-[11px] tracking-[0.16em]">第 {entry.day} 关</p>
      <div className="mt-2 flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 items-center gap-1" aria-hidden>
            <span className="size-2 rounded-full" style={{ background: VERTEX_HEX.a }} />
            <span className="size-2 rounded-full" style={{ background: VERTEX_HEX.b }} />
            <span className="size-2 rounded-full" style={{ background: VERTEX_HEX.c }} />
          </span>
          <h2 className="text-[28px] font-normal tracking-tight">{entry.title}</h2>
        </div>
        <span className="shrink-0 text-[14px] leading-6">去玩</span>
      </div>
      <p className="mt-2 max-w-xl text-[14px] leading-6 text-muted-foreground">{entry.lede}</p>
    </Link>
  );
}
