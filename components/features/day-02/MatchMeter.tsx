import { HoldHint } from "@/components/features/motion/HoldHint";
import type { ColorHud } from "@/lib/day-02/studio";

type MatchMeterProps = {
  hud: ColorHud;
};

export function MatchMeter({ hud }: MatchMeterProps) {
  return (
    <section>
      <div className="h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-150"
          style={{ width: `${hud.closeness * 100}%` }}
        />
      </div>
      <HoldHint show={hud.holding} />
    </section>
  );
}
