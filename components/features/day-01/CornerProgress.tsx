import { cn } from "@/lib/utils";

type CornerProgressProps = {
  movedCount: number;
};

function remainingCopy(movedCount: number) {
  if (movedCount === 1) return "还差两个角";
  if (movedCount === 2) return "还差一个角";
  return null;
}

export function CornerProgress({ movedCount }: CornerProgressProps) {
  const hint = remainingCopy(movedCount);
  const ratio = Math.max(0, Math.min(1, movedCount / 3));

  return (
    <section className="flex flex-col gap-2">
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className={cn("h-full rounded-full bg-success transition-[width] duration-150")}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      {hint ? <p className="text-[14px] leading-6 text-foreground">{hint}</p> : null}
    </section>
  );
}
