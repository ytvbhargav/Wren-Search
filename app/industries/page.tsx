import type { Metadata } from "next";
import IndustriesContent from "./IndustriesContent";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Executive search across contract furniture, residential furnishings, commercial lighting, architectural products, hospitality, and design firms. Placements from sales to C-suite.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries — Wren Search",
    description:
      "Where Wren Search works across the contract and residential furnishings industry.",
    url: "/industries",
  },
};

export default function IndustriesPage() {
  return <IndustriesContent />;
}
