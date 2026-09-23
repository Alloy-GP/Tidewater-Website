export const prerender = false;

// src/pages/api/lead.ts
// Lead capture form handler — for "get a quote / request a review / book a call" forms.
// Fields expected: name, email, company, plus any optional fields (units, goal, etc.)

import type { APIRoute } from "astro";
import { Resend } from "resend";
import { EMAIL_CONFIG } from "../../lib/email.config";
import { sendWithAlert, notifySubmission, fieldsFromFormData } from "../../lib/form-alert";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
// Slack destination. FORM_SLACK_WEBHOOK is this client's own channel and takes
// precedence for BOTH submissions and failures; FORM_ALERT_SLACK_URL is the
// shared fallback for clients without a channel of their own.
const SLACK_WEBHOOK =
  import.meta.env.FORM_SLACK_WEBHOOK || import.meta.env.FORM_ALERT_SLACK_URL;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data    = await request.formData();
    const honeypot = data.get("website")?.toString() ?? "";
    if (honeypot) {
      // Bot filled the honeypot field — silently discard
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    const name    = data.get("name")?.toString().trim()    ?? "";
    const email   = data.get("email")?.toString().trim()   ?? "";
    const company = data.get("company")?.toString().trim() ?? "";
    const source  = data.get("source")?.toString().trim()  ?? "";
    const intent  = data.get("intent")?.toString().trim()  ?? "";

    // Route the notification to the right inbox by intent (falls back to default).
    const notifyTo = EMAIL_CONFIG.routes[intent] ?? EMAIL_CONFIG.notify;

    const phone   = data.get("phone")?.toString().trim()   ?? "";
    const message = data.get("message")?.toString().trim() ?? "";
    const ref     = data.get("ref")?.toString().trim()     ?? "";

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        { status: 400 }
      );
    }

    // Per-intent content (subject + submitter confirmation) — see email.config.ts.
    const intentCfg = EMAIL_CONFIG.intents[intent] ?? EMAIL_CONFIG.intents.default;

    // Structured per-intent answers, sent by the form as a labeled list. Render
    // EVERY field with its real label — this is the fix for "only Name/Email show".
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let detailFields: { label: string; value: string }[] = [];
    try {
      const parsed = JSON.parse(data.get("fieldsJson")?.toString() ?? "[]");
      if (Array.isArray(parsed)) {
        detailFields = parsed
          .filter((f) => f && typeof f.label === "string")
          .map((f) => ({ label: String(f.label), value: String(f.value ?? "").trim() }));
      }
    } catch { /* ignore malformed fieldsJson */ }
    const detailRows = detailFields
      .map((f) =>
        `<tr><td style="padding:4px 14px 4px 0;color:#888;white-space:nowrap;vertical-align:top"><strong>${esc(f.label)}</strong></td><td style="padding:4px 0">${f.value ? esc(f.value) : "—"}</td></tr>`)
      .join("");

    // Internal notification — alerts Slack + admin email if the send fails (then re-throws → 500)
    // The error is held rather than thrown so the Slack log below still runs;
    // it is re-thrown straight after, so the form still gets its 500.
    let notifyError: unknown = null;
    try {
      await sendWithAlert(
        {
          client: "Tidewater",
          formName: `${intentCfg.label}${intent ? ` (${intent})` : ""}`,
          slackWebhookUrl: SLACK_WEBHOOK,
          alertEmail: { apiKey: import.meta.env.RESEND_API_KEY, to: "admin@alloygp.co", from: EMAIL_CONFIG.from.notifications },
        },
        () => resend.emails.send({
        from:    EMAIL_CONFIG.from.notifications,
        replyTo: EMAIL_CONFIG.replyTo,
        to:      notifyTo,
        subject: intentCfg.notifySubject(company || name),
        html: `
          <h2>${esc(intentCfg.label)}</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          ${phone   ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
          ${company ? `<p><strong>Company / community:</strong> ${esc(company)}</p>` : ""}
          ${detailRows ? `<table style="border-collapse:collapse;margin:14px 0;font-size:14px">${detailRows}</table>` : ""}
          ${message ? `<p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>` : ""}
          <hr><p style="color:#888;font-size:12px">${ref ? `Ref ${esc(ref)} · ` : ""}Form: ${esc(intent || "lead")}${source ? ` · Source ${esc(source)}` : ""}</p>
        `,
        })
      );
    } catch (err) {
      notifyError = err;
    }

    // Log the lead to the client's Slack channel — see contact.ts for why this
    // posts even when the email failed.
    await notifySubmission({
      client: EMAIL_CONFIG.brand.name,
      slackWebhookUrl: SLACK_WEBHOOK,
      route: intentCfg?.label ?? "Lead form",
      formName: `${intent || "lead"} form → ${[notifyTo].flat().join(", ")}`,
      delivered: !notifyError,
      fields: fieldsFromFormData(data),
    });

    if (notifyError) throw notifyError;

    // Confirmation to submitter — per-intent subject + body
    const firstName = name.split(" ")[0] || name;
    const { error: confirmError } = await resend.emails.send({
      from:    EMAIL_CONFIG.from.hello,
      replyTo: EMAIL_CONFIG.replyTo,
      to:      email,
      subject: intentCfg.confirmSubject,
      html:    intentCfg.confirmBody(firstName, EMAIL_CONFIG.brand.url),
    });
    if (confirmError) console.error("Resend confirm error:", confirmError);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
};
