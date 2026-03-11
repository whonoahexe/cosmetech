export function EventAbout({ description }: { description: string }) {
  return (
    <div className="space-y-6">
      <h2 className="type-heading-3 text-foreground">About This Event</h2>
      {description
        .trim()
        .split("\n\n")
        .map((para, i) => (
          <p key={i} className="type-paragraph-large text-foreground">
            {para.trim()}
          </p>
        ))}
    </div>
  );
}
