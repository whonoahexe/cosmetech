import { NextResponse } from "next/server";
import {
  createResendApiClient,
  createResendClient,
  getContactRecipientEmail,
  getNewsletterSegmentId,
  getNewsletterTopicId,
  isLikelyDuplicateContactError,
} from "@/lib/resend";

type NewsletterRequestBody = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
};

const MAX_NAME_LENGTH = 120;
const MAX_COMPANY_LENGTH = 160;
const MAX_PHONE_LENGTH = 40;

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function notifyNewsletterSignup({
  name,
  company,
  email,
  phone,
}: {
  name: string;
  company: string;
  email: string;
  phone: string;
}) {
  const recipientEmail = getContactRecipientEmail();
  if (!recipientEmail) return;

  const resendResult = createResendClient();
  if (!resendResult.ok) {
    console.error(
      "[newsletter] Failed to initialize Resend client for notification:",
      resendResult.error
    );
    return;
  }

  const rows = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Contact Number", phone || "-"],
  ];

  const { error } = await resendResult.resend.emails.send({
    from: resendResult.fromEmail,
    to: [recipientEmail],
    replyTo: email,
    subject: `New newsletter signup from ${name}`,
    html: `
      <h2>New newsletter popup signup</h2>
      ${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
    `,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
  });

  if (error) {
    console.error("[newsletter] Resend notification email failed:", error);
  }
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

  const name = toTrimmedString(body.name);
  const company = toTrimmedString(body.company);
  const email = toTrimmedString(body.email).toLowerCase();
  const phone = toTrimmedString(body.phone);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    company.length > MAX_COMPANY_LENGTH ||
    phone.length > MAX_PHONE_LENGTH
  ) {
    return NextResponse.json({ ok: false, error: "Input too long" }, { status: 400 });
  }

  const resendResult = createResendApiClient();
  if (!resendResult.ok) {
    console.error("[newsletter] Failed to initialize Resend client:", resendResult.error);
    return NextResponse.json({ ok: false, error: resendResult.error }, { status: 500 });
  }

  const newsletterSegmentId = getNewsletterSegmentId();
  const newsletterTopicId = getNewsletterTopicId();

  const [firstName, ...lastNameParts] = name ? name.split(/\s+/) : [];

  const createPayload: {
    email: string;
    unsubscribed: false;
    firstName?: string;
    lastName?: string;
    segments?: { id: string }[];
    topics?: { id: string; subscription: "opt_in" }[];
  } = {
    email,
    unsubscribed: false,
  };

  if (firstName) {
    createPayload.firstName = firstName;
  }

  if (lastNameParts.length > 0) {
    createPayload.lastName = lastNameParts.join(" ");
  }

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

  if (name || company || phone) {
    await notifyNewsletterSignup({ name, company, email, phone });
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
