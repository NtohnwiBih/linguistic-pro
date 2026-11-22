"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { Logo } from "../site/logo";

const nav = [
  { to: "/reading", label: "Reading" },
  { to: "/listening", label: "Listening" },
  { to: "/writing", label: "Writing" },
  { to: "/speaking", label: "Speaking" },
] as const;

export function Header() {
  const pathname = usePathname();
  // The menu counts as open only on the page where it was opened,
  // so any navigation closes it automatically.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  const close = () => setOpenAt(null);
  const toggle = () => setOpenAt(open ? null : pathname);
  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                isActive(n.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href={ROUTES.signUp} className="btn-primary">
            Sign Up <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={toggle}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="container-site flex flex-col gap-3 pb-5 md:hidden"
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              onClick={close}
              className={`py-1 font-medium ${
                isActive(n.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link href={ROUTES.signUp} onClick={close} className="btn-primary mt-2 justify-center">
            Sign Up <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      )}
    </header>
  );
}