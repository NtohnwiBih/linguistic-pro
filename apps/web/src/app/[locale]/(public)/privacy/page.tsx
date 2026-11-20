import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy — linguisticPro",
  description: "How linguisticPro collects, uses and protects your information.",
  openGraph: { title: "Privacy policy — linguisticPro", description: "How linguisticPro handles your information." },
};

export default function Page() {
  return (
  <LegalPage title="Privacy policy" updated="November 17, 2026" sections={[
    { h: "Who we are", p: ["linguisticPro provides online language practice. This policy explains what information we handle when you use our website."] },
    { h: "Information you give us", p: ["When you send a message through our contact form, you share your name, email address and message so we can reply."] },
    { h: "Visitor analytics", p: ["Our site may use Lovable's built-in visitor analytics. It uses no cookies, stores nothing on your device, doesn't keep IP addresses and doesn't identify visitors. Lovable collects this data for us. Lovable's privacy policy (lovable.dev/privacy) explains how it handles it."], list: ["Pages visited and where visitors came from", "Country, browser, operating system and device type", "Time on page, page load speed and errors"] },
    { h: "Retention", p: ["Detailed analytics data is kept for 90 days and daily summaries for a year. Contact messages are kept only as long as needed to respond."] },
    { h: "Your rights", p: ["You can ask us to access, correct or delete information you've shared with us by emailing hello@linguisticpro.com."] },
  ]} />
  );
}
