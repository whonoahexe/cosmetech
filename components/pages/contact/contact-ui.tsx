import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <p className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px]">
        {title}
      </p>
      <Button variant="outline" className="h-8 w-16 rounded-full border-primary px-3 text-primary">
        <Sparkles className="size-4" />
      </Button>
    </div>
  );
}

export function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[18px] leading-6.75 text-primary underline"
    >
      {label}
      <ArrowUpRight className="size-5" />
    </Link>
  );
}
