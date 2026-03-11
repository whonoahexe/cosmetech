import { ArrowRight } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

export const PRESS_RELEASES: ArticleCardData[] = [
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

export function PressReleasesSection() {
  return (
    <section className="py-4">
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">Press Releases</h2>
        <Button
          variant="outline"
          className="h-9 w-16 rounded-full"
          aria-label="Press releases controls"
        >
          <ArrowRight className="size-4" />
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
