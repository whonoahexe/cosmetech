import { Badge } from "@/components/ui/badge";

type ArticleHeaderProps = {
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  isSponsored?: boolean;
};

export function ArticleHeader({ title, excerpt, category, readTime, isSponsored }: ArticleHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 md:py-8 lg:px-0">
      <h1 className="type-heading-2 text-foreground">{title}</h1>
      <p className="type-paragraph-medium max-w-130 text-muted-foreground">{excerpt}</p>
      <div className="flex items-center justify-center gap-2">
        <Badge variant="default">{category}</Badge>
        {isSponsored && <Badge variant="secondary">Sponsored</Badge>}
        <span className="type-paragraph text-foreground">&bull;</span>
        <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
          {readTime} min read
        </span>
      </div>
    </section>
  );
}
