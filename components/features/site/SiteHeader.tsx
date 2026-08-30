"use client";

import Link from "next/link";

import { useShellMax } from "@/hooks/use-shell-max";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const { isDay1, isDay2, maxWidth } = useShellMax();

  return (
    <header className={cn("border-b border-border/80", className)}>
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between gap-6 px-5 py-4 md:px-8",
          maxWidth,
        )}
      >
        <Link href="/" className="text-[14px] font-medium text-foreground">
          图形学
        </Link>
        <nav className="flex items-center gap-5 text-[14px] leading-6 text-muted-foreground">
          <Link href="/days" className="transition-colors hover:text-foreground">
            关卡列表
          </Link>
          <Link
            href="/days/1"
            className={cn(
              "transition-colors hover:text-foreground",
              isDay1 ? "text-foreground" : "text-muted-foreground",
            )}
          >
            第 1 关
          </Link>
          <Link
            href="/days/2"
            className={cn(
              "transition-colors hover:text-foreground",
              isDay2 ? "text-foreground" : "text-muted-foreground",
            )}
          >
            第 2 关
          </Link>
        </nav>
      </div>
    </header>
  );
}
