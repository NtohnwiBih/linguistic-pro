"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
import { simulateLatency } from "@/lib/mock";
import { ROUTES } from "@/lib/routes";
import { signUpSchema, type SignUpValues } from "@/schemas/auth";
import { useLearnerStore } from "@/stores/learner-store";
import { useValidationMessage } from "./use-validation-message";
import { useState } from "react";
import { ExamId, IeltsTestType } from "@/lib/exams";
import { Field, PrimaryButton, StrengthMeter } from "@/components/layout/auth-shell";

// TODO: point these at the real legal pages once they exist.
const linkClass = "text-foreground font-semibold underline-offset-2 hover:underline";

export function SignUpForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const mismatch = confirm.length > 0 && confirm !== pw;
  const signIn = useLearnerStore((s) => s.signIn);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", agree: false },
  });
  const password = useWatch({ control, name: "password" });

  const onSubmit = async ({ email, name }: SignUpValues) => {
    await simulateLatency(); // TODO: POST /auth/sign-up
    signIn(email, name);
    router.push(ROUTES.onboarding);
  };

  return (
    <>
      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field label="Full name" required placeholder="Amara Ndiaye" autoComplete="name" />
        <Field
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Field
            label="Password"
            type="password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <StrengthMeter value={pw} />
        </div>
        <Field
          label="Confirm password"
          type="password"
          required
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={mismatch ? "Passwords don't match" : undefined}
        />
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-primary" />
          <span>
            I agree to the{" "}
            <a className="font-medium text-foreground underline-offset-2 hover:underline" href="#">
              Terms
            </a>{" "}
            and{" "}
            <a className="font-medium text-foreground underline-offset-2 hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <PrimaryButton type="submit">Create account</PrimaryButton>
      </form>
    </>
  );
}
