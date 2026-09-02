import { splitInkSentences } from "@/lib/days/knowledge";
import { cn } from "@/lib/utils";

type LessonNoteProps = {
  ink: string;
  mute: string;
};

export function LessonNote({ ink, mute }: LessonNoteProps) {
  return (
    <div className={cn("flex flex-col", "gap-2")}>
      {splitInkSentences(ink).map((sentence) => (
        <p key={sentence} className={cn("text-[14px]", "leading-6", "text-foreground")}>
          {sentence}
        </p>
      ))}
      <p className={cn("text-[11px]", "leading-5", "text-muted-foreground")}>{mute}</p>
    </div>
  );
}
