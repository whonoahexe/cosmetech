import { Calendar, Clapperboard, Store, Wrench, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type EventsHeaderProps = {
  description?: string;
};

export function EventsHeader({ description }: EventsHeaderProps) {
  return (
    <section className="grid grid-cols-8 gap-5 py-8">
      <div className="col-span-8 flex max-w-230 flex-col gap-4 xl:col-span-5">
        <h1 className="type-heading-1 text-foreground">EVENTS</h1>

        <div className="flex flex-wrap items-center gap-3 py-4">
          <Button variant="outline" size="sm" className="h-10 rounded-full border-secondary px-6">
            <Zap className="size-4" />
            Upcoming
          </Button>

          <span className="type-heading-4 text-foreground">&bull;</span>

          <ButtonGroup>
            <Button variant="outline" size="sm" className="h-10 px-6">
              <Calendar className="size-4" />
              Conferences
            </Button>
            <Button variant="outline" size="sm" className="h-10 px-6">
              <Wrench className="size-4" />
              Workshops
            </Button>
            <Button variant="outline" size="sm" className="h-10 px-6">
              <Clapperboard className="size-4" />
              Webinars
            </Button>
            <Button variant="outline" size="sm" className="h-10 px-6">
              <Store className="size-4" />
              Expos
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {description && (
        <p className="type-paragraph-large-medium col-span-8 max-w-166 text-foreground xl:col-span-3 xl:pt-2">
          {description}
        </p>
      )}
    </section>
  );
}
