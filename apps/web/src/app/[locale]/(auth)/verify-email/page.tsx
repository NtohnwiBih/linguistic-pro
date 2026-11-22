import { VerifyEmailView } from "@/features/auth/verify-email-view";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "Confirm your email to activate your linguisticPro IELTS practice account.",
  openGraph: {
    title: "Verify your email — linguisticPro",
    description: "Confirm your email to activate your linguisticPro IELTS practice account.",
    type: "website",
  },
};

export default function Page() {
  // useSearchParams() in the view needs a Suspense boundary for static prerendering.
  return (
    <Suspense>
      <VerifyEmailView />
    </Suspense>
  );
}
