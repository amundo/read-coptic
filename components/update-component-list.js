// Import required functions from Deno's standard library
import { ensureFile } from "https://deno.land/std/fs/mod.ts";
import { basename, extname, join } from "https://deno.land/std/path/mod.ts";

async function generateComponentList() {
  const components = [];

  // Get directories in the current directory
  for await (const dirEntry of Deno.readDir(".")) {
    if (dirEntry.isDirectory) {
      // Check files in the directory
      for await (const file of Deno.readDir(dirEntry.name)) {
        if (file.isFile) {
          const fileNameWithoutExtension = basename(file.name, extname(file.name));
          // If the file matches the pattern "dirname/dirname.html"
          if (fileNameWithoutExtension === dirEntry.name && extname(file.name) === ".html") {
            components.push(join(dirEntry.name, file.name));
          }
        }
      }
    }
  }

  // Generate and write the HTML file
  const htmlContent = generateHTMLContent(components);
  await ensureFile("component-list.html");
  await Deno.writeTextFile("component-list.html", htmlContent);

  console.log("Component list generated successfully.");
}

function generateHTMLContent(links) {
  let linksHtml = links.map(link => `<li><a href="${link}">${link}</a></li>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component List</title>
</head>
<body>
    <ul>
        ${linksHtml}
    </ul>
</body>
</html>`;
}

generateComponentList();
