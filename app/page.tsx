import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Wren Search — Built on better connections.",
  description:
    "Executive search across the commercial and residential furnishings industry. Relationship-driven, tech-enabled, grounded in your goals. Fifteen years of retained executive search across the built environment.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wren Search — Built on better connections.",
    description:
      "Executive search across the commercial and residential furnishings industry.",
    url: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
