import {
  ArticleGrid,
  FilterBar,
  HighlightedCarousel,
  HighlightedCategories,
  UpcomingEvents,
} from "@/components/pages/home";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <FilterBar />
      <HighlightedCarousel />
      <ArticleGrid />
      <HighlightedCategories />
      <UpcomingEvents />
    </div>
  );
}
