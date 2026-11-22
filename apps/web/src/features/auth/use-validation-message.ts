"use client";

import type { FieldError } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { AuthValidationKey } from "@/schemas/auth";

/** Returns a function that turns a react-hook-form error into translated text. */
export function useValidationMessage() {
  const t = useTranslations("auth.validation");

  return (error: FieldError | undefined): string | undefined =>
    error?.message ? t(error.message as AuthValidationKey) : undefined;
}
