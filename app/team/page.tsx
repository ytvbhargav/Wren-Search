import type { Metadata } from "next";
import TeamContent from "./TeamContent";

export const metadata: Metadata = {
  title: "Meet Our Executive Search Team",
  description:
    "Meet Wren Search: Chaz Amidon, Founder and Principal, and Ashley Myers, VP of Recruiting — executive search for the furnishings industry.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team — Wren Search",
    description:
      "The leaders behind Wren Search — built on experience, judgment, and care.",
    url: "/team",
  },
};

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Chaz Amidon",
      jobTitle: "Founder and Principal",
      worksFor: { "@type": "Organization", name: "Wren Search" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Loyola University Chicago" },
        { "@type": "CollegeOrUniversity", name: "Calvin University" },
      ],
    },
    {
      "@type": "Person",
      name: "Ashley Myers",
      jobTitle: "Vice President of Recruiting",
      worksFor: { "@type": "Organization", name: "Wren Search" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Ferris State University" },
    },
  ],
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <TeamContent />
    </>
  );
}
