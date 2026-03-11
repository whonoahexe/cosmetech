import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";

export const NEWS_ROWS: ArticleCardData[] = [
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

export function NewsListSection() {
  return (
    <section className="space-y-8 py-4">
      {NEWS_ROWS.map((article) => (
        <ArticleCard key={article.title} {...article} variant="news-horizontal" />
      ))}
    </section>
  );
}
