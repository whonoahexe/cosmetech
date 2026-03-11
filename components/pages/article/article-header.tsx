import { Badge } from "@/components/ui/badge";

type ArticleHeaderProps = {
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
};

export function ArticleHeader({ title, excerpt, category, readTime }: ArticleHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-3 py-8 text-center">
      <h1 className="type-heading-2 text-foreground">{title}</h1>
      <p className="type-paragraph-medium max-w-130 text-muted-foreground">{excerpt}</p>
      <div className="flex items-center justify-center gap-2">
        <Badge variant="default">{category}</Badge>
        <span className="type-paragraph text-foreground">&bull;</span>
        <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
          {readTime} min read
        </span>
      </div>
    </section>
  );
}
