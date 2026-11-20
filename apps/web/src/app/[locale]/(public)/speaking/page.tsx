import type { Metadata } from "next";
import { SpeakingAnalysis } from "@/components/analysis/speaking-analysis";

export const metadata: Metadata = {
  title: "Speaking analysis — linguisticPro",
  description: "See how AI analyses your speaking test answers and recommends where to improve.",
  openGraph: {
    title: "Speaking analysis — linguisticPro",
    description: "See how AI analyses your speaking test answers and recommends where to improve.",
  },
};

export default function Page() {
  return <SpeakingAnalysis />;
}
