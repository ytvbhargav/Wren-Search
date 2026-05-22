"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import WrenMark from "@/components/WrenMark";
import LogoRevealSection from "@/components/LogoRevealSection";
import { FadeUp, Eyebrow, ease } from "@/components/ui";

const approachPreview = [
  {
    n: "01",
    title: "Begin with conversation",
    body: "Every search starts by understanding the leadership, culture, and business behind the role.",
  },
  {
    n: "02",
    title: "Modern tools, considered judgment",
    body: "Industry expertise paired with AI-assisted sourcing to reach exceptional, often passive talent.",
  },
  {
    n: "03",
    title: "Performance Snapshot",
    body: "A clear view of how each candidate has delivered impact — patterns of leadership, not résumés.",
  },
];

const industriesPreview = [
  "Contract Furniture",
  "Residential Furnishings",
  "Commercial Lighting",
  "Architectural Products",
  "Hospitality Furnishings",
  "Architectural Design",
];

export default function HomeContent() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBirdY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroBirdOpacity = useTransform(scrollYProgress, [0, 0.8], [0.07, 0]);

  return (
    <main id="top" className="bg-eggshell text-brown">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center pt-28 pb-24 overflow-hidden"
      >
        <motion.div
          style={{ y: heroBirdY, opacity: heroBirdOpacity }}
          className="absolute -right-24 md:-right-10 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        >
          <WrenMark bodyColor="#383026" className="h-[70vh] w-auto" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="max-w-4xl"
          >
            <Eyebrow>Executive Search · Built Environment</Eyebrow>
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] tracking-tight">
              Built on better{" "}
              <span className="italic text-orange">connections.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-brown/75 leading-relaxed font-light">
              Wren Search is an executive search partner for the commercial and
              residential furnishings industry. We combine a relationship-led
              approach with modern tools to help you shape the future across the
              design ecosystem.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.7, ease }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-orange text-eggshell px-7 py-4 rounded-full text-sm font-medium hover:bg-brown transition-colors duration-500"
              >
                Connect with Wren
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/approach"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-medium border border-brown/20 text-brown hover:border-brown transition-colors duration-500"
              >
                Explore our approach
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.2, delay: 1.4, ease }}
            className="absolute bottom-10 left-6 md:left-10 text-xs text-brown"
            style={{ letterSpacing: "0.3em" }}
          >
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-brown" />
              SCROLL
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOGO REVEAL */}
      <LogoRevealSection />

      {/* ABOUT TEASER */}
      <section className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            <FadeUp className="md:col-span-4">
              <Eyebrow>About Wren</Eyebrow>
              <h2 className="mt-6 text-3xl md:text-4xl font-light leading-tight">
                Connecting leaders across the built environment.
              </h2>
            </FadeUp>
            <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg md:text-xl text-brown/80 font-light leading-relaxed">
              <FadeUp delay={0.1}>
                <p>
                  Executive recruiting often exists in dichotomies — efficient
                  or thoughtful, data-driven or instinctive, fast-moving or
                  relationship-led. Wren Search was founded to bridge those
                  divides.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-brown font-normal">
                  At the center of our work is a simple belief: people come
                  first. Everything else follows.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-orange font-medium mt-4 group"
                >
                  More about Wren
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH TEASER */}
      <section className="bg-brown text-eggshell py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl font-light leading-[1.1]">
              Tech-enabled. Relationship-driven.{" "}
              <span className="italic">Grounded in your goals.</span>
            </h2>
          </FadeUp>
          <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-10">
            {approachPreview.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="border-t border-eggshell/20 pt-8">
                  <div
                    className="text-xs text-orange font-semibold"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    {step.n}
                  </div>
                  <h3 className="mt-6 text-xl md:text-2xl font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-eggshell/75 leading-relaxed font-light">
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.4}>
            <Link
              href="/approach"
              className="mt-12 inline-flex items-center gap-2 text-orange font-medium group"
            >
              Read the full approach
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section className="py-28 md:py-40 bg-eggshell">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 mb-12">
            <FadeUp className="md:col-span-5">
              <Eyebrow>Industries</Eyebrow>
              <h2 className="mt-6 text-3xl md:text-5xl font-light leading-tight">
                Working across the design ecosystem.
              </h2>
            </FadeUp>
            <FadeUp className="md:col-span-6 md:col-start-7" delay={0.1}>
              <p className="text-lg text-brown/75 font-light leading-relaxed">
                As a fully retained firm, Wren maintains long-lasting
                partnerships across the commercial and residential furnishings
                industry — from manufacturers and dealers to design studios.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-brown/15">
            {industriesPreview.map((ind, i) => (
              <FadeUp key={ind} delay={i * 0.05}>
                <div className="bg-eggshell p-8 md:p-10 h-full flex items-center justify-between gap-4 group hover:bg-tan/40 transition-colors duration-700">
                  <span className="text-lg md:text-xl font-medium">{ind}</span>
                  <span className="text-orange text-xl transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/industries"
              className="mt-12 inline-flex items-center gap-2 text-orange font-medium group"
            >
              All industries & placement areas
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-brown text-eggshell py-32 md:py-44 overflow-hidden">
        <div
          className="absolute -left-20 -bottom-10 opacity-[0.05] pointer-events-none"
          aria-hidden
        >
          <WrenMark bodyColor="#fafaf5" className="h-[80vh] w-auto" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <Eyebrow>Connect</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-4xl md:text-7xl font-light leading-[1.05] tracking-tight">
              A more thoughtful approach to{" "}
              <span className="italic text-orange">executive search.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-eggshell/75 font-light leading-relaxed">
              Tell us about the role, the leadership you&apos;re building, or
              the team you&apos;re shaping. We&apos;d be glad to start a
              conversation.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-14 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-orange text-eggshell px-8 py-4 rounded-full text-sm font-medium hover:bg-eggshell hover:text-brown transition-colors duration-500"
              >
                Connect with Wren
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium border border-eggshell/30 text-eggshell hover:border-eggshell transition-colors duration-500"
              >
                Meet the team
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
