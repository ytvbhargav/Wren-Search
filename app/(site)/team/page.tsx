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
    "image": "/team/Chaz1.webp",
    "focalX": 50,
    "focalY": 30,
    "body": [
      "With 15 combined years in corporate recruiting and executive search, Chaz founded Wren to create more value for clients in the furnishings industries, where he has spent the past decade.",
      "Before founding Wren, Chaz led executive search at The Mav Group (formerly Palladian West) for eight years. He earned his MBA from Loyola University Chicago and his undergraduate degree from Calvin University. He lives in Byron Center, MI, with his wife, Allie; their three children, Cooper, Isla and Evangeline; and their bernedoodle, Rocky."
    ]
  },
  {
    "name": "Ashley Myers",
    "title": "Vice President of Recruiting",
    "location": "Grand Rapids, Michigan",
    "email": "Ashley@wrensearch.com",
    "image": "/team/Ashley1.webp",
    "focalX": 50,
    "focalY": 30,
    "body": [
      "A former HR executive, Ashley has a track record of high-caliber placements in the furnishings industry. She brings an insightful, collaborative approach and real enthusiasm for the work, and she leads searches, client engagements, and the growth of Wren's team.",
      "Ashley was previously an Executive Recruiter at The Mav Group (2022–2026) and held several HR leadership roles, including at Member First Mortgage and Meijer Credit Union. She is a licensed Predictive Index consultant and SHRM-certified. A Ferris State University graduate, she lives in Wyoming, MI, with her husband, Matt; their two children, Frankie and Marlowe; and their dogs, Loki and Sylvie."
    ]
  },
  {
    "name": "Molly Boeve",
    "title": "Sourcing Manager",
    "location": "Grand Rapids, Michigan",
    "email": "Molly@wrensearch.com",
    "image": "/team/Molly1.webp",
    "focalX": 50,
    "focalY": 30,
    "body": [
      "Molly is an experienced recruiting professional who loves helping talented people find opportunities where they can grow. Pairing strategic thinking with a genuine interest in people, she has contributed to successful hires for both growing organizations and established companies.",
      "Outside of work, sports have always been a big part of Molly's life. The energy, competition, and lifelong lessons she's taken from them carry straight into how she recruits."
    ]
  },
  {
    "name": "Jeannie Masciola",
    "title": "Executive Recruiter",
    "location": "Chicago, Illinois",
    "email": "Jeannie@wrensearch.com",
    "image": "/team/Jeannie.webp",
    "focalX": 50,
    "focalY": 50,
    "body": [
      "Jeannie Masciola brings 15 years of experience in consultative sales, business development, and relationship management to her role as an Executive Recruiter at Wren Search. Specializing in residential home furnishings, she focuses on matching exceptional sales talent with industry-leading organizations, building durable partnerships that set people up for long-term success. Before Wren, she held sales leadership and business development roles with leading companies in luxury beauty, building products, and design. Outside of work, Jeannie loves to travel and spend time with friends and family."
    ]
  },
  {
    "name": "Lauren Fenech",
    "title": "Executive Recruiter",
    "location": "Grand Rapids, Michigan",
    "email": "Lauren@wrensearch.com",
    "image": "/team/Lauren.webp",
    "focalX": 50,
    "focalY": 50,
    "body": [
      "Lauren is a driven executive recruiter with six years of experience matching strong candidates with the right opportunities. She holds a bachelor's degree in HR Management and brings a positive mindset and a personal touch to every search. Lauren is committed to delivering diverse candidate slates and finding outcomes that work for everyone at the table. She believes thoughtful career pathing can elevate people's lives, and she finds meaning in helping them land roles where they can do their best work."
    ]
  },
  {
    "name": "Brooke Strickland",
    "title": "Executive Recruiter",
    "location": "Vancouver, Washington",
    "email": "brooke@wrensearch.com",
    "image": "/team/Brooke.webp",
    "focalX": 50,
    "focalY": 50,
    "body": [
      "After a decade as a top-performing sales leader in commercial architecture and design, Brooke Strickland now brings that experience to Wren Search as an Executive Recruiter. Genuine relationships and real market knowledge shape every search she leads. She takes pride in pairing exceptional talent with the companies she knows well, giving clients and candidates a true edge in finding the right fit. Outside of work, Brooke heads out on all sorts of adventures with her husband and two small children from their home base in the Pacific Northwest."
    ]
  },
  {
    "name": "Krista Yetzke",
    "title": "Sourcing Specialist",
    "location": "Grand Rapids, Michigan",
    "email": "krista@wrensearch.com",
    "image": "/team/Krista.webp",
    "focalX": 50,
    "focalY": 15,
    "body": [
      "As Wren's Sourcing Specialist, Krista is driven by keen curiosity and the thrill of the hunt. She takes great satisfaction in finding the needle in the haystack: the outlier, the wren. With more than a decade of sourcing experience in office furniture and A&D, she partners closely with the recruiting team in the search for the perfect fit.",
      "Outside of sourcing, Krista loves being outdoors, whether that's fishing with family, foraging, or following any path that lets her soak in God's creation."
    ]
  },
  {
    "name": "Dominic Samuels",
    "title": "Executive Recruiter",
    "location": "Grand Rapids, Michigan",
    "email": "dominic@wrensearch.com",
    "image": "/team/Dominic.webp",
    "focalX": 50,
    "focalY": 20,
    "body": [
      "After more than 20 years in business development, sales leadership, coaching, and relationship management, Dominic Samuels brings a consultative, listen-first approach to executive search as an Executive Recruiter at Wren. Throughout his career, he has earned a reputation for building trust, understanding what motivates people and organizations, and guiding both through important decisions. He starts every search by learning what matters most, then makes connections that help leaders and organizations succeed.",
      "Outside of work, Dominic is an avid pilot who loves the challenge of aviation and the constant learning it brings. When he's not flying, he spends his time with his two children, sharing new adventures together."
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
