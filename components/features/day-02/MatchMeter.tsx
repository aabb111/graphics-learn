import type { ColorHud } from "@/lib/day-02/studio";

type MatchMeterProps = {
  hud: ColorHud;
};

export function MatchMeter({ hud }: MatchMeterProps) {
  return (
    <div className="h-1.5 rounded-full bg-border">
      <div
        className="h-full rounded-full bg-success transition-[width] duration-150"
        style={{ width: `${hud.closeness * 100}%` }}
      />
    </div>
  );
}
