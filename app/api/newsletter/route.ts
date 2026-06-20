import { NextResponse } from "next/server";
import {
  createResendApiClient,
  getNewsletterSegmentId,
  getNewsletterTopicId,
  isLikelyDuplicateContactError,
} from "@/lib/resend";

type NewsletterRequestBody = {
  email?: unknown;
  website?: unknown;
};

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let body: NewsletterRequestBody;

  try {
    body = (await req.json()) as NewsletterRequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const website = toTrimmedString(body.website);
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const email = toTrimmedString(body.email).toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const resendResult = createResendApiClient();
  if (!resendResult.ok) {
    console.error("[newsletter] Failed to initialize Resend client:", resendResult.error);
    return NextResponse.json({ ok: false, error: resendResult.error }, { status: 500 });
  }

  const newsletterSegmentId = getNewsletterSegmentId();
  const newsletterTopicId = getNewsletterTopicId();

  const createPayload: {
    email: string;
    unsubscribed: false;
    segments?: { id: string }[];
    topics?: { id: string; subscription: "opt_in" }[];
  } = {
    email,
    unsubscribed: false,
  };

  if (newsletterSegmentId) {
    createPayload.segments = [{ id: newsletterSegmentId }];
  }

  if (newsletterTopicId) {
    createPayload.topics = [{ id: newsletterTopicId, subscription: "opt_in" }];
  }

  const { data, error } = await resendResult.resend.contacts.create(createPayload);

  if (error) {
    console.error("[newsletter] Resend contact create failed:", error);
    if (isLikelyDuplicateContactError(error)) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    return NextResponse.json({ ok: false, error: "Failed to subscribe" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
