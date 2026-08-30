import { cn } from "@/lib/utils";

type HoldHintProps = {
  show: boolean;
};

export function HoldHint({ show }: HoldHintProps) {
  return (
    <p
      className={cn(
        "mt-3 text-[14px] leading-6 text-foreground motion-hold",
        show ? "opacity-100 motion-hold-in" : "opacity-0 motion-hold-out",
      )}
    >
      稳住
    </p>
  );
}
