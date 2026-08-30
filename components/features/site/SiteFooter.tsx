"use client";

import { useShellMax } from "@/hooks/use-shell-max";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const { maxWidth } = useShellMax();

  return (
    <footer className={cn("text-[14px] leading-6 text-muted-foreground", className)}>
      <div className={cn("mx-auto w-full px-5 py-5 md:px-8", maxWidth)}>
        <p>每天一关 · 为 zeshi li</p>
      </div>
    </footer>
  );
}
