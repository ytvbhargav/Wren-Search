"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeUp, CtaBand } from "@/components/ui";

const inquiryReasons = [
  "I'm an employer in need of recruiting services",
  "I'm looking to network or find a new role in the industry",
  "Other inquiry",
];

export default function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    notes: "",
    attachment: null as File | null,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nReason: ${form.reason}\n\nAdditional Notes:\n${form.notes}`,
    );
    window.location.href = `mailto:chaz@wrensearch.com?subject=${subject}&body=${body}`;
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
                    onChange={set("attachment")}
                    className="w-full text-sm text-brown file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange file:text-eggshell file:font-medium file:cursor-pointer hover:file:bg-brown transition-colors duration-300"
                  />
                </Field>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-orange text-eggshell py-4 text-sm font-medium hover:bg-brown transition-colors duration-500"
                  >
                    Send inquiry
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>

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
