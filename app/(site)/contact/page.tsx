import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Our Furnishings Recruiters",
  description:
    "Contact Wren Search to start an executive search in the commercial and residential furnishings industry. Based in Michigan, working nationally.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Wren Search",
    description:
      "Start a conversation with Wren Search about your next executive hire.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
