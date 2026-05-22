"use client";

import { motion } from "framer-motion";
import { FadeUp, Eyebrow, PageHero, CtaBand, ease } from "@/components/ui";

const industries = [
  {
    title: "Contract Furniture",
    desc: "Manufacturers and dealers shaping workplace, education, and healthcare environments. From specification to installation, leadership matters at every link of the channel.",
  },
  {
    title: "Residential Furnishings",
    desc: "Home décor brands, furniture houses, and lifestyle businesses defining how people live — from mass-market to luxury.",
  },
  {
    title: "Commercial Lighting",
    desc: "Manufacturers illuminating commercial, hospitality, and architectural spaces, including specification and architectural-grade lighting.",
  },
  {
    title: "Architectural Products",
    desc: "Specifiable building product manufacturers across walls, ceilings, flooring, and finishes — partners to the design community.",
  },
  {
    title: "Hospitality Furnishings",
    desc: "Brands serving hotels, restaurants, and the experiential built environment, where brand and product converge.",
  },
  {
    title: "Architectural & Design Firms",
    desc: "Design firms and studios across contract and residential markets — the people who specify, shape, and stand behind the work.",
  },
];

const placements = [
  {
    area: "Sales",
    range: "Territory representatives to Vice Presidents of Sales",
  },
  {
    area: "Design & Specification",
    range: "Mid-level designers to Chief Creative Officers",
  },
  { area: "Marketing", range: "Creative roles to CMOs" },
  { area: "Finance & Business Strategy", range: "Analysts to CFOs" },
  {
    area: "Product & Merchandising",
    range: "Product Managers to Chief Product Officers",
  },
  {
    area: "Operations & Supply Chain",
    range: "Buyers to Vice Presidents of Manufacturing",
  },
  {
    area: "Executive & C-Suite",
    range: "CEOs, COOs, Presidents, and General Managers",
  },
];

export default function IndustriesContent() {
  return (
    <main className="bg-eggshell text-brown">
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Working across the{" "}
            <span className="italic text-orange">design ecosystem.</span>
          </>
        }
        body="As a fully retained executive search firm, Wren maintains long-lasting partnerships across the commercial and residential furnishings industry — from manufacturers and dealers to design studios and beyond."
      />

      {/* Industries grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brown/15">
            {industries.map((ind, i) => (
              <FadeUp key={ind.title} delay={i * 0.06}>
                <article className="group bg-eggshell p-8 md:p-10 h-full hover:bg-tan/40 transition-colors duration-700">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl md:text-2xl font-medium">
                      {ind.title}
                    </h2>
                    <span
                      className="text-orange text-2xl translate-y-1 transition-transform duration-700 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-4 text-brown/70 font-light leading-relaxed">
                    {ind.desc}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Placements */}
      <section className="py-24 md:py-36 bg-tan/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12">
            <FadeUp className="md:col-span-5">
              <Eyebrow>Placements</Eyebrow>
              <h2 className="mt-6 text-3xl md:text-5xl font-light leading-tight">
                Searches at every level of leadership.
              </h2>
              <p className="mt-6 text-lg text-brown/75 font-light leading-relaxed">
                From regional teams to national brands, Wren supports searches
                across every functional discipline — including individual
                contributors, senior leaders, and the C-suite.
              </p>
            </FadeUp>

            <FadeUp className="md:col-span-6 md:col-start-7" delay={0.1}>
              <ul className="divide-y divide-brown/20">
                {placements.map((p, i) => (
                  <motion.li
                    key={p.area}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + i * 0.06,
                      ease,
                    }}
                    className="py-5 flex items-baseline justify-between gap-8"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className="text-xs text-orange font-semibold"
                        style={{ letterSpacing: "0.18em" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg md:text-xl font-medium">
                        {p.area}
                      </span>
                    </div>
                    <span className="hidden md:block text-sm text-brown/65 font-light text-right max-w-sm">
                      {p.range}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start a search"
        title={
          <>
            Tell us about the role{" "}
            <span className="italic text-orange">you&apos;re building.</span>
          </>
        }
        body="Whether you&apos;re shaping a new function, replacing a key leader, or building a team from the ground up — Wren is glad to start a conversation."
        primary={{ href: "/contact", label: "Connect with Wren" }}
        secondary={{ href: "/approach", label: "How we work" }}
      />
    </main>
  );
}
