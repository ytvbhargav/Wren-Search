"use server";

import { getPayloadClient } from "@/src/get-payload";

export type ApplyState = { status: "idle" | "success" | "error"; message?: string };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  // Honeypot: bots fill the hidden field. Pretend it worked and save nothing.
  if (clean(formData.get("company_website"), 200)) return { status: "success" };

  const jobId = clean(formData.get("jobId"), 64);
  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 200);
  const phone = clean(formData.get("phone"), 40);
  const linkedin = clean(formData.get("linkedin"), 300);
  const message = clean(formData.get("message"), 5000);

  if (!jobId || !name || !email) {
    return { status: "error", message: "Please fill in your name and email." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const payload = await getPayloadClient();

    // Only accept applications for jobs that are still open.
    const job = await payload.find({
      collection: "jobs",
      where: { and: [{ id: { equals: jobId } }, { status: { equals: "open" } }] },
      limit: 1,
      depth: 0,
    });
    if (!job.docs.length) {
      return { status: "error", message: "This role is no longer accepting applications." };
    }

    await payload.create({
      collection: "applications",
      data: { job: job.docs[0].id, name, email, phone, linkedin, message },
    });
    return { status: "success" };
  } catch (err) {
    console.error("Application submit failed", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again, or email chaz@wrensearch.com.",
    };
  }
}
