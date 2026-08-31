import { cn } from "@/lib/utils";

type HoldHintProps = {
  show: boolean;
};

export function HoldHint({ show }: HoldHintProps) {
  return (
    <div
      className={cn(
        "hold-slot grid ease-linear",
        show ? "grid-rows-[1fr] duration-[120ms]" : "grid-rows-[0fr] duration-80",
      )}
    >
      <p
        className={cn(
          "overflow-hidden text-[14px] leading-6 text-foreground motion-hold",
          show ? "motion-hold-in opacity-100" : "motion-hold-out opacity-0",
        )}
        aria-hidden={!show}
      >
        稳住
      </p>
    </div>
  );
}
