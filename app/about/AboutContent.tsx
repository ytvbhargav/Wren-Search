"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import WrenMark from "@/components/WrenMark";
import { FadeUp, Eyebrow, PageHero, CtaBand } from "@/components/ui";

function CountUp({
  to,
  suffix = "",
  trigger = 0,
}: {
  to: number;
  suffix?: string;
  trigger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, trigger]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const personality = [
  {
    title: "Connectors",
    body: "Relationship-driven by nature. Passionate about building lasting partnerships and genuine alignment. Relationships are maintained, not mined, or stored.",
  },
  {
    title: "Calm confidence",
    body: "Assured and experienced without ego. Decisions made from clarity, not pressure.",
  },
  {
    title: "Approachable intelligence",
    body: "Cutting-edge expertise delivered with warmth and clarity. Tech-enabled, not tech-led.",
  },
  {
    title: "Quiet sophistication",
    body: "Premium services and experiences. Polished without pretension.",
  },
  {
    title: "Attentive stewards",
    body: "Observant, responsive, service-oriented. The work is always done in your interest first.",
  },
];

export default function AboutContent() {
  const [rollKey, setRollKey] = useState(0);

  return (
    <main className="bg-eggshell text-brown">
      <PageHero
        eyebrow="About Wren Search"
        title={
          <>
            The balance offered{" "}
            <span className="italic text-orange">is the brand.</span>
          </>
        }
        body="Executive recruiting — particularly within commercial and residential furnishings — typically exists in dichotomies. Efficient or thoughtful. Data-driven or guided by instinct. Fast-moving or relationship-led. Wren Search was founded to bridge those divides."
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            <FadeUp className="md:col-span-4">
              <Eyebrow>Connecting Leaders</Eyebrow>
              <h2 className="mt-6 text-3xl md:text-4xl font-light leading-tight">
                Across the built environment.
              </h2>
            </FadeUp>
            <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg md:text-xl text-brown/80 font-light leading-relaxed">
              <FadeUp delay={0.1}>
                <p>
                  Wren Search is an executive search partner working across the
                  contract and residential furnishings industry. We combine a
                  relationship-led approach with modern tools to help you shape
                  the future across the design ecosystem.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p>
                  From senior leaders to high-impact roles, we search broadly
                  and care deeply — to form connections designed to last.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p>
                  At the center of our work is a simple belief: people come
                  first. Everything else follows. Your expertise, our
                  perspective, and high-impact talent are brought together to
                  build stronger teams and better outcomes.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p>
                  With decades of combined experience in executive search and
                  corporate recruiting, Wren brings clarity to complex searches
                  and care to every interaction. The result is a process that
                  feels more considered, more responsive, and more effective.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16 md:py-24 bg-tan/40"
        onMouseEnter={() => setRollKey((k) => k + 1)}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 md:divide-x md:divide-brown/20">
            {[
              { n: "30+", count: 30, suffix: "+", label: "Years of combined experience in executive search" },
              { n: "Retained", label: "Traditional & flexible retainer models tailored to your needs" },
              { n: "International", label: "Reach across the U.S. and Canada" },
              { n: "Long-term", label: "Partnerships, not transactions" },
            ].map((s, i) => (
              <FadeUp
                key={s.label}
                delay={i * 0.08}
                className="h-full md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex h-full flex-col">
                  <div className="text-3xl md:text-4xl font-light text-orange leading-[1.15]">
                    {s.count != null ? (
                      <CountUp to={s.count} suffix={s.suffix} trigger={rollKey} />
                    ) : (
                      s.n
                    )}
                  </div>
                  <div className="mt-5 text-[0.7rem] text-brown/70 uppercase leading-relaxed tracking-[0.18em]">
                    {s.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Brand personality */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <Eyebrow>How we show up</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl font-light leading-[1.1]">
              The character of every Wren engagement.
            </h2>
          </FadeUp>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brown/15">
            {personality.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.06}>
                <div className="bg-eggshell p-8 md:p-10 h-full">
                  <h3 className="text-xl md:text-2xl font-medium">{p.title}</h3>
                  <p className="mt-4 text-brown/75 font-light leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </FadeUp>
            ))}
            <FadeUp delay={personality.length * 0.06}>
              <div className="relative bg-orange text-eggshell p-8 md:p-10 h-full overflow-hidden">
                <div
                  className="text-xs font-semibold uppercase text-eggshell/80"
                  style={{ letterSpacing: "0.22em" }}
                >
                  In a word
                </div>
                <p className="mt-6 text-2xl md:text-3xl font-light leading-[1.15]">
                  Built on{" "}
                  <span className="italic">better connections.</span>
                </p>
                <p className="mt-4 text-sm text-eggshell/80 font-light leading-relaxed">
                  The tagline isn&apos;t a slogan — it&apos;s how every Wren
                  engagement is measured.
                </p>
                <WrenMark
                  bodyColor="#fafaf5"
                  className="absolute -right-6 -bottom-6 h-32 w-auto opacity-15 pointer-events-none"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Continue"
        title={
          <>
            See how Wren{" "}
            <span className="italic text-orange">approaches every search.</span>
          </>
        }
        body="Each Wren engagement is built around three principles — conversation, considered judgment, and a clear view of performance."
        primary={{ href: "/approach", label: "Our approach" }}
        secondary={{ href: "/team", label: "Meet the team" }}
      />
    </main>
  );
}
