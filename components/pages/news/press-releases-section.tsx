import { ArrowRight } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

type PressReleasesSectionProps = {
  pressReleases?: ArticleCardData[];
};

export function PressReleasesSection({ pressReleases = [] }: PressReleasesSectionProps) {
  if (pressReleases.length === 0) return null;

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
        {pressReleases.map((article) => (
          <div key={article.title} className="col-span-8 md:col-span-4 xl:col-span-2">
            <ArticleCard {...article} colSpan={2} />
          </div>
        ))}
      </div>
    </section>
  );
}
