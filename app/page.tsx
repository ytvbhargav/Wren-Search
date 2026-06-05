import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  description:
    "Executive search for the commercial and residential furnishings industry. Fifteen years of retained search across the built environment.",
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
