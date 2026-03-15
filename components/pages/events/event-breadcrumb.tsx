import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function EventBreadcrumb({ category, uid }: { category: string; uid: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px]">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/events">Events</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/events">{category}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="type-monospaced text-primary text-[30px]!">
            {uid}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
