"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-xs font-semibold text-orange uppercase"
      style={{ letterSpacing: "0.22em" }}
    >
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
}) {
  return (
    <section className="pt-36 md:pt-48 pb-16 md:pb-24 bg-eggshell text-brown">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.02] tracking-tight max-w-5xl">
            {title}
          </h1>
          {body && (
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-brown/75 font-light leading-relaxed">
              {body}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-brown text-eggshell py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeUp>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-4xl">
            {title}
          </h2>
        </FadeUp>
        {body && (
          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-eggshell/75 font-light leading-relaxed">
              {body}
            </p>
          </FadeUp>
        )}
        <FadeUp delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={primary.href}
              className="group inline-flex items-center gap-3 bg-orange text-eggshell px-8 py-4 rounded-full text-sm font-medium hover:bg-eggshell hover:text-brown transition-colors duration-500"
            >
              {primary.label}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium border border-eggshell/30 text-eggshell hover:border-eggshell transition-colors duration-500"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
