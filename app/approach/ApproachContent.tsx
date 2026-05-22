"use client";

import { FadeUp, Eyebrow, PageHero, CtaBand } from "@/components/ui";

const pillars = [
  {
    n: "01",
    title: "Begin with conversation",
    body: "Every Wren search starts by understanding the leadership, culture, and business needs behind the role — not just the requisition. We learn the team you're shaping, the problems you're solving, and the kind of leader who can deliver in your environment.",
    bullets: [
      "Discovery sessions with hiring leaders and stakeholders",
      "Calibration of role, scope, and success criteria",
      "Mapping of organizational context and culture",
    ],
  },
  {
    n: "02",
    title: "Modern tools, considered judgment",
    body: "Wren combines industry expertise with AI-assisted sourcing technology to accelerate research, streamline outreach, and identify exceptional talent faster. By reducing traditional barriers, we open broader access to passive leaders who would otherwise remain out of reach.",
    bullets: [
      "AI-assisted research across the design ecosystem",
      "Discreet outreach to active and passive candidates",
      "Curated, qualified slate — not a volume play",
    ],
  },
  {
    n: "03",
    title: "Performance Snapshot",
    body: "Each Wren-backed candidate is presented with a Performance Snapshot — a clear view into how an individual has delivered impact across their career. Rather than rely on résumés alone, you evaluate patterns of performance, leadership, and long-term potential.",
    bullets: [
      "Career-spanning view of delivered outcomes",
      "Leadership patterns and growth trajectory",
      "Decision-ready summary for stakeholders",
    ],
  },
];

export default function ApproachContent() {
  return (
    <main className="bg-eggshell text-brown">
      <PageHero
        eyebrow="Our Approach"
        title={
          <>
            Tech-enabled. Relationship-driven.{" "}
            <span className="italic text-orange">Grounded in your goals.</span>
          </>
        }
        body="Every Wren engagement is built around three principles. Together, they create a process that feels more considered, more responsive, and more effective — for clients and candidates alike."
      />

      {/* Pillars */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-24 md:space-y-32">
          {pillars.map((p) => (
            <FadeUp key={p.n}>
              <article className="grid md:grid-cols-12 gap-12 md:gap-20">
                <div className="md:col-span-4">
                  <div
                    className="text-xs text-orange font-semibold"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    {p.n}
                  </div>
                  <h2 className="mt-6 text-3xl md:text-4xl font-light leading-tight">
                    {p.title}
                  </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="text-lg md:text-xl text-brown/80 font-light leading-relaxed">
                    {p.body}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-brown/75 font-light"
                      >
                        <span className="mt-2 block h-px w-5 bg-orange flex-none" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-24 md:py-36 bg-brown text-eggshell">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <Eyebrow>Tech-enabled, not tech-led</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <blockquote className="mt-8 text-3xl md:text-5xl font-light leading-[1.15] tracking-tight">
              &ldquo;Technology is only part of the equation.{" "}
              <span className="italic text-orange">
                Wren creates connections that last.
              </span>
              &rdquo;
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <Eyebrow>The Wren process</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl font-light leading-tight">
              A search that doesn&apos;t end with placement.
            </h2>
          </FadeUp>
          <div className="mt-16 grid md:grid-cols-5 gap-10 md:gap-6">
            {[
              { n: "Discover", body: "Learn your business, role, and culture." },
              { n: "Search", body: "Tech-enabled sourcing across the ecosystem." },
              { n: "Present", body: "Performance Snapshots, not just résumés." },
              { n: "Place", body: "Considered fit on both sides of the table." },
              { n: "Maintain", body: "Long-term partnership beyond the close." },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.07}>
                <div className="border-t border-brown/20 pt-6">
                  <div
                    className="text-xs text-orange font-semibold"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{step.n}</h3>
                  <p className="mt-3 text-brown/70 font-light leading-relaxed text-sm">
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Where we work"
        title={
          <>
            Industries Wren{" "}
            <span className="italic text-orange">searches across.</span>
          </>
        }
        body="From contract furniture and residential furnishings to lighting, architectural products, and hospitality — Wren works across the full design ecosystem."
        primary={{ href: "/industries", label: "Industries & placements" }}
        secondary={{ href: "/contact", label: "Start a search" }}
      />
    </main>
  );
}
