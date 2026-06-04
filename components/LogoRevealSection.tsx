"use client";

import { motion } from "framer-motion";
import { WREN_PATH } from "./WrenMark";

const ease = [0.22, 1, 0.36, 1] as const;

const tagline = [
  { word: "Built", italic: false, accent: false },
  { word: "on", italic: false, accent: false },
  { word: "better", italic: false, accent: false },
  { word: "connections.", italic: true, accent: true },
];

export default function LogoRevealSection() {
  const pathLength = 3200; // Approximate length of the wren path

  return (
    <section className="relative bg-brown text-eggshell py-32 md:py-48 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="text-xs font-semibold text-orange uppercase"
          style={{ letterSpacing: "0.4em" }}
        >
          The Wren
        </motion.div>

        {/* Wren reveal — professional stroke draw with fill fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-14 md:mt-16"
        >
          <div className="relative h-44 md:h-64 lg:h-72 w-auto flex items-center justify-center">
            {/* Stroke outline animation */}
            <svg
              viewBox="0 0 378 342"
              className="absolute h-full w-auto"
              style={{ filter: "drop-shadow(0 0 1px rgba(227, 84, 56, 0.1))" }}
              aria-hidden
            >
              <motion.path
                d={WREN_PATH}
                fill="none"
                stroke="#e35438"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDashoffset: pathLength, strokeDasharray: pathLength }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.6, delay: 0.3, ease }}
              />
            </svg>

            {/* Filled wren that fades in after stroke completes */}
            <svg
              viewBox="0 0 378 342"
              className="absolute h-full w-auto"
              aria-hidden
            >
              <motion.path
                d={WREN_PATH}
                fill="#e35438"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 1.8, ease }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Divider draws outward from center */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 2.2, ease }}
          className="mt-14 h-px w-44 bg-eggshell/30 origin-center"
        />

        {/* Tagline — word-by-word stagger */}
        <h2 className="mt-12 text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] flex flex-wrap justify-center gap-x-3 md:gap-x-4">
          {tagline.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: 2.4 + i * 0.1,
                ease,
              }}
              className={w.italic ? "italic" : ""}
              style={w.accent ? { color: "#e35438" } : undefined}
            >
              {w.word}
            </motion.span>
          ))}
        </h2>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 2.9, ease }}
          className="mt-10 max-w-md text-sm md:text-base text-eggshell/55 font-light leading-relaxed"
        >
          The wren — small, observant, and built for purpose. A reminder that
          how we work matters as much as what we deliver.
        </motion.p>
      </div>
    </section>
  );
}
