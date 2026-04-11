"use client";

import { type FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setFeedback("");

    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error("subscribe-failed");
      }

      setStatus("success");
      setFeedback("You are subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setFeedback("Could not subscribe right now.");
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <p className="type-paragraph-mini uppercase tracking-widest text-primary-foreground/50">
        Newsletter
      </p>
      <p className="type-paragraph-small text-primary-foreground/70">
        Stay in the loop with the latest industry news.
      </p>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <InputGroup className="bg-input border-border rounded-lg">
        <InputGroupAddon align="inline-start">
          <Mail className="size-5 text-muted-foreground pr-1.5" />
        </InputGroupAddon>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="bg-transparent border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
          aria-label="Newsletter email"
          required
          disabled={status === "submitting"}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            variant="secondary"
            size="sm"
            disabled={status === "submitting" || !email.trim()}
          >
            {status === "submitting" ? "..." : "Join"}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {feedback ? (
        <p
          className={
            status === "success"
              ? "type-paragraph-mini text-primary-foreground"
              : "type-paragraph-mini text-destructive"
          }
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
