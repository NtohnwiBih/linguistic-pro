import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms & conditions — linguisticPro",
  description: "The terms for using linguisticPro.",
  openGraph: { title: "Terms & conditions — linguisticPro", description: "The terms for using linguisticPro." },
};

export default function Page() {
  return (
  <LegalPage title="Terms & conditions" updated="November 17, 2026" sections={[
    { h: "Acceptance", p: ["By using linguisticPro you agree to these terms. If you don't agree, please don't use the service."] },
    { h: "Using the service", p: ["You agree to use linguisticPro for personal learning and not to misuse, copy or resell its content."] },
    { h: "Exam preparation", p: ["Our practice materials are modelled on popular exams such as IELTS but are not affiliated with or endorsed by any exam provider. Practice scores are estimates."] },
    { h: "Content", p: ["All lessons, questions and materials belong to linguisticPro or its licensors."] },
    { h: "Liability", p: ["The service is provided as is. We aren't liable for indirect losses arising from its use."] },
    { h: "Changes", p: ["We may update these terms. We'll post the new date at the top of this page."] },
    { h: "Contact", p: ["Questions? Email hello@linguisticpro.com."] },
  ]} />
  );
}
