import { AmbientColor } from "@/components/ambient-color";
import { ContactForm } from "@/components/contact-form";
import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Tools } from "@/components/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | CambioML",
  description:
    "CambioML is an all in on marketing automation platform that handles emails, tasks tracking, social media management and everything in between.",
  openGraph: {
    images: ["https://cambioml.ai/banner.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <ContactForm />
    </div>
  );
}
