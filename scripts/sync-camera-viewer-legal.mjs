// Copies the Camera Viewer legal documents from the app source (LegalTexts.cs) into src/data/camera-viewer-legal.json.
// The text on this site must stay word-for-word identical to the in-app text (Samsung and the app's own
// notice rely on that), so never edit the JSON by hand: change LegalTexts.cs, then run `npm run sync:legal`.
//
//   npm run sync:legal                      (uses the default path below)
//   LEGAL_TEXTS_CS=D:\path\LegalTexts.cs npm run sync:legal
import { readFileSync, writeFileSync } from "node:fs";

const src =
  process.env.LEGAL_TEXTS_CS ??
  "C:/WorkLocal/TizenDotnet/groverhqcctv/groverhqcctv/LegalTexts.cs";
const out = new URL("../src/data/camera-viewer-legal.json", import.meta.url);

const cs = readFileSync(src, "utf8").replace(/\r\n/g, "\n");
const version = /const string Version = "([^"]+)"/.exec(cs)?.[1];
if (!version) throw new Error("Version constant not found in " + src);

// C# verbatim strings: @"..." where "" is a literal quote.
const grab = (name) => {
  const m = new RegExp(`const string ${name} = @"((?:[^"]|"")*)";`).exec(cs);
  if (!m) throw new Error(`${name} not found in ${src}`);
  return m[1].replace(/""/g, '"');
};

const docs = [
  ["privacy", "PrivacyPolicy"],
  ["terms", "TermsOfUse"],
  ["security", "SecurityPolicy"],
  ["lawful-use", "LawfulUse"],
].map(([slug, name]) => {
  const lines = grab(name).split("\n");
  const title = lines[0].replace(/^GroverHQ Camera Viewer - /, "");
  const effective = lines[1];
  const body = lines.slice(2).join("\n").replace(/^\n+/, "");
  return { slug, title, effective, body };
});

writeFileSync(out, JSON.stringify({ version, documents: docs }, null, 2) + "\n");
console.log(`Wrote ${docs.length} documents (consent version ${version}) from ${src}`);
