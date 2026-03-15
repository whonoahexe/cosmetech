import { PortableTextBody } from "@/components/shared/portable-text-body";

type EventAboutProps = {
  body?: unknown[] | null;
};

export function EventAbout({ body }: EventAboutProps) {
  return (
    <div className="space-y-6">
      <h2 className="type-heading-2 text-foreground">About This Event</h2>
      <PortableTextBody value={body} />
    </div>
  );
}
