"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import WrenLockup from "./WrenLockup";

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/industries", label: "Industries" },
  { href: "/team", label: "Team" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.8, ease }}
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
        scrolled || mobileOpen
          ? "bg-eggshell/90 backdrop-blur border-b border-brown/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="text-brown" aria-label="Wren Search home">
          <WrenLockup size="sm" textColor="#383026" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8 text-sm text-brown/75"
          aria-label="Primary"
        >
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative tracking-wide transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-orange after:transition-all after:duration-500 ${
                  active
                    ? "text-brown after:w-full"
                    : "after:w-0 hover:text-brown hover:after:w-full"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-eggshell bg-orange px-5 py-2.5 rounded-full hover:bg-brown transition-colors duration-500"
        >
          Connect with Wren
        </Link>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-px w-6 bg-brown transition-transform duration-500 ${
              mobileOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-brown transition-opacity duration-500 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-brown transition-transform duration-500 ${
              mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease }}
            className="md:hidden bg-eggshell border-t border-brown/10 overflow-hidden"
          >
            <nav
              className="px-6 py-6 flex flex-col gap-5"
              aria-label="Mobile"
            >
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-lg font-light ${
                      active ? "text-orange" : "text-brown"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-3 self-start inline-flex items-center gap-2 text-sm font-medium text-eggshell bg-orange px-5 py-2.5 rounded-full"
              >
                Connect with Wren
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
