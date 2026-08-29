import { cn } from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "px-5 py-5 text-[12px] tracking-wide text-muted-foreground md:px-8",
        className,
      )}
    >
      <p>每天一关 · 为 zeshi li</p>
    </footer>
  );
}
