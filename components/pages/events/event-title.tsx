import { Badge } from "@/components/ui/badge";

interface EventTitleProps {
  title: string;
  category: string;
  date: string;
  excerpt?: string;
  isSponsored?: boolean;
  isVirtual?: boolean;
}

export function EventTitle({ title, category, date, excerpt, isSponsored, isVirtual }: EventTitleProps) {
  return (
    <section className="flex flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 md:py-8 lg:px-0">
      <div className="flex items-center justify-center gap-2">
        <Badge variant="secondary">{category}</Badge>
        {isSponsored && <Badge variant="default">Sponsored</Badge>}
        {isVirtual && <Badge variant="default">Virtual</Badge>}
        <span className="type-paragraph text-foreground">&bull;</span>
        <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
          {date}
        </span>
      </div>
      <h1 className="type-heading-2 text-foreground max-w-3xl">{title}</h1>
      {excerpt && (
        <p className="type-paragraph-medium max-w-110 text-muted-foreground">
          {excerpt}
        </p>
      )}
    </section>
  );
}
