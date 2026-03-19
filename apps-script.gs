// Deploy this as a Google Apps Script Web App
// Steps at the bottom of this file

const SHEET_ID = '1FOfoMyZWRyJU926_T3LWUCirJUlUtV2vFmo78ljvAfA';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Rating', 'Comment']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString(),
      data.rating,
      data.comment || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow CORS preflight
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── HOW TO DEPLOY ───────────────────────────────────────────
// 1. Open your Google Sheet
// 2. Click Extensions → Apps Script
// 3. Delete any existing code, paste this entire file
// 4. Click Deploy → New deployment
// 5. Type: Web app
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy → Copy the Web App URL
// 9. Paste the URL into index.html where it says PASTE_YOUR_APPS_SCRIPT_URL_HERE
