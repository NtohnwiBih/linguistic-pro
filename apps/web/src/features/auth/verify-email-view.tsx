"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AuthShell, PrimaryButton } from "@/components/layout/auth-shell";

export function VerifyEmailView() {
  const email = useSearchParams().get("email") || undefined;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(30);
  const [verified, setVerified] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const set = (i: number, v: string) => {
    const d = v.replace(/\D/g, "");
    if (d.length > 1) {
      const next = d.slice(0, 6).split("");
      setCode([...next, ...Array(6 - next.length).fill("")]);
      refs.current[Math.min(next.length, 5)]?.focus();
      return;
    }
    const n = [...code];
    n[i] = d;
    setCode(n);
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  if (verified)
    return (
      <AuthShell
        icon={<MailOpen className="h-7 w-7" />}
        title="Email verified"
        subtitle="Your account is active. Let's pick your plan."
      >
        <Link href="/" className="block">
          <PrimaryButton type="button">Continue</PrimaryButton>
        </Link>
      </AuthShell>
    );

  return (
    <AuthShell
      back="/sign-up"
      icon={<MailOpen className="h-7 w-7" />}
      title="Verify your email"
      subtitle={
        <>
          Enter the 6-digit code we sent to{" "}
          <span className="font-semibold text-foreground">{email ?? "your email"}</span>.
        </>
      }
      footer={
        <>
          Wrong address?{" "}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Change email
          </Link>
        </>
      }
    >
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.every(Boolean)) setVerified(true);
        }}
      >
        <div className="flex justify-between gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={c}
              inputMode="numeric"
              aria-label={`Digit ${i + 1}`}
              maxLength={6}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus();
              }}
              className="h-14 w-12 rounded-xl border border-input bg-card text-center text-xl font-semibold text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          ))}
        </div>
        <PrimaryButton type="submit" disabled={!code.every(Boolean)}>
          Verify email
        </PrimaryButton>
        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t get it?{" "}
          {cooldown > 0 ? (
            <span>Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={() => setCooldown(30)}
              className="font-semibold text-primary hover:underline"
            >
              Resend code
            </button>
          )}
        </p>
      </form>
    </AuthShell>
  );
}
