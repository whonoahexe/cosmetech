import { ArrowUpRight, Calendar, MapPin, Users, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventDetailsProps {
  date: string;
  time: string;
  location: string;
  organizer: string;
  isVirtual?: boolean;
  registrationUrl: string;
}

export function EventDetails({
  date,
  time,
  location,
  organizer,
  isVirtual,
  registrationUrl,
}: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
      {/* Meta pills row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="type-paragraph-medium text-foreground">{date}</span>
            <span className="type-paragraph-mini text-muted-foreground">{time}</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-border" />

        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="type-paragraph-medium text-foreground">{location}</span>
            {isVirtual && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Wifi className="size-3" />
                <span className="type-paragraph-mini">Online access available</span>
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-border" />

        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="type-paragraph-medium text-foreground">{organizer}</span>
            <span className="type-paragraph-mini text-muted-foreground">Organiser</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button className="rounded-full h-11 px-7 shrink-0" asChild>
        <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
          Register Now
          <ArrowUpRight className="size-4" />
        </a>
      </Button>
    </div>
  );
}
