"use client";

import { useState } from "react";

const field = "w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-secondary p-10">
        <h2 className="text-2xl font-semibold">Thanks — message received!</h2>
        <p className="mt-2 text-muted-foreground">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4 rounded-2xl border border-border bg-card p-8 shadow-soft"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Name" className={field} />
        <input required type="email" placeholder="Email" className={field} />
      </div>
      <input placeholder="Subject" className={field} />
      <textarea required rows={6} placeholder="Your message" className={field} />
      <button className="btn-primary justify-self-start">Send message</button>
    </form>
  );
}
