import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().min(1).default("/api"),
});

// Each variable must be referenced literally so Next.js can inline it in client bundles.
export const env = schema.parse({
  NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"] || undefined,
  NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"] || undefined,
});
