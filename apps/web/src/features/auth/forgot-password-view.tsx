"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/layout/auth-shell";

export function ForgotPasswordView() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  if (sent)
    return (
      <AuthShell
        back="/"
        title="Check your inbox"
        subtitle={
          <>
            We sent a reset link to <span className="font-semibold text-foreground">{email}</span>.
            It expires in 30 minutes.
          </>
        }
      >
        <div className="space-y-3">
          <Link href="/reset-password" className="block">
            <PrimaryButton type="button">I have the link — set a new password</PrimaryButton>
          </Link>
          <button
            onClick={() => setSent(false)}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Use a different email
          </button>
        </div>
      </AuthShell>
    );

  return (
    <AuthShell
      back="/"
      title="Forgot your password?"
      subtitle="Enter the email you signed up with and we'll send you a reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/" className="font-semibold text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <Field
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PrimaryButton type="submit">Send reset link</PrimaryButton>
      </form>
    </AuthShell>
  );
}
