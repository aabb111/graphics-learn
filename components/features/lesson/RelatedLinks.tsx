import type { SourceLink } from "@/lib/days/sources";

type RelatedLinksProps = {
  links: SourceLink[];
};

export function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground">相关资料</p>
      <ul className="flex flex-col gap-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] leading-5 text-foreground underline-offset-2 hover:underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
