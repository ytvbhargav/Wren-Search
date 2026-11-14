"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { Bounds } from "pigeon-maps";
import { Eyebrow, ease } from "@/components/ui";
import { motion } from "framer-motion";
import type { JobCard } from "@/src/lib/jobs";
import { INDUSTRIES, JOB_TYPES, RADIUS_OPTIONS } from "@/src/lib/job-options";

// The map measures the browser window, so it only renders in the browser.
const JobsMap = dynamic(() => import("./JobsMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#ecebe6]" />,
});

type Filters = { q: string; type: string; industry: string; radius: string };

const selectCls =
  "w-full appearance-none bg-transparent border-b border-brown/25 py-2.5 pr-6 text-sm font-light text-brown focus:outline-none focus:border-orange transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:text-brown/35";

function inBounds(j: JobCard, b: Bounds) {
  if (j.lat == null || j.lng == null) return false;
  return j.lat <= b.ne[0] && j.lat >= b.sw[0] && j.lng <= b.ne[1] && j.lng >= b.sw[1];
}

export default function JobsContent({
  jobs,
  totalOpen,
  distances,
  filters,
  place,
  placeNotFound,
}: {
  jobs: JobCard[];
  totalOpen: number;
  distances: Record<string, number>;
  filters: Filters;
  place: { lat: number; lng: number; label: string } | null;
  placeNotFound: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const [q, setQ] = useState(filters.q);
  useEffect(() => setQ(filters.q), [filters.q]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<Bounds | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const cardRefs = useRef<Record<string, HTMLLIElement | null>>({});

  // A new search resets the "jobs in this map area" view and, if the visitor
  // had scrolled past the top of the results, brings them back into view.
  const resultsRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    setMapBounds(null);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = resultsRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 160, behavior: "smooth" });
    }
  }, [jobs]);

  const visibleJobs = useMemo(
    () => (mapBounds ? jobs.filter((j) => inBounds(j, mapBounds)) : jobs),
    [jobs, mapBounds],
  );

  const apply = (next: Partial<Filters>) => {
    const f = { ...filters, q, ...next };
    const params = new URLSearchParams();
    if (f.q.trim()) params.set("q", f.q.trim());
    if (f.q.trim() && f.radius !== "50") params.set("radius", f.radius);
    if (f.type) params.set("type", f.type);
    if (f.industry) params.set("industry", f.industry);
    const qs = params.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };

  const hasFilters = !!(filters.q || filters.type || filters.industry);

  const activateFromMap = (id: string | null) => {
    setActiveId(id);
    if (id && view === "list") {
      cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <main className="bg-eggshell text-brown">
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease }}
          >
            <Eyebrow>Open Roles</Eyebrow>
            <h1 className="mt-5 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-4xl">
              Find your next <span className="italic text-orange">leadership role.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-brown/75 font-light leading-relaxed">
              Roles Wren is currently searching for across the furnishings industry. Search by
              location, or explore the map.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="md:sticky md:top-20 z-30 bg-eggshell/95 backdrop-blur border-y border-brown/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apply({});
          }}
          className="max-w-7xl mx-auto px-6 md:px-10 py-4 grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-3 items-end"
        >
          <label className="col-span-2 md:col-span-4 block">
            <span className="sr-only">Location</span>
            <div className="flex items-center border-b border-brown/25 focus-within:border-orange transition-colors duration-300">
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-brown/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="City, state or ZIP"
                className="w-full bg-transparent py-2.5 pl-2 text-sm font-light text-brown placeholder:text-brown/40 focus:outline-none"
              />
              {q && (
                <button
                  type="button"
                  aria-label="Clear location"
                  onClick={() => {
                    setQ("");
                    apply({ q: "" });
                  }}
                  className="px-1 text-brown/40 hover:text-orange"
                >
                  ×
                </button>
              )}
            </div>
          </label>

          <label className="col-span-1 md:col-span-2 block relative">
            <span className="sr-only">Distance</span>
            <select
              value={filters.radius}
              disabled={!filters.q}
              onChange={(e) => apply({ radius: e.target.value })}
              className={selectCls}
              title={filters.q ? undefined : "Enter a location to search by distance"}
            >
              {RADIUS_OPTIONS.map((r) => (
                <option key={r} value={String(r)}>
                  Within {r} mi
                </option>
              ))}
              <option value="any">Any distance</option>
            </select>
            <Chevron />
          </label>

          <label className="col-span-1 md:col-span-2 block relative">
            <span className="sr-only">Job type</span>
            <select value={filters.type} onChange={(e) => apply({ type: e.target.value })} className={selectCls}>
              <option value="">All job types</option>
              {JOB_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <Chevron />
          </label>

          <label className="col-span-2 md:col-span-3 block relative">
            <span className="sr-only">Industry</span>
            <select
              value={filters.industry}
              onChange={(e) => apply({ industry: e.target.value })}
              className={selectCls}
            >
              <option value="">All industries</option>
              {INDUSTRIES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
            <Chevron />
          </label>

          <button
            type="submit"
            className="col-span-2 md:col-span-1 inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-eggshell hover:bg-brown transition-colors duration-500"
          >
            Search
          </button>
        </form>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="max-w-7xl mx-auto md:px-10 md:py-8">
        {/* Mobile list/map toggle */}
        <div className="md:hidden flex gap-2 px-6 py-4">
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                view === v ? "bg-brown text-eggshell" : "border border-brown/20 text-brown"
              }`}
            >
              {v === "list" ? "List" : "Map"}
            </button>
          ))}
        </div>

        <div className={`grid md:grid-cols-12 md:gap-8 transition-opacity ${pending ? "opacity-60" : ""}`}>
          {/* List */}
          <div className={`md:col-span-5 px-6 md:px-0 pb-16 ${view === "map" ? "hidden md:block" : ""}`}>
            <ResultsSummary
              count={visibleJobs.length}
              totalOpen={totalOpen}
              place={place}
              radius={filters.radius}
              inMapArea={!!mapBounds}
              placeNotFound={placeNotFound}
              query={filters.q}
              onShowAll={() => setMapBounds(null)}
            />

            {visibleJobs.length === 0 ? (
              <div className="mt-8 border border-brown/10 bg-tan/20 px-6 py-10 text-center">
                <p className="text-lg font-light">No open roles match this search.</p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setQ("");
                      apply({ q: "", type: "", industry: "", radius: "50" });
                    }}
                    className="mt-4 text-sm font-medium text-orange hover:text-brown transition-colors"
                  >
                    Clear all filters →
                  </button>
                )}
                <p className="mt-6 text-sm text-brown/60 font-light">
                  Not seeing the right fit?{" "}
                  <Link href="/contact" className="text-orange hover:text-brown">
                    Start a conversation
                  </Link>{" "}
                  and we&apos;ll keep you in mind.
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-4">
                {visibleJobs.map((j) => (
                  <li
                    key={j.id}
                    ref={(el) => {
                      cardRefs.current[j.id] = el;
                    }}
                    onMouseEnter={() => setActiveId(j.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <Link
                      href={`/jobs/${j.slug}`}
                      className={`group block border bg-eggshell px-6 py-5 transition-colors duration-300 ${
                        activeId === j.id ? "border-orange" : "border-brown/10 hover:border-orange"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl font-light leading-snug group-hover:text-orange transition-colors duration-300">
                          {j.title}
                        </h2>
                        {j.id in distances && (
                          <span className="shrink-0 text-xs text-brown/55 pt-1">
                            {Math.round(distances[j.id])} mi
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-brown/60">{j.company}</div>
                      <div
                        className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase text-brown/60"
                        style={{ letterSpacing: "0.16em" }}
                      >
                        <span className="text-orange font-semibold">{j.location}</span>
                        <span>{j.jobTypeLabel}</span>
                        {j.workplaceLabel && <span>{j.workplaceLabel}</span>}
                        <span>{j.industryLabel}</span>
                      </div>
                      <p className="mt-3 text-sm text-brown/75 font-light leading-relaxed line-clamp-2">
                        {j.summary}
                      </p>
                      {j.salary && <div className="mt-3 text-sm text-brown">{j.salary}</div>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Map */}
          <div className={`md:col-span-7 ${view === "list" ? "hidden md:block" : ""}`}>
            <div className="md:sticky md:top-[10.5rem] h-[calc(100svh-15rem)] md:h-[calc(100svh-12.5rem)] min-h-[420px] md:rounded-sm overflow-hidden md:border md:border-brown/10">
              <JobsMap
                jobs={jobs}
                activeId={activeId}
                onActivate={activateFromMap}
                fallbackCenter={place}
                onBoundsChange={(b, byUser) => {
                  if (byUser) setMapBounds(b);
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ResultsSummary({
  count,
  totalOpen,
  place,
  radius,
  inMapArea,
  placeNotFound,
  query,
  onShowAll,
}: {
  count: number;
  totalOpen: number;
  place: { label: string } | null;
  radius: string;
  inMapArea: boolean;
  placeNotFound: boolean;
  query: string;
  onShowAll: () => void;
}) {
  const roles = `${count} open ${count === 1 ? "role" : "roles"}`;
  return (
    <div className="text-sm text-brown/70 font-light">
      {placeNotFound ? (
        <p className="text-red-700">
          We couldn&apos;t find &ldquo;{query}&rdquo;. Try a city and state (e.g. &ldquo;Chicago, IL&rdquo;) or a ZIP code.
        </p>
      ) : inMapArea ? (
        <p>
          {roles} in this map area ·{" "}
          <button type="button" onClick={onShowAll} className="text-orange hover:text-brown">
            Show all results
          </button>
        </p>
      ) : place ? (
        <p>
          {roles} {radius === "any" ? "by distance from" : `within ${radius} miles of`}{" "}
          <span className="text-brown">{place.label}</span>
        </p>
      ) : (
        <p>
          {roles}
          {count !== totalOpen && ` of ${totalOpen}`}
        </p>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="pointer-events-none absolute right-0 bottom-3 h-4 w-4 text-brown/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}
