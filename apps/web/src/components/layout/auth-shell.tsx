"use client";

import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Languages } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";

import { EXAMS, IELTS_TEST_TYPES, type ExamId, type IeltsTestType } from "@/lib/exams";
import { Logo } from "../site/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  back,
  icon,
}: {
  title: string;
  subtitle?: ReactNode | undefined;
  children: ReactNode;
  footer?: ReactNode;
  back?: "/" | "/sign-up" | "/forgot-password";
  icon?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-brand p-12 lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div className="max-w-md animate-rise">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">IELTS · Academic · General Training</p>
          <h2 className="text-5xl leading-[1.05] text-foreground pr-12">Practise the real test, one skill at a time.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Full-length Listening, Reading, Writing and Speaking practice, with band-score feedback after every session.
          </p>
        </div>
        <figure className="max-w-md rounded-2xl border border-border/60 bg-background/40 p-6 backdrop-blur">
          <blockquote className="text-foreground">
            “I went from band 5.5 to 7.0 in ten weeks of daily practice.”
          </blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">Amara N. — IELTS Academic, band 7.0</figcaption>
        </figure>
      </aside>

      <main className="flex flex-col px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          {back ? (
            <Link
              href={back}
              aria-label="Go back"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
          <div className="lg:hidden"><Logo /></div>
          <span className="w-10" />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10 animate-rise">
          {icon && (
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">{icon}</div>
          )}
          <h1 className="text-4xl text-foreground">{title}</h1>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
        {footer && <p className="text-center text-sm text-muted-foreground">{footer}</p>}
      </main>
    </div>
  );
}

export function Field({
  label,
  error,
  hint,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined; hint?: ReactNode }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
        {label}
        {hint}
      </span>
      <span className="relative block">
        <input
          {...props}
          type={isPw && show ? "text" : type}
          aria-invalid={!!error}
          className="h-12 w-full rounded-xl border border-input bg-card px-4 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive"
        />
        {isPw && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </span>
      {error && <span className="mt-1.5 block text-sm text-destructive">{error}</span>}
    </label>
  );
}

export function PrimaryButton({ children, loading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

export function SocialButtons() {
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Google", "Apple"].map((p) => (
          <button key={p} type="button" className="h-11 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition hover:border-primary">
            Continue with {p}
          </button>
        ))}
      </div>
    </>
  );
}

export function passwordStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function StrengthMeter({ value }: { value: string }) {
  const s = passwordStrength(value);
  const labels = ["Too short", "Weak", "Okay", "Good", "Strong"];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-1 flex-1 rounded-full ${i < s ? (s >= 3 ? "bg-success" : "bg-accent") : "bg-border"}`} />
        ))}
      </div>
      {value && <p className="mt-1 text-xs text-muted-foreground">{labels[s]}</p>}
    </div>
  );
}

export function ExamPicker({ value, onChange }: { value: ExamId; onChange: (id: ExamId) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-foreground">Which exam are you preparing for?</legend>
      <div className="grid grid-cols-2 gap-2">
        {EXAMS.map((exam) => {
          const selected = exam.id === value;
          return (
            <button
              key={exam.id}
              type="button"
              disabled={!exam.available}
              onClick={() => {
                if (exam.available) onChange(exam.id);
              }}
              aria-pressed={selected}
              className={`rounded-xl border px-3 py-2.5 text-left transition ${
                selected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground"
              } ${exam.available ? "hover:border-primary" : "cursor-not-allowed opacity-50"}`}
            >
              <span className="block text-sm font-semibold">{exam.name}</span>
              <span className="block text-xs text-muted-foreground">{exam.available ? exam.note : "Coming soon"}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function TestTypePicker({ value, onChange }: { value: IeltsTestType; onChange: (t: IeltsTestType) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-foreground">Which IELTS are you taking?</legend>
      <div className="grid grid-cols-2 gap-2">
        {IELTS_TEST_TYPES.map((t) => {
          const selected = t === value;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              aria-pressed={selected}
              className={`h-11 rounded-xl border text-sm font-medium transition ${
                selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-primary"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
