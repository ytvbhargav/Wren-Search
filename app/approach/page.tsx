import type { Metadata } from "next";
import ApproachContent from "./ApproachContent";

export const metadata: Metadata = {
  title: "Our Executive Search Approach",
  description:
    "Industry expertise, AI-assisted sourcing, and a relationship-led process. How Wren Search runs every executive search.",
  alternates: { canonical: "/approach" },
  openGraph: {
    title: "Our Approach — Wren Search",
    description:
      "Tech-enabled, relationship-driven, grounded in your goals. The Wren executive search process.",
    url: "/approach",
  },
};

export default function ApproachPage() {
  return <ApproachContent />;
}
