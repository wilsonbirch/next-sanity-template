import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema, type ContactResult } from "@/lib/contact-schema";

export const runtime = "nodejs";

/**
 * Contact form endpoint.
 *
 * Validates with the shared zod schema, rejects honeypot hits, and —
 * if RESEND_API_KEY + CONTACT_FORM_TO_EMAIL are configured — sends the
 * message via Resend. Otherwise it logs the submission to the server
 * console and returns success, so the form still works in dev before
 * email delivery is wired up.
 */
export async function POST(request: Request): Promise<NextResponse<ContactResult>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Please review the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot — bots fill the hidden `website` field.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>";

  const subject = `Contact form — ${data.name}`;
  const text = [
    `From: ${data.name} <${data.email}>`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  if (apiKey && toEmail) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: data.email,
        subject,
        text,
      });
      if (error) {
        console.error("[contact] Resend error:", error);
        return NextResponse.json(
          { ok: false, error: "We couldn't send your message. Please try again." },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] Unexpected Resend exception:", err);
      return NextResponse.json(
        { ok: false, error: "Something went wrong on our end. Please try again." },
        { status: 500 },
      );
    }
  }

  console.info("[contact] Submission (no Resend configured):\n%s\n%s", subject, text);
  return NextResponse.json({ ok: true });
}
