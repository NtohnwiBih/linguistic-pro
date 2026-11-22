"use client";

import Link from "next/link";
import {
  AuthShell,
  SocialButtons,
} from "@/components/layout/auth-shell";
import { SignUpForm } from "./sign-up-form";

export function SignUpView() {
  return (
    <AuthShell
      back="/"
      title="Create your account"
      subtitle="It takes less than a minute. Your plan comes next."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
      <SocialButtons />
    </AuthShell>
  );
}
