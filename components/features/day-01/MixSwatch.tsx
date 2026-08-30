import { rgbToCss } from "@/lib/geometry/colors";
import type { StudioHud } from "@/lib/geometry/studio";
import { cn } from "@/lib/utils";

type MixSwatchProps = {
  hud: StudioHud;
};

export function MixSwatch({ hud }: MixSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "size-14 rounded-full border border-black/10",
          !hud.inside && "border-dashed border-black/25 bg-white",
        )}
        style={hud.inside ? { background: rgbToCss(hud.mix) } : undefined}
        aria-hidden
      />
      <div className="text-[14px] leading-6">
        {hud.inside ? (
          <>
            <p className="text-foreground">这一点的颜色 = 三个角按 αβγ 兑在一起。</p>
            <p className="text-muted-foreground">P = αA + βB + γC</p>
          </>
        ) : (
          <>
            <p className="text-foreground">在外面，先不涂色</p>
            <p className="text-muted-foreground">负的分量 = 在这条边的外侧。</p>
          </>
        )}
      </div>
    </div>
  );
}
