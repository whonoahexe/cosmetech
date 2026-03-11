import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export const FEATURED_NEWS = {
  title: "Search Is Dead. Long Live Asking.",
  category: "Regulations",
  isSponsored: true,
  readTime: 6,
  excerpt:
    "People don't search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational. Organic search still sends traffic, sure. But the vibe shifted. Queries look less like caveman keyword stacks and more like late-night DMs.",
};

export function NewsHeroSection() {
  return (
    <section className="py-4">
      <div className="group relative h-150 w-full overflow-hidden rounded-3xl bg-[#D9D9D9]">
        <Link href="/article" className="absolute inset-0 z-0" aria-label={`Read ${FEATURED_NEWS.title}`} />
        <div className="pointer-events-none absolute left-8 top-8 z-10 flex max-w-130 flex-col gap-4 md:left-18 md:top-18">
          <Link href="/article" className="pointer-events-auto hover:underline">
            <h2 className="type-heading-1 text-foreground">{FEATURED_NEWS.title}</h2>
          </Link>

          <div className="pointer-events-auto flex items-center gap-2">
            <Badge variant="secondary">{FEATURED_NEWS.category}</Badge>
            {FEATURED_NEWS.isSponsored && <Badge variant="default">Sponsored</Badge>}
            <span className="type-paragraph text-foreground">&bull;</span>
            <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
              {FEATURED_NEWS.readTime} min read
            </span>
          </div>

          <p className="type-paragraph-medium text-foreground md:text-muted-foreground">{FEATURED_NEWS.excerpt}</p>
        </div>
      </div>
    </section>
  );
}
