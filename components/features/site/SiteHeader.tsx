"use client";

import Link from "next/link";

import { useShellMax } from "@/hooks/use-shell-max";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const { currentLevel, maxWidth } = useShellMax();

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
          {currentLevel ? (
            <span className="text-foreground">第 {currentLevel} 关</span>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
