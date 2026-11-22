import { ResetPasswordView } from "@/features/auth/reset-password-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your linguisticPro account.",
  openGraph: { title: "Set a new password — linguisticPro", description: "Choose a new password for your linguisticPro account.", type: "website" },
};

export default function Page() {
  return <ResetPasswordView />;
}
