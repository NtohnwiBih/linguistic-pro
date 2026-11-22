import { z } from "zod";

/**
 * Validation messages are i18n keys under `auth.validation`, not display text.
 * Components translate them, so schemas stay locale-agnostic and shareable with the API.
 */
export type AuthValidationKey =
  | "emailInvalid"
  | "passwordMin6"
  | "passwordMin8"
  | "nameRequired"
  | "passwordsMismatch"
  | "termsRequired";

const email = z
  .string()
  .trim()
  .email("emailInvalid" satisfies AuthValidationKey);

export const signInSchema = z.object({
  email,
  password: z.string().min(6, "passwordMin6" satisfies AuthValidationKey),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "nameRequired" satisfies AuthValidationKey),
    email,
    password: z.string().min(8, "passwordMin8" satisfies AuthValidationKey),
    confirmPassword: z.string(),
    agree: z.boolean().refine((value) => value, "termsRequired" satisfies AuthValidationKey),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordsMismatch" satisfies AuthValidationKey,
  });

export const forgotPasswordSchema = z.object({ email });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
