import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact — linguisticPro",
  description: "Get in touch with the linguisticPro team.",
  openGraph: { title: "Contact — linguisticPro", description: "Questions, feedback or partnerships — we'd love to hear from you." },
};

const info = [
  { Icon: Mail, title: "Email", text: "hello@linguisticpro.com" },
  { Icon: MessageCircle, title: "Support", text: "support@linguisticpro.com" },
  { Icon: MapPin, title: "Office", text: "Douala, Cameroon" },
];

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk." intro="Questions, feedback or partnerships — we usually reply within one working day." />
      <section className="container-site grid gap-12 py-20 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {info.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span><div><p className="font-semibold">{title}</p><p className="text-muted-foreground">{text}</p></div></div>
          ))}
        </div>
        <ContactForm />
      </section>
    </>
  );
}
