"use client";

import { type FormEvent, useState } from "react";
import { Mail, PenLine, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("submit-failed");
      }

      form.reset();
      setStatus("success");
      setFeedback("Thanks. Your message has been sent.");
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="space-y-6 lg:pt-0" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

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

      <div className="shadow-2xl">
        <Textarea
          placeholder="How can we help you?"
          name="message"
          required
          rows={5}
          className="rounded-3xl border-b border-border"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        {feedback ? (
          <p
            className={
              status === "success"
                ? "type-paragraph-small text-primary"
                : "type-paragraph-small text-destructive"
            }
            role="status"
          >
            {feedback}
          </p>
        ) : (
          <span />
        )}

        <Button
          type="submit"
          variant="secondary"
          size="default"
          disabled={status === "submitting"}
          className="h-10 rounded-full border border-[#f7dbd4] px-4"
        >
          <span>{status === "submitting" ? "Sending" : "Send"}</span>
          <SendHorizontal className="size-4" />
        </Button>
      </div>
    </form>
  );
}
