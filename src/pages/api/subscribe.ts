export const prerender = false;

// src/pages/api/subscribe.ts
// Newsletter subscribe handler.
// Fields expected: email, firstName (optional), audience (optional).
//
// Subscribers are written to a Google Sheet via src/lib/sheets.ts, not to
// Mailchimp. See scripts/google-apps-script/newsletter-sheet.gs for the sheet
// side and the env vars it needs.

import type { APIRoute } from "astro";
import { Resend } from "resend";
import { EMAIL_CONFIG } from "../../lib/email.config";
import { sendWithAlert, notifySubmission, fieldsFromFormData } from "../../lib/form-alert";
import { appendSubscriber, AUDIENCE_LABELS } from "../../lib/sheets";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
// Two Slack destinations, deliberately separate.
//   FORM_SLACK_WEBHOOK    this client's own channel — every submission is
//                         logged here, so the channel is a running record of
//                         what the site produced.
//   FORM_ALERT_SLACK_URL  the monitoring channel — only failures, so a broken
//                         form is not buried in a feed of normal traffic.
// Each falls back to the other, so a missing var loses the split but never
// loses the message.
const SLACK_WEBHOOK =
  import.meta.env.FORM_SLACK_WEBHOOK || import.meta.env.FORM_ALERT_SLACK_URL;
const ALERT_WEBHOOK =
  import.meta.env.FORM_ALERT_SLACK_URL || import.meta.env.FORM_SLACK_WEBHOOK;

/** Path portion of the Referer header, or "" if absent/unparseable. */
function refererPath(request: Request): string {
  const ref = request.headers.get("referer");
  if (!ref) return "";
  try {
    return new URL(ref).pathname;
  } catch {
    return "";
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data      = await request.formData();
    const honeypot = data.get("website")?.toString() ?? "";
    if (honeypot) {
      // Bot filled the honeypot field — silently discard
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    const email     = data.get("email")?.toString().trim()     ?? "";
    const firstName = data.get("firstName")?.toString().trim() ?? "";
    // Which list the subscriber picked, from the newsletter band's radio group.
    // Written to the sheet's "List" column; sheets.ts maps it to a label.
    const audience  = data.get("audience")?.toString().trim()  ?? "";
    // Which page the form was on — the band appears on several. The form posts
    // it explicitly; Referer is the fallback. NOT url.pathname, which on an API
    // route is always /api/subscribe.
    const source    = data.get("source")?.toString().trim() || refererPath(request);
    const audienceLabel = audience ? (AUDIENCE_LABELS[audience] ?? audience) : "";

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required." }),
        { status: 400 }
      );
    }

    // Google Sheet append. Resubscribing updates the existing row rather than
    // duplicating it — the dedupe lives in the Apps Script.
    //
    // A failure here does NOT fail the request: the address is still captured by
    // the Slack log and the internal notification email below, so the lead is
    // recoverable. It is surfaced as `delivered: false` on the Slack post
    // instead, which is what makes it visible.
    const sheet = await appendSubscriber({ email, firstName, audience, source });
    if (!sheet.ok && !sheet.skipped) {
      console.error("Sheets subscribe error:", sheet.error);
    }

    // Internal notification — alerts on failure.
    // Wrapped so a failed notify can't break the subscriber's success response.
    let notified = true;
    try {
      await sendWithAlert(
        {
          client: "Tidewater",
          formName: "Newsletter signup",
          slackWebhookUrl: SLACK_WEBHOOK,
          alertWebhookUrl: ALERT_WEBHOOK,
          alertEmail: { apiKey: import.meta.env.RESEND_API_KEY, to: "admin@alloygp.co", from: EMAIL_CONFIG.from.notifications },
        },
        () => resend.emails.send({
          from:    EMAIL_CONFIG.from.notifications,
          replyTo: EMAIL_CONFIG.replyTo,
          to:      EMAIL_CONFIG.notify,
          subject: `New newsletter signup: ${email}`,
          html:    `<h2>New Newsletter Signup</h2><p><strong>Email:</strong> ${email}</p>${firstName ? `<p><strong>Name:</strong> ${firstName}</p>` : ""}${audienceLabel ? `<p><strong>Type:</strong> ${audienceLabel}</p>` : ""}`,
        })
      );
    } catch (notifyError) {
      notified = false;
      console.error("Resend notify error:", notifyError);
    }

    // Log the sign-up to the client's Slack channel.
    await notifySubmission({
      client: EMAIL_CONFIG.brand.name,
      slackWebhookUrl: SLACK_WEBHOOK,
      route: "Newsletter sign-up",
      formName: `Newsletter form → ${[EMAIL_CONFIG.notify].flat().join(", ")}`,
      delivered: notified && sheet.ok,
      fields: [
        ...fieldsFromFormData(data),
        ["Sheet", sheet.ok ? "row written" : sheet.skipped ? "not configured" : `FAILED — ${sheet.error}`],
      ],
    });

    // Welcome email to subscriber
    const { error: welcomeError } = await resend.emails.send({
      from:    EMAIL_CONFIG.from.hello,
      replyTo: EMAIL_CONFIG.replyTo,
      to:      email,
      subject: EMAIL_CONFIG.copy.subscribe.confirmSubject,
      html:    EMAIL_CONFIG.copy.subscribe.confirmBody(firstName),
    });
    if (welcomeError) console.error("Resend welcome error:", welcomeError);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
};
