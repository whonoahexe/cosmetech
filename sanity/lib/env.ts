const required = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const projectId = required("NEXT_PUBLIC_SANITY_PROJECT_ID");
export const dataset = required("NEXT_PUBLIC_SANITY_DATASET");
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-04";
