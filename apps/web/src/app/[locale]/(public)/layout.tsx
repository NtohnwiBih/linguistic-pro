import type { ReactNode } from "react";
import { WebsiteShell } from "@/components/layout/website-shell";
import { initPage } from "@/lib/locale";

interface PublicLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  // Layouts render in parallel with pages, so each must set the locale itself
  // (the locale-aware <Link> in WebsiteShell would otherwise force dynamic rendering).
  await initPage(params);
  return <WebsiteShell>{children}</WebsiteShell>;
}
