import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";

type ArticlePromoProps = {
  promoArticle: ArticleCardData;
};

export function ArticlePromo({ promoArticle }: ArticlePromoProps) {
  return (
    <ArticleCard
      {...promoArticle}
      variant="list"
      className="[&_h3]:text-primary"
      showSeparator={false}
    />
  );
}
