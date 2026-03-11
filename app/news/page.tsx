import {
  NewsHeader,
  NewsHeroSection,
  NewsListSection,
  PressReleasesSection,
} from "@/components/pages/news";

export default function NewsPage() {
  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <NewsHeader />
      <NewsHeroSection />
      <NewsListSection />
      <PressReleasesSection />
    </div>
  );
}
