import type { Metadata } from "next";
import { ReadingAnalysis } from "@/components/analysis/reading-analysis";

export const metadata: Metadata = {
  title: "Reading analysis — linguisticPro",
  description: "See how AI analyses your reading test answers and recommends where to improve.",
  openGraph: {
    title: "Reading analysis — linguisticPro",
    description: "See how AI analyses your reading test answers and recommends where to improve.",
  },
};

export default function Page() {
  return <ReadingAnalysis />;
}
