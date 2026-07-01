"use client";

import { type FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "cosmetech-newsletter-popup-dismissed";
const OPEN_DELAY_MS = 1500;

export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      dismissed = false;
    }

    if (dismissed) return;

    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("subscribe-failed");
      }

      setStatus("success");
      setFeedback("Thanks for joining. Check your inbox soon.");

      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore storage errors
      }

      window.setTimeout(() => setOpen(false), 1800);
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          dismiss();
          return;
        }
        setOpen(nextOpen);
      }}
    >
      <DialogContent className="gap-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Stay Updated with Cosmetech</DialogTitle>
          <DialogDescription>
            Join the Cosmetech community and receive the latest industry insights, trends,
            newsletters and updates directly in your inbox.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Name*"
              required
              disabled={status === "submitting"}
              aria-label="Name"
              className="border-border/60"
            />
            <Input
              type="text"
              name="company"
              placeholder="Company Name*"
              required
              disabled={status === "submitting"}
              aria-label="Company Name"
              className="border-border/60"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email ID*"
              required
              disabled={status === "submitting"}
              aria-label="Email ID"
              className="border-border/60"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Contact Number (Optional)"
              disabled={status === "submitting"}
              aria-label="Contact Number (Optional)"
              className="border-border/60"
            />
          </div>

          {feedback ? (
            <p
              className={
                status === "success"
                  ? "type-paragraph-mini text-primary"
                  : "type-paragraph-mini text-destructive"
              }
              role="status"
            >
              {feedback}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            disabled={status === "submitting"}
            className="mt-2 w-full"
          >
            <span>{status === "submitting" ? "Joining..." : "Subscribe to our Newsletter"}</span>
          </Button>

          <p className="flex items-start gap-1.5 type-paragraph-mini text-muted-foreground">
            <Mail className="mt-0.5 size-3.5 shrink-0" />
            We respect your privacy. No spam, only relevant B2B industry updates.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
