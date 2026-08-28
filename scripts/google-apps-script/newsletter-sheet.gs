/**
 * The Board Brief — newsletter subscriber sink.
 *
 * Receives POSTs from /api/subscribe (see src/lib/sheets.ts) and appends one row
 * per subscriber. Existing emails are updated in place rather than duplicated,
 * so someone resubscribing with a different list choice does not create a
 * second row.
 *
 * ── SETUP (once, ~5 minutes) ────────────────────────────────────────────────
 *  1. Open the Google Sheet that should hold subscribers.
 *  2. Extensions → Apps Script. Delete the placeholder and paste this file.
 *  3. Project Settings → Script properties → Add script property:
 *       TOKEN = <a long random string>
 *     Generate one with:  openssl rand -hex 32
 *  4. Deploy → New deployment → type "Web app":
 *       Execute as:        Me
 *       Who has access:    Anyone
 *     "Anyone" is required — Vercel calls this without a Google identity. The
 *     TOKEN check is what actually guards it, which is why it must be random.
 *  5. Copy the deployment URL (ends in /exec).
 *  6. In Vercel → Project → Settings → Environment Variables, add:
 *       SHEETS_WEBHOOK_URL   = <the /exec URL>
 *       SHEETS_WEBHOOK_TOKEN = <the same TOKEN>
 *     Then redeploy.
 *
 * Re-deploy note: after editing this script, use Deploy → Manage deployments →
 * edit the existing deployment and bump the version. Creating a *new*
 * deployment issues a new URL and SHEETS_WEBHOOK_URL would have to change too.
 */

var SHEET_NAME = 'Subscribers';
var HEADERS = ['Timestamp', 'Email', 'First name', 'List', 'Source page'];

function doPost(e) {
  try {
    var expected = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (!expected) return json({ ok: false, error: 'TOKEN script property not set' });

    var body = JSON.parse(e.postData.contents);
    if (body.token !== expected) return json({ ok: false, error: 'unauthorized' });

    var email = String(body.email || '').trim();
    if (!email) return json({ ok: false, error: 'email is required' });

    // Serialise concurrent submissions; two at once could otherwise read the
    // same row count and write over each other.
    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      var sheet = getSheet();
      var row = [new Date(), email, body.firstName || '', body.audience || '', body.source || ''];
      var existing = findRowByEmail(sheet, email);
      if (existing > 0) {
        sheet.getRange(existing, 1, 1, row.length).setValues([row]);
        return json({ ok: true, updated: true });
      }
      sheet.appendRow(row);
      return json({ ok: true, appended: true });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Visiting the URL in a browser should say something useful, not throw. */
function doGet() {
  return json({ ok: true, message: 'Board Brief subscriber endpoint. POST only.' });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** 1-indexed sheet row for this email, or 0. Case-insensitive. */
function findRowByEmail(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var values = sheet.getRange(2, 2, last - 1, 1).getValues();
  var needle = email.toLowerCase();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim().toLowerCase() === needle) return i + 2;
  }
  return 0;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
