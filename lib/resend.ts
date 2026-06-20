import "server-only";
import { Resend } from "resend";

type RequiredResendEnv = {
  apiKey: string;
  fromEmail: string;
};

type RequiredResendApiEnv = {
  apiKey: string;
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

type ResendApiEnvResult =
  | {
      ok: true;
      value: RequiredResendApiEnv;
    }
  | {
      ok: false;
      error: string;
    };

export function getRequiredResendApiEnv(): ResendApiEnvResult {
  const apiKey = getEnv("RESEND_API_KEY");
  if (!apiKey) {
    return { ok: false, error: "Missing RESEND_API_KEY" };
  }

  return {
    ok: true,
    value: {
      apiKey,
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

export function createResendApiClient():
  | {
      ok: true;
      resend: Resend;
    }
  | {
      ok: false;
      error: string;
    } {
  const env = getRequiredResendApiEnv();
  if (!env.ok) {
    return env;
  }

  return {
    ok: true,
    resend: new Resend(env.value.apiKey),
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
  const contactRecipient = getEnv("RESEND_CONTACT_TO_EMAIL") || getEnv("CONTACT_TO_EMAIL");
  return contactRecipient || undefined;
}

export function isLikelyDuplicateContactError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const typedError = error as {
    message?: unknown;
    name?: unknown;
    statusCode?: unknown;
  };

  if (typedError.statusCode === 409) return true;

  const normalized = [typedError.name, typedError.message]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

  return (
    normalized.includes("already exists") ||
    normalized.includes("duplicate") ||
    normalized.includes("conflict")
  );
}
