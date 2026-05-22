"use client";

import WrenMark from "@/components/WrenMark";
import { FadeUp, Eyebrow, PageHero, CtaBand } from "@/components/ui";

const team = [
  {
    name: "Chaz Amidon",
    title: "Founder & Principal",
    location: "Byron Center, Michigan",
    body: [
      "Chaz has spent fifteen years in corporate recruiting and executive search, including eight years leading executive search at The Mav Group (formerly Palladian West) prior to founding Wren.",
      "He founded Wren Search with a vision to create more value for clients in the furnishings industry, where he has worked for the past decade.",
      "Chaz earned his MBA from Loyola University Chicago and his undergraduate degree from Calvin University. He lives in Byron Center, Michigan, with his wife Allie; their three children, Cooper, Isla, and Evangeline; and their bernedoodle, Rocky.",
    ],
  },
  {
    name: "Ashley Myers",
    title: "Vice President of Recruiting",
    location: "Wyoming, Michigan",
    body: [
      "Ashley is a former HR executive with a track record of high-caliber placements across the furnishings industry. Known for her insightful, collaborative approach, she leads searches, client engagements, and the team Wren is building.",
      "She served as an Executive Recruiter at The Mav Group from 2022 to 2026 and held a variety of HR leadership roles, including at Member First Mortgage and Meijer Credit Union.",
      "Ashley is a licensed Predictive Index consultant and SHRM-certified. A graduate of Ferris State University, she lives in Wyoming, Michigan, with her husband Matt, their two children Frankie and Marlowe, and their dogs Loki and Sylvie.",
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
                    <WrenMark
                      bodyColor="#e35438"
                      className="h-1/2 w-auto opacity-90"
                    />
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
