"use client";

import { useState, useRef } from "react";
import { FadeUp } from "@/components/ui";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwoeaUXEbVmBwvD7R-NrQjF7Ed9xy02NyylRUz8-ngJGurMDfe6kLrpJn7AIv0AKIkN/exec";

const MAX_FILE_BYTES = 25 * 1024 * 1024; // keep in sync with the Apps Script

const inquiryReasons = [
  "I'm an employer in need of recruiting services",
  "I'm looking to network or find a new role in the industry",
  "Other inquiry",
];

/** Reads a File as a base64 data URL (the Apps Script strips the data: prefix). */
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the attachment."));
    reader.readAsDataURL(file);
  });
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    notes: "",
    attachment: null as File | null,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bots fill this; humans never see it
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot tripped — pretend success, send nothing.
    if (honeypot.trim() !== "") {
      setStatus("success");
      return;
    }

    setErrorMsg("");

    if (form.attachment && form.attachment.size > MAX_FILE_BYTES) {
      setStatus("error");
      setErrorMsg("Attachment exceeds the 25 MB limit. Please attach a smaller file.");
      return;
    }

    setStatus("submitting");

    try {
      let fileFields: Record<string, string> = {};
      if (form.attachment) {
        fileFields = {
          fileName: form.attachment.name,
          fileType: form.attachment.type || "application/octet-stream",
          fileData: await readFileAsDataUrl(form.attachment),
        };
      }

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        reason: form.reason,
        notes: form.notes,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        ...fileFields,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        // text/plain keeps this a "simple" request — no CORS preflight.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const result = await res
        .json()
        .catch(() => ({ result: "error", message: "Unexpected server response." }));

      if (result.result === "success") {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", reason: "", notes: "", attachment: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network error — please try again, or email us directly at chaz@wrensearch.com.",
      );
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (k === "attachment" && e.target instanceof HTMLInputElement) {
      const target = e.target as HTMLInputElement;
      setForm((f) => ({ ...f, attachment: target.files?.[0] || null }));
    } else {
      setForm((f) => ({ ...f, [k]: (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value }));
    }
  };

  return (
    <main className="bg-eggshell text-brown min-h-screen flex items-center">
      <section className="w-full py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-16 md:gap-20">

            {/* LEFT: INTRO + CONTACT INFO SIDEBAR */}
            <FadeUp className="md:col-span-4">
              <div className="space-y-12">

                {/* Header Section */}
                <div>
                  <div className="text-xs text-orange font-semibold uppercase mb-6" style={{ letterSpacing: "0.22em" }}>
                    Connect
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                    Begin a{" "}
                    <span className="italic text-orange">conversation.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-brown/75 font-light leading-relaxed">
                    Every Wren engagement begins with a conversation. We'd be glad to learn about the role, the leadership you're building, or the team you're shaping.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-brown/15" />

                {/* Email */}
                <div>
                  <div className="text-xs text-orange font-semibold uppercase mb-3" style={{ letterSpacing: "0.22em" }}>
                    Email
                  </div>
                  <a href="mailto:chaz@wrensearch.com" className="text-lg font-light text-brown hover:text-orange transition-colors duration-500">
                    chaz@wrensearch.com
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <div className="text-xs text-orange font-semibold uppercase mb-3" style={{ letterSpacing: "0.22em" }}>
                    Phone
                  </div>
                  <a href="tel:+12316703370" className="text-lg font-light text-brown hover:text-orange transition-colors duration-500">
                    231-670-3370
                  </a>
                </div>

                {/* Location */}
                <div>
                  <div className="text-xs text-orange font-semibold uppercase mb-3" style={{ letterSpacing: "0.22em" }}>
                    Location
                  </div>
                  <p className="text-sm font-light text-brown/85">
                    Grand Rapids, Michigan
                  </p>
                  <p className="text-xs font-light text-brown/60 mt-2">
                    Serving the U.S. & Canada
                  </p>
                </div>

                {/* LinkedIn */}
                <div className="pt-6 border-t border-brown/15">
                  <a href="https://www.linkedin.com/company/wrensearch/?viewAsMember=true" className="inline-flex items-center gap-2 text-sm font-light text-orange hover:text-brown transition-colors duration-500">
                    LinkedIn
                    <span>→</span>
                  </a>
                </div>

                {/* Message */}
                <div className="pt-6 border-t border-brown/15 text-xs font-light text-brown/70 leading-relaxed space-y-3">
                  <p>
                    We respond personally — usually within one business day.
                  </p>
                  <p className="italic">
                    Built on better connections.
                  </p>
                </div>

              </div>
            </FadeUp>

            {/* RIGHT: FORM */}
            <FadeUp className="md:col-span-7 md:col-start-6" delay={0.1}>
              <form onSubmit={onSubmit} className="space-y-8">

                <Field label="Name" id="name">
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                    placeholder="Your full name"
                  />
                </Field>

                <Field label="Email" id="email">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                    placeholder="you@company.com"
                  />
                </Field>

                <Field label="Phone" id="phone">
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                    placeholder="(555) 000-0000"
                  />
                </Field>

                <Field label="Reason for inquiry" id="reason">
                  <select
                    id="reason"
                    required
                    value={form.reason}
                    onChange={set("reason")}
                    className={`${inputCls} cursor-pointer`}
                  >
                    <option value="">Select the best option...</option>
                    {inquiryReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Additional notes" id="notes">
                  <textarea
                    id="notes"
                    rows={6}
                    value={form.notes}
                    onChange={set("notes")}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us more about your needs or inquiry..."
                  />
                </Field>

                <Field label="Attachment (optional)" id="attachment">
                  <input
                    id="attachment"
                    type="file"
                    ref={fileInputRef}
                    onChange={set("attachment")}
                    className="w-full text-sm text-brown file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange file:text-eggshell file:font-medium file:cursor-pointer hover:file:bg-brown transition-colors duration-300"
                  />
                </Field>

                {/* Honeypot — visually hidden, catches bots */}
                <div
                  className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="company-website">Company website</label>
                  <input
                    id="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {status === "success" ? (
                  <div className="pt-8" role="status" aria-live="polite">
                    <div className="border border-orange/40 bg-orange/5 px-6 py-5">
                      <p className="text-base font-medium text-brown">
                        Thank you — your inquiry has been received.
                      </p>
                      <p className="mt-2 text-sm font-light text-brown/70">
                        We respond personally, usually within one business day.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange hover:text-brown transition-colors duration-500"
                      >
                        Send another inquiry
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-8 space-y-4">
                    {status === "error" && (
                      <p
                        className="text-sm font-light text-red-700"
                        role="alert"
                        aria-live="assertive"
                      >
                        {errorMsg}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group w-full flex items-center justify-center gap-2 bg-orange text-eggshell py-4 text-sm font-medium hover:bg-brown transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? "Sending…" : "Send inquiry"}
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                )}

              </form>
            </FadeUp>

          </div>
        </div>
      </section>
    </main>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-brown/25 py-3 text-base font-light text-brown placeholder:text-brown/30 focus:outline-none focus:border-orange transition-colors duration-300";

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs text-brown/65 uppercase font-semibold mb-2"
        style={{ letterSpacing: "0.22em" }}
      >
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
}
