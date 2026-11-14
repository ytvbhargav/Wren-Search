import type { Metadata } from "next";
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

// Team content lives here (not in the CMS) while there is no S3 bucket for
// media. Photos are served from /public/team.
const team: TeamMember[] = [
  {
    "name": "Chaz Amidon",
    "title": "Founder and Principal",
    "location": "Grand Rapids, Michigan",
    "email": "Chaz@wrensearch.com",
    "image": "/team/Chaz1.jpeg",
    "focalX": 50,
    "focalY": 30,
    "body": [
      "Chaz has been in corporate recruiting and executive search for a combined 15 years. He founded Wren with a vision to create more value for clients in the furnishings industries, where he has worked for the past decade.",
      "Chaz led executive search at The Mav Group (formerly Palladian West) for eight years prior to founding Wren. He graduated with his MBA from Loyola University Chicago, with an undergraduate degree from Calvin University. He lives in Byron Center, MI, with his wife, Allie; three children, Cooper, Isla and Evangeline; and his bernedoodle Rocky."
    ]
  },
  {
    "name": "Ashley Myers",
    "title": "Vice President of Recruiting",
    "location": "Grand Rapids, Michigan",
    "email": "Ashley@wrensearch.com",
    "image": "/team/Ashley1.png",
    "focalX": 50,
    "focalY": 30,
    "body": [
      "Ashley is a former HR executive with a track record of high-caliber placements in the industry. With a strong passion for the industry, Ashley is known for her insightful, collaborative approach. She leads searches, client engagements, and the team Wren is building.",
      "Ashley was an Executive Recruiter at The Mav Group (2022-2026) and served in a variety of prior HR leadership roles, including at Member First Mortgage and Meijer Credit Union. She is a licensed Predictive Index consultant and is SHRM-certified. A graduate of Ferris State University, Ashley lives in Wyoming, MI, with her husband, Matt, her two children, Frankie and Marlowe, and her dogs, Loki and Sylvie."
    ]
  },
  {
    "name": "Molly Boeve",
    "title": "Sourcing Manager",
    "location": "Grand Rapids, Michigan",
    "email": "Molly@wrensearch.com",
    "image": "/team/Molly1.jpg",
    "focalX": 50,
    "focalY": 30,
    "body": [
      "Molly is an experienced recruiting professional with a passion for connecting talented individuals with opportunities that help them thrive. Her passion for connecting people with opportunities, combined with a strategic and relationship-driven approach, has enabled her to contribute to successful hiring outcomes for both growing organizations and established companies.",
      "Outside of work, sports have always been a big part of her life. She loves the energy, competition, and lifelong lessons that sports provide, which translate into her recruiting approach."
    ]
  },
  {
    "name": "Jeannie Masciola",
    "title": "Executive Recruiter",
    "location": "Chicago, Illinois",
    "email": "Jeannie@wrensearch.com",
    "image": "/team/Jeannie.jpeg",
    "focalX": 50,
    "focalY": 50,
    "body": [
      "Jeannie Masciola joins Wren Search as an Executive Recruiter with 15 years of experience in consultative sales, business development, and relationship management. Specializing in the residential home furnishings industry, she is passionate about connecting exceptional sales talent with industry-leading organizations. Known for her collaborative, relationship-driven approach, Jeannie builds lasting partnerships and helps clients and candidates achieve long term success. \n\nPrior to joining Wren Search, she held sales leadership and business development roles with leading companies in the luxury beauty, building products and design industries. Outside of work, Jeannie enjoys traveling and spending time with friends and family."
    ]
  },
  {
    "name": "Lauren Fenech",
    "title": "Executive Recruiter",
    "location": "Grand Rapids, Michigan",
    "email": "Lauren@wrensearch.com",
    "image": "/team/Lauren.png",
    "focalX": 50,
    "focalY": 50,
    "body": [
      "Lauren is a driven executive recruiter with 6 years of experience connecting top talent with the right opportunities. She holds a bachelor's degree in HR Management and brings a relationship-driven approach and a positive mindset to every search. She is passionate about delivering diverse slates of candidates and finding the best outcomes for both candidates and clients. She believes in elevating others' lives through thoughtful career pathing and helping people find roles where they can truly thrive."
    ]
  },
  {
    "name": "Brooke Strickland",
    "title": "Executive Recruiter",
    "location": "Vancouver, Washington",
    "email": "brooke@wrensearch.com",
    "image": "/team/Brooke.jpeg",
    "focalX": 50,
    "focalY": 50,
    "body": [
      "Brooke Strickland joins Wren Search as an Executive Recruiter, bringing a decade of experience as a top-performing sales leader in the commercial architecture and design industry. She is known for building genuine relationships and bringing real market knowledge to every search, enabling her to create partnerships built to last. Brooke is passionate about connecting exceptional talent with the corporations she knows well, giving both clients and candidates a true edge in finding the right fit.\n\nOutside of work, Brooke enjoys going on all sorts of adventures with her husband and two small children from their home base in the Pacific Northwest."
    ]
  }
];

export default function TeamPage() {
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
