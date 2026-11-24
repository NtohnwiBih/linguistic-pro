"use client";

import { useEffect, type ReactNode } from "react";
import { AppLoader } from "@/components/layout/app-loader";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { useLearnerStore } from "@/stores/learner-store";

/**
 * Client-side route guard for the prototype session in localStorage.
 *
 * This is NOT a security boundary. When real authentication lands, enforce access in
 * `proxy.ts` / server layouts using the session cookie, and keep this only for UX.
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hydrated = useLearnerStore((s) => s.hydrated);
  const user = useLearnerStore((s) => s.user);

  useEffect(() => {
    if (hydrated && !user) router.replace(ROUTES.welcome);
  }, [hydrated, user, router]);

  if (!hydrated || !user) return <AppLoader />;
  return <>{children}</>;
}
