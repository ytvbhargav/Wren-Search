"use client";

import { useState } from "react";
import { FadeUp, Eyebrow, PageHero } from "@/components/ui";

export default function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New inquiry from ${form.name}${form.company ? ` (${form.company})` : ""}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nRole / search: ${form.role}\n\n${form.message}`,
    );
    window.location.href = `mailto:hello@wrensearch.com?subject=${subject}&body=${body}`;
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main className="bg-eggshell text-brown">
      <PageHero
        eyebrow="Connect"
        title={
          <>
            Begin a{" "}
            <span className="italic text-orange">conversation.</span>
          </>
        }
        body="Tell us about the role, the leadership you're building, or the team you're shaping. We respond personally — usually within one business day."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            {/* Form */}
            <FadeUp className="md:col-span-7">
              <form onSubmit={onSubmit} className="space-y-8">
                <Field label="Your name" id="name">
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                  />
                </Field>
                <Field label="Company" id="company">
                  <input
                    id="company"
                    value={form.company}
                    onChange={set("company")}
                    className={inputCls}
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
                  />
                </Field>
                <Field label="Role or search" id="role">
                  <input
                    id="role"
                    value={form.role}
                    onChange={set("role")}
                    placeholder="VP of Sales, Chief Creative Officer, etc."
                    className={inputCls}
                  />
                </Field>
                <Field label="A bit about what you're looking for" id="message">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    className={`${inputCls} resize-none`}
                  />
                </Field>
                <div>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-orange text-eggshell px-8 py-4 rounded-full text-sm font-medium hover:bg-brown transition-colors duration-500"
                  >
                    Send message
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </FadeUp>

            {/* Side info */}
            <FadeUp className="md:col-span-4 md:col-start-9" delay={0.1}>
              <div className="space-y-12">
                <div>
                  <div
                    className="text-xs text-orange font-semibold uppercase"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:hello@wrensearch.com"
                    className="mt-3 block text-xl md:text-2xl font-light text-brown hover:text-orange transition-colors duration-500"
                  >
                    hello@wrensearch.com
                  </a>
                </div>
                <div>
                  <div
                    className="text-xs text-orange font-semibold uppercase"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    Based in
                  </div>
                  <div className="mt-3 text-lg font-light text-brown/85">
                    Byron Center & Wyoming, Michigan
                  </div>
                  <div className="mt-1 text-sm text-brown/60 font-light">
                    Working nationally across the U.S.
                  </div>
                </div>
                <div>
                  <div
                    className="text-xs text-orange font-semibold uppercase"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    Connect
                  </div>
                  <a
                    href="https://www.linkedin.com/company/wren-search"
                    className="mt-3 block text-lg font-light text-brown hover:text-orange transition-colors duration-500"
                  >
                    LinkedIn →
                  </a>
                </div>
                <div className="pt-8 border-t border-brown/15 text-sm text-brown/65 font-light leading-relaxed">
                  Every Wren engagement begins with a conversation — and ends
                  with a long-term partnership.
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-brown/25 py-3 text-lg font-light text-brown placeholder:text-brown/40 focus:outline-none focus:border-orange transition-colors duration-300";

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
        className="block text-xs text-brown/65 uppercase font-semibold"
        style={{ letterSpacing: "0.22em" }}
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
