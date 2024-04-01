// google-sheet-to-tsv.js
// Usage: deno run --allow-net --allow-read --allow-write google-sheet-to-tsv.js <Google-Sheet-URL>

async function downloadGoogleSheetAsTsv(sheetUrl) {
  // Extract Sheet ID and GID from the URL
  const sheetIdMatch = sheetUrl.match(/\/d\/(.*?)(\/|$)/);
  const gidMatch = sheetUrl.match(/gid=(\d+)/);

  if (!sheetIdMatch || !gidMatch) {
    console.error('Invalid URL provided.');
    return;
  }

  const sheetId = sheetIdMatch[1];
  const gid = gidMatch[1];

  // Construct TSV export URL
  const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=tsv&id=${sheetId}&gid=${gid}`;

  try {
    // Fetch the TSV data
    const response = await fetch(exportUrl);
    if (!response.ok) {
      console.error('Failed to download the sheet. Make sure the sheet is publicly accessible.');
      return;
    }
    const tsvData = await response.text();

    // Save the TSV data to a file
    const fileName = `sheet-${sheetId}-gid-${gid}.tsv`;
    await Deno.writeTextFile(fileName, tsvData);
    console.log(`Sheet downloaded and saved as ${fileName}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Main
if (import.meta.main) {
  const url = Deno.args[0];
  if (!url) {
    console.log('Usage: deno run --allow-net --allow-read --allow-write google-sheet-to-tsv.js <Google-Sheet-URL>');
    Deno.exit(1);
  }

  downloadGoogleSheetAsTsv(url);
}
