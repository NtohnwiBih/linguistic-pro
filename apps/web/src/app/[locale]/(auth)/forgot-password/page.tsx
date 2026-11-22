import { ForgotPasswordView } from "@/features/auth/forgot-password-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Get a link to reset your linguisticPro password.",
  openGraph: { title: "Forgot password — linguisticPro", description: "Get a link to reset your linguisticPro password.", type: "website" },
};

export default function Page() {
  return <ForgotPasswordView />;
}
