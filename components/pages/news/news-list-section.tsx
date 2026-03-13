import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";

type NewsListSectionProps = {
  stories?: ArticleCardData[];
};

export function NewsListSection({ stories = [] }: NewsListSectionProps) {
  if (stories.length === 0) return null;

  return (
    <section className="space-y-8 py-4">
      {stories.map((article) => (
        <ArticleCard key={article.title} {...article} variant="news-horizontal" />
      ))}
    </section>
  );
}
