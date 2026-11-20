"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "../site/logo";

const nav = [
  { to: "/reading", label: "Reading" },
  { to: "/listening", label: "Listening" },
  { to: "/writing", label: "Writing" },
  { to: "/speaking", label: "Speaking" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} href={n.to} className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === n.to || pathname.startsWith(n.to + "/") ? "text-foreground" : "text-muted-foreground"}`}>{n.label}</Link>
          ))}
        </nav>
        <div className="hidden md:block"><Link href="/contact" className="btn-primary">Start free <ArrowUpRight className="h-4 w-4" /></Link></div>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="container-site flex flex-col gap-3 pb-5 md:hidden">
          {nav.map((n) => <Link key={n.to} href={n.to} onClick={() => setOpen(false)} className="py-1 font-medium">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
