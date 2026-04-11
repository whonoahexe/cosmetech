import { NextResponse } from "next/server";
import { createResendClient, getContactRecipientEmail } from "@/lib/resend";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 3000;

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

export async function POST(req: Request) {
  let body: ContactRequestBody;

  try {
    body = (await req.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const website = toTrimmedString(body.website);
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const name = toTrimmedString(body.name);
  const email = toTrimmedString(body.email).toLowerCase();
  const message = toTrimmedString(body.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ ok: false, error: "Input too long" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
  }

  const recipientEmail = getContactRecipientEmail();
  if (!recipientEmail) {
    return NextResponse.json(
      { ok: false, error: "Missing RESEND_CONTACT_TO_EMAIL" },
      { status: 500 }
    );
  }

  const resendResult = createResendClient();
  if (!resendResult.ok) {
    return NextResponse.json({ ok: false, error: resendResult.error }, { status: 500 });
  }

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const { data, error } = await resendResult.resend.emails.send({
    from: resendResult.fromEmail,
    to: [recipientEmail],
    replyTo: email,
    subject: `New contact submission from ${name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> ${escapedEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${escapedMessage}</p>
    `,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
