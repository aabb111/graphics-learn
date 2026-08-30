import { HoldHint } from "@/components/features/motion/HoldHint";
import type { StudioHud } from "@/lib/geometry/studio";

type ChallengeCardProps = {
  hud: StudioHud;
};

export function ChallengeCard({ hud }: ChallengeCardProps) {
  return (
    <section>
      <p className="text-[14px] leading-6 text-foreground">
        中间这一点，分到三个角的份一样多。
      </p>
      <HoldHint show={hud.holding} />
    </section>
  );
}
