// Renders the on-brand banner/OG images from tools/brand/banner.html with headless Chrome/Edge.
//   node scripts/build-brand.mjs            -> site images only (public/og-image.png)
//   node scripts/build-brand.mjs --social   -> also the social size set into the OneDrive brand folder
// Override the output folder with env BRAND_OUT (default: C:/OneDrive/GroverHQ/Brand Assets/Banners_v2).
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const template = resolve(root, "tools/brand/banner.html");

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const browser = process.env.CHROME_PATH ?? BROWSERS.find(existsSync);
if (!browser) throw new Error("No Chrome/Edge found; set CHROME_PATH");

function render(out, w, h, mode, extra = "") {
  mkdirSync(dirname(out), { recursive: true });
  const url = `${pathToFileURL(template).href}?w=${w}&h=${h}&mode=${mode}${extra}`;
  const r = spawnSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${w},${h}`,
      "--virtual-time-budget=8000",
      `--screenshot=${out}`,
      url,
    ],
    { encoding: "utf8" },
  );
  if (r.status !== 0 || !existsSync(out)) throw new Error(`render failed: ${out}\n${r.stderr}`);
  console.log("wrote", out, `${w}x${h}`);
}

// Site images
render(resolve(root, "public/og-image.png"), 1200, 630, "og");

if (process.argv.includes("--social")) {
  const out = process.env.BRAND_OUT ?? "C:/OneDrive/GroverHQ/Brand Assets/Banners_v2";
  const sizes = [
    ["OpenGraph_1200x630.png", 1200, 630, "og", ""],
    ["OpenGraph_Square_1200x1200.png", 1200, 1200, "og", "&s=1.3"],
    ["GitHub_Social_Preview_1280x640.png", 1280, 640, "card", ""],
    ["LinkedIn_Banner_1584x396.png", 1584, 396, "strip", "&offset=1"],
    ["GitHub_Profile_Banner_1584x396.png", 1584, 396, "strip", ""],
    ["X_Header_1500x500.png", 1500, 500, "strip", "&offset=1"],
    ["Facebook_Cover_1640x624.png", 1640, 624, "strip", ""],
    ["YouTube_Banner_2560x1440.png", 2560, 1440, "youtube", ""],
  ];
  for (const [name, w, h, mode, extra] of sizes) render(resolve(out, name), w, h, mode, extra);
}
