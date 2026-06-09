"use client";

import Image from "next/image";
import WrenMark from "@/components/WrenMark";
import { FadeUp, PageHero, CtaBand } from "@/components/ui";

export type TeamMember = {
  name: string;
  title: string;
  location: string;
  email: string | null;
  image: string | null;
  focalX: number;
  focalY: number;
  body: string[];
};

// Optical left-alignment for the large name heading: capital letters have
// different left side-bearings, so a single margin can't align them all. "A"
// (legs reach the edge) needs the least pull; round/stem letters sit more inset.
// Each value is a negative em margin applied to the heading so the name's visual
// left edge lines up with the role/email/location text below it.
const LEADING_NUDGE: Record<string, string> = {
  A: "-0.04em",
  J: "-0.04em",
  T: "-0.05em",
  V: "-0.05em",
  W: "-0.05em",
  X: "-0.05em",
  Y: "-0.05em",
};
const ROUND_LETTERS = new Set(["C", "G", "O", "Q", "S"]);

function leadingNudge(name: string): string {
  const first = name.trim().charAt(0).toUpperCase();
  if (LEADING_NUDGE[first]) return LEADING_NUDGE[first];
  if (ROUND_LETTERS.has(first)) return "-0.07em";
  // Flat-stem and most other capitals (B D E F H I K L M N P R U Z, etc.)
  return "-0.06em";
}

export default function TeamContent({ team }: { team: TeamMember[] }) {
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
                        style={{
                          objectPosition: `${m.focalX}% ${m.focalY}%`,
                        }}
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
                  <h2
                    className="text-3xl md:text-5xl font-light leading-tight"
                    style={{ marginLeft: leadingNudge(m.name) }}
                  >
                    {m.name}
                  </h2>
                  <div
                    className="mt-3 text-xs text-orange font-semibold uppercase"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {m.title}
                  </div>
                  {m.email && (
                    <a
                      href={`mailto:${m.email.toLowerCase()}`}
                      className="mt-1 block text-xs text-brown/55 hover:text-orange transition-colors duration-500"
                      style={{ letterSpacing: "0.22em" }}
                    >
                      {m.email.toLowerCase()}
                    </a>
                  )}
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
