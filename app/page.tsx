import { ArticleGrid, FilterBar, HighlightedCarousel } from "@/components/pages/home";

export default function Home() {
  return (
    <>
      <FilterBar />
      <HighlightedCarousel />
      <ArticleGrid />
    </>
  );
}
