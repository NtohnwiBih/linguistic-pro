"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Field, PrimaryButton, StrengthMeter } from "@/components/layout/auth-shell";
import { Link, useRouter } from "@/i18n/navigation";
import { simulateLatency } from "@/lib/mock";
import { ROUTES } from "@/lib/routes";
import { signUpSchema, type SignUpValues } from "@/schemas/auth";
import { useLearnerStore } from "@/stores/learner-store";
import { useValidationMessage } from "./use-validation-message";

const linkClass = "font-medium text-foreground underline-offset-2 hover:underline";

export function SignUpForm() {
  const router = useRouter();
  const signIn = useLearnerStore((s) => s.signIn);
  const message = useValidationMessage();

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
    await simulateLatency(); // TODO: POST /auth/register
    signIn(email, name);
    router.push(ROUTES.onboarding);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        label="Full name"
        placeholder="Amara Ndiaye"
        autoComplete="name"
        error={message(errors.name)}
        {...register("name")}
      />
      <Field
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={message(errors.email)}
        {...register("email")}
      />
      <div>
        <Field
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={message(errors.password)}
          {...register("password")}
        />
        <StrengthMeter value={password} />
      </div>
      <Field
        label="Confirm password"
        type="password"
        placeholder="Repeat password"
        autoComplete="new-password"
        error={message(errors.confirmPassword)}
        {...register("confirmPassword")}
      />

      <div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-primary"
            {...register("agree")}
          />
          <span>
            I agree to the{" "}
            <Link className={linkClass} href="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link className={linkClass} href="/privacy">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.agree && (
          <p className="mt-1 text-sm text-destructive">{message(errors.agree)}</p>
        )}
      </div>

      <PrimaryButton type="submit" loading={isSubmitting}>
        Create account
      </PrimaryButton>
    </form>
  );
}