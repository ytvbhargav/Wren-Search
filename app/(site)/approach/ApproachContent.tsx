"use client";

import { FadeUp, Eyebrow, PageHero, CtaBand } from "@/components/ui";

const pillars = [
  {
    n: "01",
    title: "Begin with conversation",
    body: "Every Wren search begins with conversation – taking time to understand the leadership, culture, and business needs behind the role. By reducing traditional barriers throughout the search process, we help create a more responsive experience for both clients and candidates.",
    bullets: [
      "Deep understanding of leadership and culture",
      "Clear view of business needs and role context",
      "Foundation for meaningful, long-term partnership",
    ],
  },
  {
    n: "02",
    title: "Wren combines industry expertise and established connections",
    body: "Wren combines industry expertise and established connections with advanced sourcing technology powered by AI to accelerate research, streamline outreach, and identify exceptional talent faster. That means more meaningful conversations, broader access to passive talent, and faster engagement with qualified leaders who may otherwise remain out of reach.",
    bullets: [
      "Industry expertise and established connections paired with AI-assisted sourcing",
      "Accelerated research across the ecosystem",
      "Access to exceptional, often passive talent",
    ],
  },
  {
    n: "03",
    title: "Performance Snapshot",
    body: "Each Wren-backed candidate includes a Performance Snapshot – a clear view of how an individual has delivered impact throughout their career. Rather than relying on résumés alone, we help clients evaluate patterns of performance, leadership, and long-term potential with greater clarity and confidence.",
    bullets: [
      "Clear view of delivered impact and patterns",
      "Leadership and performance trajectory",
      "Greater clarity and confidence in evaluation",
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
        body="Wren maintains long-lasting partnerships across the contract furniture, residential furnishings, commercial lighting, architectural products, hospitality furnishings, architectural design, and more."
        primary={{ href: "/industries", label: "Industries & placements" }}
        secondary={{ href: "/contact", label: "Start a search" }}
      />
    </main>
  );
}
