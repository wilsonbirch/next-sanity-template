"use client";

import { useState } from "react";

import { contactSchema, type ContactInput, type ContactResult } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const INITIAL: ContactInput = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const p = issue.path[0];
        if (typeof p === "string" && !fe[p as keyof ContactInput]) {
          fe[p as keyof ContactInput] = issue.message;
        }
      }
      setErrors(fe);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: ContactResult = await res.json();
      if (!result.ok) {
        setErrors(result.fieldErrors ?? {});
        setFormError(result.error);
        setStatus("error");
        return;
      }
      setValues(INITIAL);
      setStatus("success");
    } catch {
      setFormError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8 text-center">
        <p className="font-display text-2xl text-[color:var(--color-ink)]">Thanks — message received.</p>
        <p className="mt-2 text-[color:var(--color-ink-muted)]">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <Field label="Name" error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          autoComplete="name"
          className="input"
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
          className="input"
        />
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className="input resize-y"
        />
      </Field>

      {/* Honeypot — visually hidden, real users leave it blank */}
      <div aria-hidden style={{ position: "absolute", left: "-10000px" }}>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website ?? ""}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      {formError && (
        <p className="text-sm text-red-600" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] px-7 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          border: 1px solid var(--color-rule);
          background: var(--color-surface);
          color: var(--color-ink);
          border-radius: 0.5rem;
          padding: 0.65rem 0.9rem;
          font-size: 1rem;
          line-height: 1.4;
        }
        .input:focus {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[color:var(--color-ink)]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
