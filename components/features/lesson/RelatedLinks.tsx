import type { SourceLink } from "@/lib/days/sources";

type RelatedLinksProps = {
  links: SourceLink[];
};

export function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] leading-5 text-muted-foreground">相关资料</p>
      <ul className="flex flex-col gap-2">
        {links.slice(0, 4).map((link) => (
          <li key={link.href} className="min-w-0">
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-[14px] leading-6 text-foreground underline-offset-2 hover:underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
