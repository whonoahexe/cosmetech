import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";

export const FEATURED_ARTICLE: ArticleCardData = {
  image: null,
  category: "Fragrance",
  readTime: 6,
  title: "Search Is Dead. Long Live Asking.",
  excerpt:
    "People do not search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational.",
};

export const SIDE_ARTICLES: ArticleCardData[] = [
  {
    image: null,
    category: "Packaging",
    readTime: 6,
    title: "The Aesthetic Is the Product",
    excerpt:
      "Why branding, UI, and vibes now carry more weight than features. We are all buying feelings with a side of software.",
  },
  {
    image: null,
    category: "Packaging",
    readTime: 6,
    title: "The Death of the Casual Internet",
    excerpt:
      "Every post is optimized. Every opinion branded. Whatever happened to logging on and just being weird.",
  },
  {
    image: null,
    category: "Packaging",
    readTime: 6,
    title: "The Internet Is Smaller Than It Thinks!",
    excerpt:
      "Been poking at traffic patterns and it is kind of hilarious how the open web is just five platforms in a trench coat.",
  },
  {
    image: null,
    category: "Regulations",
    isSponsored: true,
    readTime: 6,
    title: "Minimalism Was a Phase. We Want Texture Again",
    excerpt:
      "Clean design ruled for a decade. Now people want personality, clutter, and interfaces that feel human.",
  },
];

type FeaturedSplitSectionProps = {
  featuredArticle: ArticleCardData;
  sideArticles: ArticleCardData[];
};

export function FeaturedSplitSection({
  featuredArticle,
  sideArticles,
}: FeaturedSplitSectionProps) {
  return (
    <section className="py-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
        <div className="lg:col-span-5">
          <ArticleCard {...featuredArticle} variant="featured" colSpan={4} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-3">
          {sideArticles.map((article, index) => (
            <ArticleCard
              key={article.title}
              {...article}
              variant="list"
              showSeparator={index < sideArticles.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
