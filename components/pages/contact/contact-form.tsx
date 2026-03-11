"use client";

import { Mail, PenLine, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  return (
    <form className="space-y-6 lg:pt-0">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative shadow-2xl">
          <PenLine className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Your Name"
            name="name"
            required
            className="h-14 rounded-full pl-10 border-b border-border"
          />
        </div>

        <div className="relative shadow-2xl">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Your Email"
            type="email"
            name="email"
            required
            className="h-14 rounded-full pl-10 border-b border-border"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          className="h-8 w-16 rounded-full border border-[#f7dbd4] px-3"
        >
          <SendHorizontal className="size-4" />
        </Button>
      </div>
    </form>
  );
}
