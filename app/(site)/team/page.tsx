import type { Metadata } from "next";
import { getPayloadClient } from "@/src/get-payload";
import TeamContent, { type TeamMember } from "./TeamContent";

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

// Always reflect the latest team edits made in the Payload admin.
export const dynamic = "force-dynamic";

// Shape of a Team document as consumed here (decoupled from generated types).
type MediaDoc = {
  url?: string | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: { portrait?: { url?: string | null } | null } | null;
};

type TeamDoc = {
  name: string;
  title: string;
  location?: string | null;
  email?: string | null;
  photo?: MediaDoc | number | string | null;
  body?: { paragraph: string }[] | null;
};

async function getTeam(): Promise<TeamMember[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "team",
    sort: "order",
    depth: 1,
    limit: 100,
  });

  const docs = result.docs as unknown as TeamDoc[];
  return docs.map((doc) => {
    const photo =
      doc.photo && typeof doc.photo === "object" ? doc.photo : null;
    return {
      name: doc.name,
      title: doc.title,
      location: doc.location ?? "",
      email: doc.email ?? null,
      // Prefer the focal-cropped portrait size; fall back to the original.
      image: photo?.sizes?.portrait?.url ?? photo?.url ?? null,
      focalX: photo?.focalX ?? 50,
      focalY: photo?.focalY ?? 50,
      body: (doc.body ?? []).map((b) => b.paragraph),
    };
  });
}

export default async function TeamPage() {
  const team = await getTeam();

  const teamJsonLd = {
    "@context": "https://schema.org",
    "@graph": team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.title,
      worksFor: { "@type": "Organization", name: "Wren Search" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <TeamContent team={team} />
    </>
  );
}
