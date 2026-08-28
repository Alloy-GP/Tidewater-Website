// src/lib/sheets.ts
//
// Newsletter subscribers go to a Google Sheet, not to Mailchimp.
//
// The write goes through a Google Apps Script web app bound to the sheet
// (scripts/google-apps-script/newsletter-sheet.gs) rather than the Sheets REST
// API. That choice is deliberate: Apps Script needs one env var and no service
// account, no GCP project, no JSON key, and no RSA signing in the serverless
// function. The trade-off is that the deployment URL is unauthenticated, so
// every request carries a shared secret the script checks before appending.
//
// Env:
//   SHEETS_WEBHOOK_URL    the Apps Script deployment URL (.../exec)
//   SHEETS_WEBHOOK_TOKEN  shared secret; must match the script's TOKEN property
//
// With either unset the helper is a no-op that reports `skipped` — the form
// still succeeds and the submission is still logged to Slack and emailed
// internally, so a missing env var loses a row in the sheet but never the lead.

export interface SubscriberRow {
  email: string;
  firstName?: string;
  /** Which list they picked, from the newsletter band's radio group. */
  audience?: string;
  /** Path the form was submitted from, e.g. /resources/newsletter. */
  source?: string;
}

export interface AppendResult {
  ok: boolean;
  /** True when no webhook is configured — not a failure, just nothing to do. */
  skipped?: boolean;
  error?: string;
}

function env(name: string): string | undefined {
  // import.meta.env is how the API routes read config; process.env is the
  // fallback for other runtimes, matching form-alert.ts.
  return (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];
}

/** Human-readable label per radio value; anything unrecognised passes through. */
const AUDIENCE_LABELS: Record<string, string> = {
  board:  'HOA Boards',
  rental: 'Rental Owners',
  home:   'Homeowners',
  all:    'All Updates',
};

export async function appendSubscriber(row: SubscriberRow): Promise<AppendResult> {
  const url = env('SHEETS_WEBHOOK_URL');
  const token = env('SHEETS_WEBHOOK_TOKEN');
  if (!url || !token) {
    console.warn('Sheets append skipped: SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_TOKEN not set');
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      // Apps Script web apps reject a preflight, so keep this a simple request:
      // text/plain avoids CORS preflight while the body stays JSON.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        token,
        email: row.email,
        firstName: row.firstName ?? '',
        audience: row.audience ? (AUDIENCE_LABELS[row.audience] ?? row.audience) : '',
        source: row.source ?? '',
      }),
      // Apps Script answers a first-time deployment slowly; do not hang the
      // request past what a form submit can tolerate.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { ok: false, error: `Sheets webhook returned ${res.status}` };
    }

    // Apps Script always answers 200, including for its own errors, so the
    // body is the only reliable signal.
    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      return { ok: false, error: `Sheets webhook returned non-JSON: ${text.slice(0, 120)}` };
    }
    if (!parsed.ok) {
      return { ok: false, error: parsed.error ?? 'Sheets webhook reported failure' };
    }
    return { ok: true };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
