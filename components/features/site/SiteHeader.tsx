import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-6 border-b border-border/80",
        "px-5 py-4 md:px-8",
        className,
      )}
    >
      <Link href="/" className="text-[13px] font-medium tracking-[0.14em] text-foreground">
        图形学
      </Link>
      <nav className="flex items-center gap-5 text-[13px] text-muted-foreground">
        <Link href="/days" className="transition-colors hover:text-foreground">
          关卡列表
        </Link>
        <Link href="/days/1" className="text-foreground transition-colors hover:text-primary">
          第 1 天
        </Link>
      </nav>
    </header>
  );
}
