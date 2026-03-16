type NewsHeaderProps = {
  description?: string;
};

export function NewsHeader({ description }: NewsHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-3 py-6 text-center md:py-8">
      <h1 className="type-heading-1 text-foreground">NEWS</h1>
      {description && (
        <p className="type-paragraph-medium max-w-full text-muted-foreground md:max-w-239">
          {description}
        </p>
      )}
    </section>
  );
}
