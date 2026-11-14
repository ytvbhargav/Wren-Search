"use client";

import { useActionState } from "react";
import { submitApplication, type ApplyState } from "./actions";

const inputCls =
  "w-full bg-transparent border-b border-brown/25 py-2.5 text-base font-light text-brown placeholder:text-brown/30 focus:outline-none focus:border-orange transition-colors duration-300";

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] text-brown/65 uppercase font-semibold mb-1"
        style={{ letterSpacing: "0.22em" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <div className="border border-orange/40 bg-orange/5 px-6 py-6" role="status" aria-live="polite">
        <p className="text-base font-medium text-brown">Thank you, your application has been received.</p>
        <p className="mt-2 text-sm font-light text-brown/70">
          The Wren team reviews every application personally and will be in touch about the{" "}
          {jobTitle} role.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="jobId" value={jobId} />

      <Field label="Name" id="apply-name">
        <input id="apply-name" name="name" required autoComplete="name" className={inputCls} placeholder="Your full name" />
      </Field>
      <Field label="Email" id="apply-email">
        <input id="apply-email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@email.com" />
      </Field>
      <Field label="Phone" id="apply-phone">
        <input id="apply-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="(555) 000-0000" />
      </Field>
      <Field label="LinkedIn profile" id="apply-linkedin">
        <input id="apply-linkedin" name="linkedin" type="url" className={inputCls} placeholder="https://linkedin.com/in/…" />
      </Field>
      <Field label="Note (optional)" id="apply-message">
        <textarea
          id="apply-message"
          name="message"
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="Anything you'd like the Wren team to know"
        />
      </Field>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p className="text-sm font-light text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group w-full flex items-center justify-center gap-2 bg-orange text-eggshell py-4 text-sm font-medium hover:bg-brown transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : "Submit application"}
        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
