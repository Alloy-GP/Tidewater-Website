/**
 * Alloy's copy of every form notification — a monitoring measure, and the
 * reason a shared Alloy inbox used to receive every enquiry this site took.
 *
 * Empty as soon as the site has somewhere in Slack to log submissions (see
 * FORM_SLACK_WEBHOOK, the client's own channel), which is
 * a better record anyway: it carries the whole submission, it doesn't put Alloy
 * on a thread with the client's board, owner or vendor, and it can't be missed
 * in a busy inbox. Until a webhook is set the copies continue, so monitoring is
 * never dropped silently — there is no window where nobody is watching.
 */
const ALLOY_MONITORING: string[] = Boolean(
  import.meta.env.FORM_SLACK_WEBHOOK || import.meta.env.FORM_ALERT_SLACK_URL
)
  ? []
  : ["admin@alloygp.co"];

export const EMAIL_CONFIG = {
  brand: {
    name: "Tidewater Companies",
    url:  "https://tidewaterproperty.com",
    team: "The Tidewater Team",
  },
  // All outbound mail sends from notifications@, displayed as the company name.
  from: {
    notifications: "Tidewater Companies <notifications@tidewaterproperty.com>",
    hello:         "Tidewater Companies <notifications@tidewaterproperty.com>",
  },
  // Replies to any of our emails route to a monitored inbox.
  replyTo: "info@tidewaterproperty.com",
  // Default inbox — used by unknown intents (fallback).
  notify: [
    "info@tidewaterproperty.com",
    ...ALLOY_MONITORING,
  ],
  // Per-intent routing — the intake form sends `intent`; /api/lead routes here.
  // Each value can be one address or several. ALLOY_MONITORING is empty once
  // this site has a Slack channel — see its definition above.
  routes: {
    proposal: ["gwindisch@tidewaterproperty.com", ...ALLOY_MONITORING], // HOA/condo board (bjordan/Brook removed per client)
    rental:   ["cbishop@tidewaterproperty.com", "bjordan@tidewaterproperty.com", ...ALLOY_MONITORING],   // rental owners
    service:  ["logles@tidewaterproperty.com", ...ALLOY_MONITORING],                                     // resident requests
    general:  ["info@tidewaterproperty.com", ...ALLOY_MONITORING],                                       // catch-all (bjordan removed per client)
    contact:  ["bjordan@tidewaterproperty.com", "info@tidewaterproperty.com", ...ALLOY_MONITORING],      // /api/contact
    vendor:   ["vendorcompliance@tidewaterproperty.com", ...ALLOY_MONITORING],                            // vendor bids (per client)
  } as Record<string, string[]>,
  // No mailing-list integration. Newsletter subscribers go to a Google Sheet
  // (src/lib/sheets.ts, set up by
  // scripts/google-apps-script/newsletter-sheet.gs). Proposal-intake leads are
  // delivered by the routed email above plus the Slack log — they are not added
  // to any list.
  // ───────────────────────────────────────────────────────────────────────────
  // PER-INTENT EMAIL CONTENT  (intake form → /api/lead)
  // Everything that should differ by form type is here. The client's spreadsheet
  // maps to these four fields per intent. Each intent key matches the form's
  // intent id (proposal | rental | vendor | service | general). `default` is the
  // fallback for any unknown intent.
  //   • label          → staff-notification heading + used in subject
  //   • notifySubject  → subject line of the STAFF notification email
  //   • confirmSubject → subject line of the email the SUBMITTER receives
  //   • confirmBody    → body (HTML) of the email the SUBMITTER receives
  // (Recipient routing per intent lives in `routes` above.)
  // ───────────────────────────────────────────────────────────────────────────
  intents: {
    proposal: {
      label: "Proposal Request",
      notifySubject: (who: string) => `New proposal request — ${who}`,
      confirmSubject: "We received your proposal request — Tidewater Property Management",
      confirmBody: () =>
        `<p>Thank you for reaching out to Tidewater Property Management regarding your community's management needs.</p>
        <p>We've received your proposal request and appreciate the opportunity to learn more about your association. Our team is dedicated to delivering proactive, full-service community management—including financial management, vendor coordination, governance support, and responsive homeowner communication—to help boards operate efficiently and communities thrive.</p>
        <p>A member of our Business Development team will review your submission and follow up with you within the next 1-2 business days to learn more about your goals and discuss how we can best support your board and community members.</p>
        <p>We look forward to connecting with you.</p>
        <p>Best regards,<br>Tidewater Property Management</p>`,
    },
    rental: {
      label: "Rental Management Inquiry",
      notifySubject: (who: string) => `New rental management inquiry — ${who}`,
      confirmSubject: "We received your rental request — Tidewater Rental Team",
      confirmBody: () =>
        `<p>Thank you for contacting Tidewater Property Management about your rental property.</p>
        <p>We've received your inquiry and appreciate the opportunity to learn more about your needs. Our rental management team specializes in comprehensive services designed to maximize your rental income while minimizing the day-to-day demands of property ownership—from marketing and tenant screening to maintenance coordination and financial reporting.</p>
        <p>A member of our team will review your submission and reach out within the next 1-2 business days to discuss your property and how we can best support your goals.</p>
        <p>We look forward to connecting with you.</p>
        <p>Best regards,<br>Tidewater Property Management</p>`,
    },
    vendor: {
      label: "Vendor / Bid Submission",
      notifySubject: (who: string) => `New vendor submission — ${who}`,
      confirmSubject: "We received your vendor inquiry — Tidewater Property Management",
      confirmBody: () =>
        `<p>Thank you for your interest in partnering with Tidewater Property Management.</p>
        <p>We've received your vendor inquiry and appreciate your interest in working with our team. We're committed to building strong partnerships with qualified, reliable vendors who help us deliver high-quality service across the communities and properties we manage.</p>
        <p>Our team will review your submission and reach out within the next 1-2 business days regarding next steps, including any additional information that may be needed as part of our vendor onboarding and approval process.</p>
        <p>We look forward to the opportunity to work together.</p>
        <p>Best regards,<br>Tidewater Property Management</p>`,
    },
    service: {
      label: "Maintenance Proposal Request",
      notifySubject: (who: string) => `New maintenance proposal request — ${who}`,
      confirmSubject: "We received your maintenance proposal request — Tidewater Maintenance Team",
      confirmBody: () =>
        `<p>Thank you for reaching out to Tidewater Property Management about maintenance for your property.</p>
        <p>We've received your request for a maintenance proposal and appreciate the opportunity to learn more about the work you're considering. Our maintenance team handles everything from routine repairs and preventative upkeep to larger home-improvement projects—with reliable, vetted crews and clear, up-front quotes.</p>
        <p>A member of our team will review your request and follow up within the next 1-2 business days to discuss the scope and provide a quote.</p>
        <p>We look forward to working with you.</p>
        <p>Best regards,<br>Tidewater Property Management</p>`,
    },
    general: {
      label: "General Inquiry",
      notifySubject: (who: string) => `New general inquiry — ${who}`,
      confirmSubject: "We received your message — Tidewater Property Management",
      confirmBody: () =>
        `<p>Thank you for reaching out to Tidewater Property Management.</p>
        <p>We've received your message and appreciate you taking the time to get in touch. Whether your question is about community association management, rental services, or real estate, we're glad to help and will point you to the right team.</p>
        <p>A member of our team will review your message and follow up with you within the next 1-2 business days.</p>
        <p>We look forward to connecting with you.</p>
        <p>Best regards,<br>Tidewater Property Management</p>`,
    },
    default: {
      label: "Inquiry",
      notifySubject: (who: string) => `New inquiry — ${who}`,
      confirmSubject: "We received your message — Tidewater Property Management",
      confirmBody: () =>
        `<p>Thank you for reaching out to Tidewater Property Management.</p>
        <p>We've received your message and a member of our team will follow up with you within the next 1-2 business days.</p>
        <p>We look forward to connecting with you.</p>
        <p>Best regards,<br>Tidewater Property Management</p>`,
    },
  } as Record<string, {
    label: string;
    notifySubject: (who: string) => string;
    confirmSubject: string;
    confirmBody: (firstName: string, siteUrl: string) => string;
  }>,
  copy: {
    contact: {
      confirmSubject: "We received your message — Tidewater Companies",
      confirmBody: (name: string, _siteUrl: string) =>
        `<p>Hi ${name},</p>
        <p>Thanks for reaching out. Our team will be in touch within one business day.</p>
        <p>— The Tidewater Team</p>`,
    },
    subscribe: {
      confirmSubject: "You're subscribed — Tidewater Board Memo",
      confirmBody: (name: string) =>
        `<p>Hi${name ? ` ${name}` : ""},</p>
        <p>You're on the list. The monthly board memo lands the first Tuesday of each month — practical HOA governance, Maryland law updates, and reserve study deep-dives. No fluff.</p>
        <p>— The Tidewater Team</p>`,
    },
  },
};
