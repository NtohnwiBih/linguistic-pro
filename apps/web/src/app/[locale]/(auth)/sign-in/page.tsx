import type { Metadata } from "next";

import { SignInView } from "@/features/auth/sign-in-view";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to linguisticPro and continue your IELTS exam practice.",
  openGraph: {
    title: "Sign in — linguisticPro",
    description: "Sign in to linguisticPro and continue your IELTS exam practice.",
    type: "website",
  },
};

export default function Page() {
  return <SignInView />;
}
