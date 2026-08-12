export const prerender = false;

// src/pages/api/contact.ts
// Generic contact form handler — reads all client-specific values from email.config.ts.
// Fields expected: name, email, message, subscribe (optional), source (optional honeypot/meta).

import type { APIRoute } from "astro";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { EMAIL_CONFIG } from "../../lib/email.config";
import { sendWithAlert, notifySubmission, fieldsFromFormData } from "../../lib/form-alert";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
// Slack destination. FORM_SLACK_WEBHOOK is this client's own channel and takes
// precedence for BOTH submissions and failures; FORM_ALERT_SLACK_URL is the
// shared fallback for clients without a channel of their own.
const SLACK_WEBHOOK =
  import.meta.env.FORM_SLACK_WEBHOOK || import.meta.env.FORM_ALERT_SLACK_URL;


mailchimp.setConfig({
  apiKey:  import.meta.env.MAILCHIMP_API_KEY,
  server:  import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data      = await request.formData();
    const honeypot = data.get("website")?.toString() ?? "";
    if (honeypot) {
      // Bot filled the honeypot field — silently discard
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    const name      = data.get("name")?.toString().trim()      ?? "";
    const email     = data.get("email")?.toString().trim()     ?? "";
    const message   = data.get("message")?.toString().trim()   ?? "";
    const subscribe = data.get("subscribe") === "true";
    const source    = data.get("source")?.toString().trim()    ?? "";

    if (!email || !name || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400 }
      );
    }

    // Internal notification — alerts Slack + admin email if the send fails (then re-throws → 500)
    // The error is held rather than thrown so the Slack log below still runs;
    // it is re-thrown straight after, so the form still gets its 500.
    let notifyError: unknown = null;
    try {
      await sendWithAlert(
        {
          client: "Tidewater",
          formName: "Contact form",
          slackWebhookUrl: SLACK_WEBHOOK,
          alertEmail: { apiKey: import.meta.env.RESEND_API_KEY, to: "admin@alloygp.co", from: EMAIL_CONFIG.from.notifications },
        },
        () => resend.emails.send({
          from:    EMAIL_CONFIG.from.notifications,
          replyTo: EMAIL_CONFIG.replyTo,
          to:      EMAIL_CONFIG.routes.contact ?? EMAIL_CONFIG.notify,
          subject: `New contact form submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <p><strong>Subscribe:</strong> ${subscribe ? "Yes" : "No"}</p>
            ${source ? `<hr><p style="color:#888;font-size:13px"><strong>Source</strong><br>${source.replace(/\n/g, "<br>")}</p>` : ""}
          `,
        })
      );
    } catch (err) {
      notifyError = err;
    }

    // Log the submission to the client's Slack channel, whether or not the email
    // went out. On the happy path it is the running record of what the site
    // produced; when the send failed it is the *only* copy of what someone
    // typed, so it posts either way and says which of the two it is.
    await notifySubmission({
      client: EMAIL_CONFIG.brand.name,
      slackWebhookUrl: SLACK_WEBHOOK,
      route: "Contact form",
      formName: `Contact form → ${[EMAIL_CONFIG.routes.contact ?? EMAIL_CONFIG.notify].flat().join(", ")}`,
      delivered: !notifyError,
      fields: fieldsFromFormData(data),
    });

    if (notifyError) throw notifyError;

    // Confirmation to submitter
    const { error: confirmError } = await resend.emails.send({
      from:    EMAIL_CONFIG.from.hello,
      replyTo: EMAIL_CONFIG.replyTo,
      to:      email,
      subject: EMAIL_CONFIG.copy.contact.confirmSubject,
      html:    EMAIL_CONFIG.copy.contact.confirmBody(name, EMAIL_CONFIG.brand.url),
    });
    if (confirmError) console.error("Resend confirm error:", confirmError);

    // Optional Mailchimp list sync
    if (subscribe && EMAIL_CONFIG.mailchimp.enabled) {
      try {
        await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
          email_address: email,
          status:        "subscribed",
          merge_fields:  { FNAME: name.split(" ")[0] },
        });
      } catch (err: any) {
        console.error("Mailchimp opt-in error:", err?.response?.body ?? err);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
};
