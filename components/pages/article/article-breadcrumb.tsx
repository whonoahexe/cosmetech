import Link from "next/link";
import { Sparkles } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

type ArticleBreadcrumbProps = {
  category: string;
  categorySlug?: string;
  articleLabel: string;
};

export function ArticleBreadcrumb({
  category,
  categorySlug,
  articleLabel,
}: ArticleBreadcrumbProps) {
  const categoryHref = categorySlug ? `/categories?category=${categorySlug}` : "/categories";

  return (
    <div className="flex items-center gap-8">
      <Breadcrumb>
        <BreadcrumbList className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px]">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/categories">Categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
            /
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={categoryHref}>{category}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
            /
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="type-monospaced text-primary text-[30px]!">
              {articleLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button variant="outline" className="rounded-full border-primary px-3 text-primary w-16">
        <Sparkles className="size-4" />
      </Button>
    </div>
  );
}
