import Link from "next/link";
import WrenLockup from "./WrenLockup";

const cols = [
  {
    title: "Navigate",
    links: [
      { href: "/about", label: "About" },
      { href: "/approach", label: "Approach" },
      { href: "/industries", label: "Industries" },
      { href: "/team", label: "Team" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "mailto:hello@wrensearch.com", label: "hello@wrensearch.com" },
      { href: "https://www.linkedin.com/company/wren-search", label: "LinkedIn" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brown text-eggshell/70 border-t border-eggshell/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <WrenLockup size="md" bodyColor="#e35438" textColor="#fafaf5" />
            <p className="mt-5 text-sm text-eggshell/65 font-light max-w-xs leading-relaxed">
              Executive search across the contract and residential furnishings
              industry. Relationship-driven, tech-enabled, grounded in your
              goals.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <div
                className="text-xs text-eggshell/55 uppercase font-semibold"
                style={{ letterSpacing: "0.22em" }}
              >
                {col.title}
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-eggshell/85 hover:text-orange transition-colors duration-500"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-eggshell/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-eggshell/55">
          <div style={{ letterSpacing: "0.2em" }} className="uppercase">
            Built on better connections.
          </div>
          <div>
            © {new Date().getFullYear()} Wren Search. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
