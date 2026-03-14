"use client";

import { Calendar, Clapperboard, Clock, Store, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

type EventTag = "conference" | "workshop" | "webinar" | "expo";

type EventsHeaderProps = {
  description?: string;
  activeTag: EventTag | null;
  pastOnly: boolean;
  onTagToggle: (tag: EventTag) => void;
  onPastOnlyToggle: () => void;
};

const TAG_BUTTONS: { tag: EventTag; label: string; icon: React.ReactNode }[] = [
  { tag: "conference", label: "Conferences", icon: <Calendar className="size-4" /> },
  { tag: "workshop", label: "Workshops", icon: <Wrench className="size-4" /> },
  { tag: "webinar", label: "Webinars", icon: <Clapperboard className="size-4" /> },
  { tag: "expo", label: "Expos", icon: <Store className="size-4" /> },
];

export function EventsHeader({
  description,
  activeTag,
  pastOnly,
  onTagToggle,
  onPastOnlyToggle,
}: EventsHeaderProps) {
  return (
    <section className="grid grid-cols-8 gap-5 py-8">
      <div className="col-span-8 flex max-w-230 flex-col gap-4 xl:col-span-5">
        <h1 className="type-heading-1 text-foreground">EVENTS</h1>

        <div className="flex flex-wrap items-center gap-3 py-4">
          <Button
            variant={pastOnly ? "default" : "outline"}
            size="sm"
            className={cn("h-10 rounded-full px-6", !pastOnly && "border-secondary")}
            onClick={onPastOnlyToggle}
          >
            <Clock className="size-4" />
            Past Events
          </Button>

          <span className="type-heading-4 text-foreground">&bull;</span>

          <ButtonGroup>
            {TAG_BUTTONS.map(({ tag, label, icon }) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                size="sm"
                className="h-10 px-6"
                onClick={() => onTagToggle(tag)}
              >
                {icon}
                {label}
              </Button>
            ))}
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
