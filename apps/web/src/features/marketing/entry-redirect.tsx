"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { useLearnerStore } from "@/stores/learner-store";

const DESKTOP_QUERY = "(min-width: 768px)";
const SPLASH_MS = 2200;

/**
 * Entry-point routing for `/`:
 *  - signed-out desktop visitors stay on the landing page;
 *  - everyone else is sent on (after the mobile splash) to welcome, onboarding or home.
 */
export function EntryRedirect() {
  const router = useRouter();
  const hydrated = useLearnerStore((s) => s.hydrated);
  const user = useLearnerStore((s) => s.user);
  const onboarded = useLearnerStore((s) => s.onboarded);

  useEffect(() => {
    if (!hydrated) return;
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    if (desktop && !user) return;

    const target = !user ? ROUTES.welcome : !onboarded ? ROUTES.onboarding : ROUTES.home;
    const timer = setTimeout(() => router.replace(target), desktop ? 0 : SPLASH_MS);
    return () => clearTimeout(timer);
  }, [hydrated, user, onboarded, router]);

  return null;
}
