type NewsHeaderProps = {
  description?: string;
};

export function NewsHeader({ description }: NewsHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-3 py-8 text-center">
      <h1 className="type-heading-1 text-foreground">NEWS</h1>
      {description && (
        <p className="type-paragraph-medium max-w-239 text-muted-foreground">
          {description}
        </p>
      )}
    </section>
  );
}
