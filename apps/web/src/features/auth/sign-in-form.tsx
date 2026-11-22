"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, PrimaryButton } from "@/components/layout/auth-shell";
import { Link, useRouter } from "@/i18n/navigation";
import { simulateLatency } from "@/lib/mock";
import { ROUTES } from "@/lib/routes";
import { signInSchema, type SignInValues } from "@/schemas/auth";
import { useLearnerStore } from "@/stores/learner-store";

export function SignInForm() {
  const router = useRouter();
  const signIn = useLearnerStore((s) => s.signIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email }: SignInValues) => {
    await simulateLatency(); // TODO: POST /auth/sign-in
    signIn(email);
    router.push(useLearnerStore.getState().onboarded ? ROUTES.home : ROUTES.onboarding);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field label="Email" type="email" required placeholder="you@example.com" autoComplete="email" />
        <Field
          label="Password"
          type="password"
          required
          placeholder="Your password"
          autoComplete="current-password"
          hint={
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot?
            </Link>
          }
        />
      <PrimaryButton type="submit" loading={isSubmitting}>
        Sign in
      </PrimaryButton>
    </form>
  );
}