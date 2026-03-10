import { ArrowDown } from "lucide-react";

import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FEATURED_NEWS = {
  title: "Search Is Dead. Long Live Asking.",
  category: "Regulations",
  isSponsored: true,
  readTime: 6,
  excerpt:
    "People don't search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational. Organic search still sends traffic, sure. But the vibe shifted. Queries look less like caveman keyword stacks and more like late-night DMs.",
};

const NEWS_ROWS: ArticleCardData[] = [
  {
    image: null,
    category: "Fragrance",
    readTime: 6,
    title: "Minimalism Was a Phase. We Want Texture Again",
    excerpt:
      "Minimalism did its job. It cleared the noise, standardized patterns, and taught everyone what a modern interface should look like. White backgrounds, generous spacing, neutral palettes, polite typography.\n\nThe reaction now isn't a rejection of clarity, it's a rejection of sameness. People aren't asking for messy interfaces because they miss chaos. They're asking for signals of life.",
  },
  {
    image: null,
    category: "Regulations",
    readTime: 6,
    title: "The Aesthetic Is the Product",
    excerpt:
      "The old model was simple. Build a product, launch a campaign, push updates when there's something to sell. Now the rhythm looks different.\n\nPart of this shift comes from the collapse of traditional channels. Social platforms still matter, but they're crowded and unpredictable.",
  },
];

const PRESS_RELEASES: ArticleCardData[] = [
  {
    image: null,
    category: "Packaging",
    readTime: 6,
    title: "The Aesthetic Is the Product",
    excerpt: "Why branding, UI, and vibes now carry more weight than features.",
  },
  {
    image: null,
    category: "Fragrance",
    readTime: 6,
    title: "Minimalism Was a Phase. We Want Texture Again",
    excerpt: "Clean design ruled for a decade. Now people want personality and clutter.",
  },
  {
    image: null,
    category: "Fragrance",
    readTime: 6,
    title: "Why Every Brand Thinks It's a Media Company Now",
    excerpt: "From newsletters to mini-documentaries, brands are publishing like studios.",
  },
  {
    image: null,
    category: "Marketing",
    readTime: 6,
    title: "AI Tools Won't Replace Editors, But They'll Expose Lazy Ones",
    excerpt: "Automation is reshaping editorial workflows and research speed.",
  },
];

function NewsHeroSection() {
  return (
    <section className="py-4">
      <div className="relative h-150 w-full overflow-hidden rounded-3xl bg-[#D9D9D9]">
        <div className="absolute left-8 top-8 flex max-w-130 flex-col gap-4 md:left-18 md:top-18">
          <h2 className="type-heading-1 text-foreground">{FEATURED_NEWS.title}</h2>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{FEATURED_NEWS.category}</Badge>
            {FEATURED_NEWS.isSponsored && <Badge variant="default">Sponsored</Badge>}
            <span className="type-paragraph text-foreground">&bull;</span>
            <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
              {FEATURED_NEWS.readTime} min read
            </span>
          </div>

          <p className="type-paragraph-medium text-muted-foreground">{FEATURED_NEWS.excerpt}</p>
        </div>
      </div>
    </section>
  );
}

function PressReleasesSection() {
  return (
    <section className="py-4">
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">Press Releases</h2>
        <Button
          variant="outline"
          className="h-9 w-16 rounded-full"
          aria-label="Press releases controls"
        >
          <ArrowDown className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-5 py-4">
        {PRESS_RELEASES.map((article) => (
          <div key={article.title} className="col-span-8 md:col-span-4 xl:col-span-2">
            <ArticleCard {...article} colSpan={2} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function NewsPageContent() {
  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <section className="flex flex-col items-center gap-3 py-8 text-center">
        <h1 className="type-heading-1 text-foreground">NEWS</h1>
        <p className="type-paragraph-medium max-w-239 text-muted-foreground">
          Timely updates from across the global beauty and personal care industry. From regulatory
          shifts and ingredient developments to brand launches and technology trends, this is where
          the latest news lives.
        </p>
      </section>

      <NewsHeroSection />

      <section className="space-y-8 py-4">
        {NEWS_ROWS.map((article) => (
          <ArticleCard key={article.title} {...article} variant="news-horizontal" />
        ))}
      </section>

      <PressReleasesSection />
    </div>
  );
}
