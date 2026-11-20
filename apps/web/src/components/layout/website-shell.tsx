import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

/** Public marketing frame: header, footer and a main landmark. */
export function WebsiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-dvh">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
