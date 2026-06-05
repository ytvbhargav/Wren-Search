import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wren Search blends modern recruiting tools with relationship-led executive search across the contract and residential furnishings industry.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Wren Search",
    description:
      "Founded to bridge efficient vs. thoughtful, data-driven vs. instinct. The balance offered is the brand.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
