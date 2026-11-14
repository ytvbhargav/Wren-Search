import { getPayloadClient } from "../get-payload";
import { INDUSTRIES, JOB_TYPES, WORKPLACES, labelFor } from "./job-options";

// Shape of a job as the site uses it (decoupled from Payload's generated types).
export type JobCard = {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  lat: number | null;
  lng: number | null;
  jobType: string;
  jobTypeLabel: string;
  industry: string;
  industryLabel: string;
  workplaceLabel: string;
  salary: string;
  summary: string;
  postedAt: string;
};

export type JobDoc = {
  id: string | number;
  slug?: string | null;
  title: string;
  company?: string | null;
  location: string;
  coordinates?: [number, number] | null;
  jobType: string;
  industry: string;
  workplace?: string | null;
  salary?: string | null;
  summary: string;
  description?: unknown;
  postedAt: string;
};

export function toJobCard(doc: JobDoc): JobCard {
  const [lng, lat] = doc.coordinates ?? [null, null];
  return {
    id: String(doc.id),
    slug: doc.slug ?? String(doc.id),
    title: doc.title,
    company: doc.company?.trim() || "Confidential client",
    location: doc.location,
    lat,
    lng,
    jobType: doc.jobType,
    jobTypeLabel: labelFor(JOB_TYPES, doc.jobType),
    industry: doc.industry,
    industryLabel: labelFor(INDUSTRIES, doc.industry),
    workplaceLabel: labelFor(WORKPLACES, doc.workplace),
    salary: doc.salary ?? "",
    summary: doc.summary,
    postedAt: doc.postedAt,
  };
}

export async function getOpenJobs(): Promise<JobCard[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "jobs",
    where: { status: { equals: "open" } },
    sort: "-postedAt",
    limit: 500,
    depth: 0,
    overrideAccess: false,
  });
  return (result.docs as unknown as JobDoc[]).map(toJobCard);
}

export async function getOpenJobBySlug(slug: string): Promise<JobDoc | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "jobs",
    where: { and: [{ slug: { equals: slug } }, { status: { equals: "open" } }] },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  });
  return (result.docs[0] as unknown as JobDoc) ?? null;
}

export function formatPosted(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
