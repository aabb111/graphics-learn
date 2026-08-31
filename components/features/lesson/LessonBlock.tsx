import { LessonNote } from "@/components/features/lesson/LessonNote";
import { RelatedLinks } from "@/components/features/lesson/RelatedLinks";
import type { SourceLink } from "@/lib/days/sources";

type LessonBlockProps = {
  ink: string;
  mute: string;
  links: SourceLink[];
};

export function LessonBlock({ ink, mute, links }: LessonBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <LessonNote ink={ink} mute={mute} />
      <RelatedLinks links={links} />
    </div>
  );
}
