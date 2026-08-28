export const prerender = false;

// src/pages/api/subscribe.ts
// Newsletter subscribe handler.
// Fields expected: email, firstName (optional), audience (optional).

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

// Radio value -> Mailchimp tag. Keys must match the values rendered by
// ResourcesNewsletter.astro; an unrecognised value simply adds no tag.
const AUDIENCE_TAGS: Record<string, string> = {
  board:  "HOA Boards",
  rental: "Rental Owners",
  home:   "Homeowners",
  all:    "All Updates",
};

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
    // Passed to Mailchimp as a tag so segments can be built without needing
    // interest-group IDs wired into the codebase.
    const audience  = data.get("audience")?.toString().trim()  ?? "";

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required." }),
        { status: 400 }
      );
    }

    // Mailchimp list add (handles "already subscribed" gracefully)
    if (EMAIL_CONFIG.mailchimp.enabled) {
      try {
        await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
          email_address: email,
          status:        "subscribed",
          merge_fields:  { FNAME: firstName },
          ...(AUDIENCE_TAGS[audience] ? { tags: [AUDIENCE_TAGS[audience]] } : {}),
        });
      } catch (err: any) {
        const alreadyExists = err?.response?.body?.title === "Member Exists";
        if (!alreadyExists) {
          console.error("Mailchimp subscribe error:", err?.response?.body ?? err);
          return new Response(
            JSON.stringify({ error: "Could not subscribe. Please try again." }),
            { status: 500 }
          );
        }
      }
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
          alertEmail: { apiKey: import.meta.env.RESEND_API_KEY, to: "admin@alloygp.co", from: EMAIL_CONFIG.from.notifications },
        },
        () => resend.emails.send({
          from:    EMAIL_CONFIG.from.notifications,
          replyTo: EMAIL_CONFIG.replyTo,
          to:      EMAIL_CONFIG.notify,
          subject: `New newsletter signup: ${email}`,
          html:    `<h2>New Newsletter Signup</h2><p><strong>Email:</strong> ${email}</p>${firstName ? `<p><strong>Name:</strong> ${firstName}</p>` : ""}${AUDIENCE_TAGS[audience] ? `<p><strong>List:</strong> ${AUDIENCE_TAGS[audience]}</p>` : ""}`,
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
      delivered: notified,
      fields: fieldsFromFormData(data),
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
