import type { Metadata } from "next";
import { ListeningAnalysis } from "@/components/analysis/listening-analysis";

export const metadata: Metadata = {
  title: "Listening analysis — linguisticPro",
  description: "See how AI analyses your listening test answers and recommends where to improve.",
  openGraph: {
    title: "Listening analysis — linguisticPro",
    description: "See how AI analyses your listening test answers and recommends where to improve.",
  },
};

export default function Page() {
  return <ListeningAnalysis />;
}
