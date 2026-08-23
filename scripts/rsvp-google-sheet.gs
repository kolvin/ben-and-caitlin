/**
 * Ben & Caitlin — RSVP intake
 *
 * Receives RSVP submissions from the wedding site and appends each one as a
 * row in this spreadsheet. If a submission's email matches an existing row,
 * that row is overwritten instead — so a guest can resubmit the form later
 * to update their answer rather than create a duplicate.
 *
 * Also serves a "Find My RSVP" lookup (doGet, called via JSONP — Apps
 * Script's CORS headers on GET responses aren't reliable enough for a plain
 * fetch() from another origin) so a guest can pull up and edit their
 * existing answer instead of resubmitting blind.
 *
 * Setup:
 *   1. Create a Google Sheet (e.g. "Ben & Caitlin RSVPs").
 *   2. Extensions > Apps Script. Delete the default boilerplate and paste in
 *      this whole file. Save (File > Save, or Cmd/Ctrl+S).
 *   3. Deploy > New deployment > gear icon > select type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Click Deploy.
 *   4. Google will prompt you to authorize the script (it's accessing your
 *      own sheet) — click through "Authorize access" > pick your account >
 *      "Advanced" > "Go to [project name] (unsafe)" > Allow. This warning is
 *      expected for a personal script that hasn't gone through Google's app
 *      review; it's your own script running under your own account.
 *   5. Copy the Web app URL shown (ends in /exec).
 *   6. Set that URL as PUBLIC_RSVP_SHEET_URL — locally in a .env file, and in
 *      Vercel: Project Settings > Environment Variables (add it for both
 *      Production and Preview environments), then redeploy.
 *
 * Whenever you edit this file, you must publish a new version for the
 * change to take effect: Deploy > Manage deployments > edit (pencil) >
 * Version: New version > Deploy. The URL stays the same.
 */

const HEADERS = ['Last Updated At', 'Name', 'Email', 'Attending', 'Events', 'Dietary', 'Message'];
const MIN_FILL_TIME_MS = 3000; // reject submissions completed faster than this

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);

  const params = (e && e.parameter) || {};

  // Honeypot field — real visitors never see or fill this in, bots often do.
  if (params['bot-field']) {
    return ContentService.createTextOutput('ok');
  }

  // Time trap — the page records when it loaded and sends that timestamp
  // back with the submission. A human takes at least a few seconds to fill
  // the form; a bot that POSTs straight to this URL either omits the field
  // or submits instantly, so both cases get silently dropped here.
  const loadedAt = Number(params.loaded_at);
  if (!loadedAt || Date.now() - loadedAt < MIN_FILL_TIME_MS) {
    return ContentService.createTextOutput('ok');
  }

  const eventsSelected = e && e.parameters && e.parameters['events']
    ? e.parameters['events'].join(', ')
    : '';

  const row = [
    new Date(),
    params.name || '',
    params.email || '',
    params.attending_wedding || '',
    eventsSelected,
    params.dietary || '',
    params.message || '',
  ];

  const email = (params.email || '').trim().toLowerCase();
  const existingRow = email ? findRowByEmail(sheet, email) : -1;

  if (existingRow > 0) {
    sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService.createTextOutput('ok');
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  const email = (params.email || '').trim().toLowerCase();
  const callback = sanitizeCallbackName(params.callback);

  const result = lookupByEmail(email);
  const json = JSON.stringify(result);

  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function lookupByEmail(email) {
  if (!email) return { found: false };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rowIndex = findRowByEmail(sheet, email);
  if (rowIndex < 0) return { found: false };

  const row = sheet.getRange(rowIndex, 1, 1, HEADERS.length).getValues()[0];
  return {
    found: true,
    name: row[1] || '',
    email: row[2] || '',
    attending: row[3] || '',
    events: row[4] ? String(row[4]).split(',').map(s => s.trim()).filter(Boolean) : [],
    dietary: row[5] || '',
    message: row[6] || '',
  };
}

// Only allow safe identifier characters — this is interpolated directly
// into the returned script, so it must never contain attacker-controlled
// syntax. Worst case if bypassed is self-XSS against whoever crafted the
// request, since the response only ever executes in the caller's own page.
function sanitizeCallbackName(name) {
  return name && /^[\w$]+$/.test(name) ? name : null;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
}

// Returns the 1-indexed sheet row whose Email column (C) matches, or -1.
function findRowByEmail(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1; // header row only, no submissions yet

  const emailColumn = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  for (let i = 0; i < emailColumn.length; i++) {
    const existing = (emailColumn[i][0] || '').toString().trim().toLowerCase();
    if (existing === email) {
      return i + 2; // +2: range starts at row 2, i is 0-indexed
    }
  }
  return -1;
}
