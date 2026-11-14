import type { Metadata } from "next";
import { distanceMiles, geocode } from "@/src/lib/geocode";
import { getOpenJobs } from "@/src/lib/jobs";
import {
  DEFAULT_RADIUS,
  INDUSTRIES,
  JOB_TYPES,
  RADIUS_OPTIONS,
} from "@/src/lib/job-options";
import JobsContent from "./JobsContent";

export const metadata: Metadata = {
  title: "Open Roles in the Furnishings Industry",
  description:
    "Browse open leadership and sales roles placed by Wren Search across contract furniture, residential furnishings, lighting, and architectural products.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Open Roles — Wren Search",
    description: "Search open roles by location on the map.",
    url: "/jobs",
  },
};

// Always reflect the latest jobs posted in the Payload admin.
export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = one(sp.q).trim().slice(0, 100);
  const type = JOB_TYPES.some((t) => t.value === one(sp.type)) ? one(sp.type) : "";
  const industry = INDUSTRIES.some((i) => i.value === one(sp.industry)) ? one(sp.industry) : "";
  const radiusParam = one(sp.radius);
  const radius =
    radiusParam === "any"
      ? null
      : RADIUS_OPTIONS.find((r) => String(r) === radiusParam) ?? DEFAULT_RADIUS;

  const [allJobs, place] = await Promise.all([getOpenJobs(), q ? geocode(q) : null]);

  let jobs = allJobs.filter(
    (j) => (!type || j.jobType === type) && (!industry || j.industry === industry),
  );

  // Location search: keep jobs within the radius, nearest first.
  let distances: Record<string, number> = {};
  if (place) {
    distances = Object.fromEntries(
      jobs
        .filter((j) => j.lat != null && j.lng != null)
        .map((j) => [j.id, distanceMiles(place, { lat: j.lat!, lng: j.lng! })]),
    );
    jobs = jobs
      .filter((j) => j.id in distances && (radius == null || distances[j.id] <= radius))
      .sort((a, b) => distances[a.id] - distances[b.id]);
  }

  return (
    <JobsContent
      jobs={jobs}
      totalOpen={allJobs.length}
      distances={distances}
      filters={{ q, type, industry, radius: radius == null ? "any" : String(radius) }}
      place={place}
      placeNotFound={!!q && !place}
    />
  );
}
