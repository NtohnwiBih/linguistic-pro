import { OnboardingFlow } from "@/features/onboarding/onboarding-flow";
import { initPage } from "@/lib/locale";
import { type LocalePageProps } from "@/lib/metadata";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Start your journey — linguisticPro",
  description: "Tell us your goals and we'll build your personal IELTS study plan.",
  openGraph: {
    title: "Set up your plan — linguisticPro",
    description: "Build your personal IELTS study plan.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default async function OnboardingPage({ params }: LocalePageProps) {
  await initPage(params);
  return <OnboardingFlow />;
}
