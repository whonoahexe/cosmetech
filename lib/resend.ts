import "server-only";
import { Resend } from "resend";

type RequiredResendEnv = {
  apiKey: string;
  fromEmail: string;
};

type ResendEnvResult =
  | {
      ok: true;
      value: RequiredResendEnv;
    }
  | {
      ok: false;
      error: string;
    };

function getEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function getRequiredResendEnv(): ResendEnvResult {
  const apiKey = getEnv("RESEND_API_KEY");
  if (!apiKey) {
    return { ok: false, error: "Missing RESEND_API_KEY" };
  }

  const fromEmail = getEnv("RESEND_FROM_EMAIL");
  if (!fromEmail) {
    return { ok: false, error: "Missing RESEND_FROM_EMAIL" };
  }

  return {
    ok: true,
    value: {
      apiKey,
      fromEmail,
    },
  };
}

export function createResendClient():
  | {
      ok: true;
      resend: Resend;
      fromEmail: string;
    }
  | {
      ok: false;
      error: string;
    } {
  const env = getRequiredResendEnv();
  if (!env.ok) {
    return env;
  }

  return {
    ok: true,
    resend: new Resend(env.value.apiKey),
    fromEmail: env.value.fromEmail,
  };
}

export function getNewsletterSegmentId(): string | undefined {
  const segmentId = getEnv("RESEND_NEWSLETTER_SEGMENT_ID");
  return segmentId || undefined;
}

export function getNewsletterTopicId(): string | undefined {
  const topicId = getEnv("RESEND_NEWSLETTER_TOPIC_ID");
  return topicId || undefined;
}

export function getContactRecipientEmail(): string | undefined {
  const contactRecipient = getEnv("RESEND_CONTACT_TO_EMAIL");
  return contactRecipient || undefined;
}

export function isLikelyDuplicateContactError(error: unknown): boolean {
  const normalized = JSON.stringify(error).toLowerCase();
  return (
    normalized.includes("already exists") ||
    normalized.includes("duplicate") ||
    normalized.includes("conflict")
  );
}
