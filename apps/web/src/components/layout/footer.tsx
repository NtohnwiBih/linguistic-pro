import Link from "next/link";
import { FooterControls } from "./footer-controls";
import { Logo } from "../site/logo";

const cols = [
  { h: "Practice", l: [["/reading", "Reading"], ["/listening", "Listening"], ["/writing", "Writing"], ["/speaking", "Speaking"]] },
  { h: "Company", l: [["/blog", "Blog"], ["/careers", "Careers"], ["/contact", "Contact"]] },
  { h: "Legal", l: [["/privacy", "Privacy policy"], ["/terms", "Terms & conditions"]] },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-footer-foreground">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="[&_span]:text-footer-foreground"><Logo /></div>
          <p className="max-w-xs text-sm opacity-70">Purposeful language practice for every skill. English today, more languages soon.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest opacity-60">{c.h}</p>
            <ul className="space-y-2 text-sm">
              {c.l.map(([to, label]) => <li key={to}><Link href={to} className="opacity-80 hover:opacity-100">{label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-site flex flex-col items-start justify-between gap-4 border-t border-footer-foreground/10 py-6 md:flex-row md:items-center">
        <p className="text-xs opacity-60">© 2026 linguisticPro. All rights reserved.</p>
        <FooterControls />
      </div>
    </footer>
  );
}
