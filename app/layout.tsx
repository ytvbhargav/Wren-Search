import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://wrensearch.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wren Search — Executive Search for the Furnishings Industry",
    template: "%s — Wren Search",
  },
  description:
    "Wren Search is an executive search partner for the commercial and residential furnishings industry. Relationship-driven, tech-enabled, grounded in your goals.",
  keywords: [
    "executive search",
    "furnishings industry",
    "contract furniture",
    "residential furnishings",
    "retained search",
    "leadership recruitment",
    "C-suite recruiting",
    "built environment",
    "commercial lighting",
    "architectural products",
    "hospitality furnishings",
  ],
  authors: [{ name: "Wren Search" }],
  creator: "Wren Search",
  publisher: "Wren Search",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Wren Search",
    title: "Wren Search — Executive Search for the Furnishings Industry",
    description:
      "Relationship-led executive search across the commercial and residential furnishings industry. Built on better connections.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wren Search — Built on better connections.",
    description:
      "Executive search across the contract and residential furnishings industry.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Wren Search",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Executive search across the commercial and residential furnishings industry.",
  slogan: "Built on better connections.",
  founder: { "@type": "Person", name: "Chaz Amidon" },
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Executive search",
    "Contract furniture",
    "Residential furnishings",
    "Commercial lighting",
    "Architectural products",
    "Hospitality furnishings",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "chaz@wrensearch.com",
    contactType: "Customer service",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
        <Footer />
      </body>
    </html>
  );
}
