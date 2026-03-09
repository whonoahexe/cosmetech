import { ArrowDown } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

const CATEGORY_ARTICLES: ArticleCardData[] = [
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
    category: "Fragrance",
    readTime: 6,
    title: "Minimalism Was a Phase. We Want Texture Again",
    excerpt:
      "Clean design ruled for a decade. Now people want personality, clutter, and interfaces that feel human.",
  },
  {
    image: null,
    category: "Fragrance",
    readTime: 6,
    title: "Why Every Brand Thinks It Is a Media Company Now",
    excerpt: "From newsletters to mini-documentaries, brands are publishing like studios.",
  },
  {
    image: null,
    category: "Marketing",
    readTime: 6,
    title: "AI Tools Will Not Replace Editors, But They Expose Lazy Ones",
    excerpt:
      "Automation is reshaping editorial workflows. We explore how smart teams use AI for research.",
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
    category: "Regulations",
    isSponsored: true,
    readTime: 6,
    title: "Burnout but Make It Productive",
    excerpt:
      "Hustle culture evolved into quiet overwork. Same pressure, softer language. Still exhausting.",
  },
  {
    image: null,
    category: "Regulations",
    isSponsored: true,
    readTime: 6,
    title: "Newsletter Fatigue Is Real",
    excerpt: "Everyone launched a newsletter. Now everyone's inbox is a war zone.",
  },
  {
    image: null,
    category: "Regulations",
    isSponsored: true,
    readTime: 6,
    title: "The Return of Niche Publications",
    excerpt: "Hyper-focused editorial sites are thriving in corners the mainstream forgot.",
  },
];

export function AllArticlesSection() {
  return (
    <section className="flex flex-col mb-12">
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">All Articles</h2>
        <Button variant="outline" className="h-9 rounded-full w-16" aria-label="Sort all articles">
          <ArrowDown className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 py-4 md:grid-cols-4">
        {CATEGORY_ARTICLES.map((article) => (
          <div key={article.title} className="md:col-span-1">
            <ArticleCard {...article} colSpan={2} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-4">
        <Button variant="default" size="lg" className="rounded-full px-8 h-12">
          Load More
          <ArrowDown className="size-4" />
        </Button>
      </div>
    </section>
  );
}
