import { PortableText, type PortableTextComponents } from "next-sanity";
import { SanityImage } from "./sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="type-paragraph-large text-foreground mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="type-heading-2 text-foreground mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="type-heading-3 text-foreground mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="type-heading-4 text-foreground mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic type-paragraph-large text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="type-paragraph-large space-y-2 text-foreground list-disc pl-6 mb-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="type-paragraph-large space-y-2 text-foreground list-decimal pl-6 mb-5">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="type-paragraph-large-bold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary underline"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImageType;
      if (!image?.asset?.url) return null;
      return (
        <figure className="my-8">
          <SanityImage
            image={image}
            alt={value.alt ?? ""}
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full rounded-2xl"
          />
        </figure>
      );
    },
  },
};

type PortableTextBodyProps = {
  value: unknown[] | undefined | null;
  className?: string;
};

export function PortableTextBody({ value, className }: PortableTextBodyProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={className}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  );
}
