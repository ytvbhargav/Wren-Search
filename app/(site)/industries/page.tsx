import type { Metadata } from "next";
import IndustriesContent from "./IndustriesContent";

export const metadata: Metadata = {
  title: "Furnishings Industries We Serve",
  description:
    "Executive search in contract furniture, residential furnishings, commercial lighting, architectural products, and hospitality.",
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
