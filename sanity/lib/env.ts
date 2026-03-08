const required = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const projectId = "upki2e2x";
export const dataset = "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-04";
