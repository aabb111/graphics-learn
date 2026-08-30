type LessonNoteProps = {
  ink: string;
  mute: string;
};

export function LessonNote({ ink, mute }: LessonNoteProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] leading-6 text-foreground">{ink}</p>
      <p className="text-[11px] leading-5 text-muted-foreground">{mute}</p>
    </div>
  );
}
