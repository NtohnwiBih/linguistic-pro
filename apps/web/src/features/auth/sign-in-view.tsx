"use client";

import Link from "next/link";

import { AuthShell, SocialButtons } from "@/components/layout/auth-shell";
import { SignInForm } from "./sign-in-form";

export function SignInView() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Pick up your IELTS prep where you left off."
      footer={
        <>
          New to linguisticPro?{" "}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <SignInForm />
      <SocialButtons />
    </AuthShell>
  );
}
