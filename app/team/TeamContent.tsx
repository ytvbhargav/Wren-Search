"use client";

import Image from "next/image";
import WrenMark from "@/components/WrenMark";
import { FadeUp, Eyebrow, PageHero, CtaBand } from "@/components/ui";

const team = [
  {
    name: "Chaz Amidon",
    title: "Founder and Principal",
    location: "Grand Rapids, Michigan",
    image: "/team/Chaz1.jpeg",
    body: [
      "Chaz has been in corporate recruiting and executive search for a combined 15 years. He founded Wren with a vision to create more value for clients in the furnishings industries, where he has worked for the past decade.",
      "Chaz led executive search at The Mav Group (formerly Palladian West) for eight years prior to founding Wren. He graduated with his MBA from Loyola University Chicago, with an undergraduate degree from Calvin University. He lives in Byron Center, MI, with his wife, Allie; three children, Cooper, Isla and Evangeline; and his bernedoodle Rocky.",
    ],
  },
  {
    name: "Ashley Myers",
    title: "Vice President of Recruiting",
    location: "Grand Rapids, Michigan",
    image: "/team/Ashley1.png",
    body: [
      "Ashley is a former HR executive with a track record of high-caliber placements in the industry. With a strong passion for the industry, Ashley is known for her insightful, collaborative approach. She leads searches, client engagements, and the team Wren is building.",
      "Ashley was an Executive Recruiter at The Mav Group (2022-2026) and served in a variety of prior HR leadership roles, including at Member First Mortgage and Meijer Credit Union. She is a licensed Predictive Index consultant and is SHRM-certified. A graduate of Ferris State University, Ashley lives in Wyoming, MI, with her husband, Matt, her two children, Frankie and Marlowe, and her dogs, Loki and Sylvie.",
    ],
  },
  {
    name: "Hannah Staal",
    title: "Executive Recruiter",
    location: "Grand Rapids, Michigan",
    image: "/team/Hannah1.png",
    body: [
      "Hannah Staal, a talent acquisition leader with 13+ years of experience in executive search, technical recruiting, and building scalable hiring functions, joins Wren as an Executive Recruiter. Known for her strategic, relationship-driven approach, Hannah is particularly passionate about coaching recruitment teams and hiring managers alike to build true partners in the process.",
      "Hannah most recently served as a Talent Acquisition Consultant at Steelcase and previously held progressive leadership roles at Vervint. She is a DDI Targeted Selection Certified Trainer and a graduate of Grand Valley State University. Hannah lives in Grand Rapids, and enjoys spending time outdoors playing sports or hiking with her family.",
    ],
  },
  {
    name: "Molly Boeve",
    title: "Sourcing Manager",
    location: "Grand Rapids, Michigan",
    image: "/team/Molly1.jpg",
    body: [
      "Molly is an experienced recruiting professional with a passion for connecting talented individuals with opportunities that help them thrive. Her passion for connecting people with opportunities, combined with a strategic and relationship-driven approach, has enabled her to contribute to successful hiring outcomes for both growing organizations and established companies.",
      "Outside of work, sports have always been a big part of her life. She loves the energy, competition, and lifelong lessons that sports provide, which translate into her recruiting approach.",
    ],
  },
];

export default function TeamContent() {
  return (
    <main className="bg-eggshell text-brown">
      <PageHero
        eyebrow="Our Team"
        title={
          <>
            Built on people{" "}
            <span className="italic text-orange">who care.</span>
          </>
        }
        body="Wren Search is led by experienced executive search and HR professionals — attentive stewards of every engagement, trusted by the people on both sides of the table."
      />

      {/* Team profiles */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-28 md:space-y-36">
          {team.map((m, i) => (
            <FadeUp key={m.name}>
              <article
                className={`grid md:grid-cols-12 gap-12 md:gap-16 items-start ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="md:col-span-5 [direction:ltr]">
                  <div className="aspect-[4/5] bg-tan/60 rounded-sm flex items-center justify-center relative overflow-hidden">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <WrenMark
                        bodyColor="#e35438"
                        className="h-1/2 w-auto opacity-90"
                      />
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-brown/5" />
                  </div>
                </div>
                <div className="md:col-span-6 md:col-start-7 [direction:ltr]">
                  <h2 className="text-3xl md:text-5xl font-light leading-tight">
                    {m.name}
                  </h2>
                  <div
                    className="mt-3 text-xs text-orange font-semibold uppercase"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {m.title}
                  </div>
                  <div
                    className="mt-1 text-xs text-brown/55 uppercase"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {m.location}
                  </div>
                  <div className="mt-8 space-y-5 text-lg text-brown/80 font-light leading-relaxed">
                    {m.body.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Connect"
        title={
          <>
            Begin a{" "}
            <span className="italic text-orange">conversation.</span>
          </>
        }
        body="Every Wren engagement begins with a conversation. We&apos;d be glad to learn about the role, the leadership you&apos;re building, or the team you&apos;re shaping."
        primary={{ href: "/contact", label: "Connect with Wren" }}
        secondary={{ href: "/approach", label: "How we work" }}
      />
    </main>
  );
}
