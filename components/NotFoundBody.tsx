import Link from "next/link";
import WrenMark from "@/components/WrenMark";

// Shared 404 markup used by both the (site) group not-found and the root
// not-found (which renders for fully unmatched URLs above the (site) layout).
export default function NotFoundBody() {
  return (
    <main className="min-h-[100svh] bg-eggshell text-brown flex items-center justify-center pt-20 pb-12">
      <div className="text-center px-6 max-w-xl">
        <WrenMark bodyColor="#e35438" className="h-20 w-auto mx-auto" />
        <div
          className="mt-10 text-xs font-semibold text-orange uppercase"
          style={{ letterSpacing: "0.22em" }}
        >
          404 — Page not found
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl font-light leading-tight tracking-tight">
          This page has flown the nest.
        </h1>
        <p className="mt-6 text-brown/70 font-light">
          The page you were looking for can&apos;t be found. Head back to the
          home page or get in touch.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange text-eggshell px-6 py-3 rounded-full text-sm font-medium hover:bg-brown transition-colors duration-500"
          >
            Back home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-brown/20 text-brown hover:border-brown transition-colors duration-500"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
