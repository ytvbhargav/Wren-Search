import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { formatPosted, getOpenJobBySlug, toJobCard } from "@/src/lib/jobs";
import ApplyForm from "./ApplyForm";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getOpenJobBySlug(slug);
  if (!doc) return { title: "Role not found" };
  const job = toJobCard(doc);
  return {
    title: `${job.title}, ${job.location}`,
    description: job.summary,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { title: `${job.title} — Wren Search`, description: job.summary, url: `/jobs/${job.slug}` },
  };
}

// Simple typographic styles for the CMS rich text (no typography plugin installed).
const proseCls =
  "text-lg text-brown/80 font-light leading-relaxed [&_p]:mb-5 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:text-brown [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:text-brown [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-medium [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_ul]:mb-5 [&_ol]:mb-5 [&_li]:mb-2 [&_a]:text-orange [&_a]:underline [&_strong]:font-medium [&_strong]:text-brown";

export default async function JobPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = await getOpenJobBySlug(slug);
  if (!doc) notFound();
  const job = toJobCard(doc);

  // Structured data so the role can appear in Google's job search.
  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType: { "full-time": "FULL_TIME", "part-time": "PART_TIME", contract: "CONTRACTOR", "contract-to-hire": "CONTRACTOR" }[job.jobType],
    hiringOrganization: { "@type": "Organization", name: "Wren Search", sameAs: "https://www.wrensearch.com" },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "US" },
      ...(job.lat != null && job.lng != null
        ? { geo: { "@type": "GeoCoordinates", latitude: job.lat, longitude: job.lng } }
        : {}),
    },
    ...(job.workplaceLabel === "Remote" ? { jobLocationType: "TELECOMMUTE" } : {}),
  };

  const meta = [
    { label: "Location", value: job.location },
    { label: "Job type", value: job.jobTypeLabel },
    { label: "Workplace", value: job.workplaceLabel },
    { label: "Industry", value: job.industryLabel },
    { label: "Compensation", value: job.salary },
    { label: "Posted", value: formatPosted(job.postedAt) },
  ].filter((m) => m.value);

  return (
    <main className="bg-eggshell text-brown">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }} />

      <section className="pt-32 md:pt-40 pb-12 md:pb-16 border-b border-brown/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link href="/jobs" className="text-sm text-brown/60 hover:text-orange transition-colors duration-500">
            ← All open roles
          </Link>
          <h1 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-4xl">
            {job.title}
          </h1>
          <div className="mt-4 text-lg text-brown/65 font-light">{job.company}</div>

          <dl className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[11px] text-orange font-semibold uppercase" style={{ letterSpacing: "0.22em" }}>
                  {m.label}
                </dt>
                <dd className="mt-2 text-sm text-brown/85">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-16">
          <article className="md:col-span-7">
            <p className="text-xl text-brown font-light leading-relaxed mb-10">{job.summary}</p>
            {doc.description ? (
              <RichText data={doc.description as SerializedEditorState} className={proseCls} />
            ) : null}
          </article>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28 border border-brown/10 bg-tan/15 px-6 py-8">
              <div className="text-xs text-orange font-semibold uppercase" style={{ letterSpacing: "0.22em" }}>
                Apply
              </div>
              <h2 className="mt-3 text-2xl font-light leading-snug">Interested in this role?</h2>
              <p className="mt-2 mb-8 text-sm text-brown/65 font-light">
                Share a few details and the Wren team will reach out personally.
              </p>
              <ApplyForm jobId={String(doc.id)} jobTitle={job.title} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
