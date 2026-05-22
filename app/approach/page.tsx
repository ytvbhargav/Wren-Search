import type { Metadata } from "next";
import ApproachContent from "./ApproachContent";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Wren Search combines industry expertise with AI-assisted sourcing and a relationship-led process. Every search begins with conversation and includes a Performance Snapshot.",
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
