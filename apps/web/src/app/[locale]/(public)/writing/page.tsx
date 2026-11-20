import type { Metadata } from "next";
import { WritingAnalysis } from "@/components/analysis/writing-analysis";

export const metadata: Metadata = {
  title: "Writing analysis — linguisticPro",
  description: "See how AI analyses your writing test answers and recommends where to improve.",
  openGraph: {
    title: "Writing analysis — linguisticPro",
    description: "See how AI analyses your writing test answers and recommends where to improve.",
  },
};

export default function Page() {
  return <WritingAnalysis />;
}
