"use client";

import Link from "next/link";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { useState } from "react";

import { AuthShell, Field, PrimaryButton, StrengthMeter } from "@/components/layout/auth-shell";

export function ResetPasswordView() {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const mismatch = confirm.length > 0 && confirm !== pw;

  if (done)
    return (
      <AuthShell
        icon={<CheckCircle2 className="h-7 w-7" />}
        title="Password updated"
        subtitle="You're all set. Sign in with your new password."
      >
        <Link href="/" className="block">
          <PrimaryButton type="button">Go to sign in</PrimaryButton>
        </Link>
      </AuthShell>
    );

  return (
    <AuthShell
      back="/forgot-password"
      title="Set a new password"
      subtitle="Make it at least 8 characters, ideally with a number and a symbol."
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!mismatch && pw.length >= 8) setDone(true);
        }}
      >
        <div>
          <Field
            label="New password"
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
          label="Confirm new password"
          type="password"
          required
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={mismatch ? "Passwords don't match" : undefined}
        />
        <PrimaryButton type="submit">Update password</PrimaryButton>
      </form>
    </AuthShell>
  );
}
