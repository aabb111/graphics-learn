import { HoldHint } from "@/components/features/motion/HoldHint";
import type { ColorHud } from "@/lib/day-02/studio";

type MatchMeterProps = {
  hud: ColorHud;
};

export function MatchMeter({ hud }: MatchMeterProps) {
  return (
    <section>
      <p className="text-[14px] leading-6 text-foreground">
        三个角对了，整面就对了。
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-150"
          style={{ width: `${hud.closeness * 100}%` }}
        />
      </div>
      <HoldHint show={hud.holding} />
    </section>
  );
}
