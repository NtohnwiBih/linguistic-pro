import type { Metadata } from "next";
import { SignUpView } from "@/features/auth/sign-up-view";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a linguisticPro account and start practising the IELTS exam.",
  openGraph: { title: "Create your account — linguisticPro", description: "Create a linguisticPro account and start practising the IELTS exam.", type: "website" },
};

export default function Page() {
  return <SignUpView />;
}
