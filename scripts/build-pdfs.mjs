// Builds the two public PDFs from the same data the website uses:
//   public/GroverHQ_Services_Full.pdf          <- src/data/services-catalog.ts + pricing.ts
//   public/Website-Discoverability-Setup.pdf   <- src/data/pricing.ts + the copy below
// Rendered with headless Chrome/Edge (set CHROME_PATH to override). Run: npm run build:pdfs
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = resolve(root, "tools/pdf/.tmp");
mkdirSync(tmp, { recursive: true });

const pricing = await import(pathToFileURL(resolve(root, "src/data/pricing.ts")).href);
const { CATALOG, ADS_BULLETS } = await import(
  pathToFileURL(resolve(root, "src/data/services-catalog.ts")).href
);
const { PACKAGES, FOUND_SERVICES, ADS_SERVICES, ADDON_SERVICES, inr, discountPct } = pricing;

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const browser = process.env.CHROME_PATH ?? BROWSERS.find(existsSync);
if (!browser) throw new Error("No Chrome/Edge found; set CHROME_PATH");

const CONTACT = { web: "groverhq.com", phone: "+91 98782 36480", wa: "wa.me/919878236480", email: "info@groverhq.com", place: "Sector 68, Mohali" };
const wordmark = pathToFileURL(resolve(root, "tools/brand/assets/wordmark-light.png")).href;
const css = pathToFileURL(resolve(root, "tools/pdf/pdf.css")).href;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const per = (i) => (i.per ? " / month" : i.from ? "" : " one-time");

const page = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${css}">
<style>:root{--foot-left:"GroverHQ  ·  ${esc(title)}";--foot-right:"${CONTACT.web}  ·  ${CONTACT.phone}";}</style></head><body>
${body}</body></html>`;

const cover = (title, sub) => `<section class="dark-page">
  <img class="logo" src="${wordmark}" alt="GroverHQ">
  <div class="bar"></div>
  <h1>${title}</h1>
  <p class="sub">${sub}</p>
  <div class="chips">Web • Apps • Bots • Automation • AI</div>
  <div class="foot"><span><b>${CONTACT.web}</b></span><span>${CONTACT.place} · ${CONTACT.phone}</span></div>
</section>`;

const back = (heading, line) => `<section class="dark-page last">
  <img class="logo" src="${wordmark}" alt="GroverHQ" style="width:70mm">
  <div class="bar"></div>
  <h1>${heading}</h1>
  <p class="sub">${line}</p>
  <div class="cta-row">
    <div class="cta"><small>WhatsApp</small><span>${CONTACT.phone}</span></div>
    <div class="cta"><small>Website</small><span>${CONTACT.web}</span></div>
    <div class="cta"><small>Email</small><span>${CONTACT.email}</span></div>
  </div>
  <div class="foot"><span>Digital Solutions for Modern Businesses</span><span>${CONTACT.place}</span></div>
</section>`;

function renderPdf(name, html, out) {
  const htmlPath = resolve(tmp, `${name}.html`);
  writeFileSync(htmlPath, html);
  const r = spawnSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${out}`,
      pathToFileURL(htmlPath).href,
    ],
    { encoding: "utf8" },
  );
  if (r.status !== 0 || !existsSync(out)) throw new Error(`pdf failed: ${out}\n${r.stderr}`);
  console.log("wrote", out);
}

/* ------------------------------------------------------------------ */
/* Services menu                                                       */
/* ------------------------------------------------------------------ */
function servicesPdf() {
  const sections = [];
  const web = CATALOG.find((s) => s.id === "websites");
  const rest = CATALOG.filter((s) => s.id !== "websites");
  sections.push(web);
  sections.push({
    id: "ads",
    title: "Ads & Lead Generation",
    note: "Ad budget is separate and paid directly to Google/Meta.",
    ads: true,
    items: ADS_SERVICES.filter((i) => i.id !== "landing-pages").map((i) => ({
      name: i.name,
      price: i.price,
      per: i.per,
      bullets: ADS_BULLETS[i.id],
    })),
  });
  sections.push(...rest);

  const body = sections
    .map((s, si) => {
      const cards = s.items
        .map((it, ii) => {
          const price = s.ads
            ? `${inr(it.price)}<small>${it.per ? " / month" : " one-time"}</small>`
            : `<small>Starting at</small> ${inr(it.price)}+`;
          return `<div class="card"><h3><span class="idx">${si + 1}.${ii + 1}</span>${esc(it.pdfName ?? it.name)}</h3>
<ul>${it.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul><div class="price">${price}</div></div>`;
        })
        .join("");
      return `<div class="sec-block${s.ads ? " ads" : ""}"><h2 class="sec"><span class="n">${si + 1}</span>${esc(s.title)}</h2>
${s.note ? `<p class="sec-note">${esc(s.note)}</p>` : ""}<div class="grid">${cards}</div></div>`;
    })
    .join("");

  const intro = `<p class="sec-note" style="margin:0 0 6mm">Starting prices in Indian rupees; the final quote depends on scope. Current pricing and packages: ${CONTACT.web}/services/ and ${CONTACT.web}/packages/.</p>`;
  renderPdf(
    "services",
    page(
      "GroverHQ Services Menu",
      cover("Services<br>Menu", "Websites, ads, automation, CRM, integrations, internal tools and AI workflows for growing businesses.") +
        intro +
        body +
        back("Let’s build yours.", "Tell us what you need on WhatsApp. We’ll reply with scope and a clear quote."),
    ),
    resolve(root, "public/GroverHQ_Services_Full.pdf"),
  );
}

/* ------------------------------------------------------------------ */
/* Website + Discoverability Setup                                     */
/* ------------------------------------------------------------------ */
const SETUP = {
  build: [
    ["Google Business Profile Optimization", ["Categories & services setup", "Keyword-rich business description", "Photo & listing improvements", "Google Maps pin & radius optimization", "NAP (Name, Address, Phone) consistency check", "Google Business Profile health monitoring"]],
    ["Static SEO-Optimized Website", ["Home, Products/Services, About, Contact pages", "Integrated Google Maps preview", "Curated showcase for selected products or projects", "High-conversion CTAs", "WhatsApp-first enquiry flow", "Fast, lightweight static build", "Mobile-first responsive design", "Clean, modern layout", "Includes 2 rounds of revisions", "Hosting paid by GroverHQ", "Domain owned by the client; GroverHQ assists with purchase and technical setup"]],
    ["Complete SEO Foundation Setup", ["Meta titles & descriptions", "Geo-targeted local keyword injection", "Header hierarchy", "Image optimization & SEO alt tags", "Sitemap & robots.txt", "Google Search Console setup & indexing", "JSON Schema setup"]],
  ],
  maintenance: [
    ["Google Business Profile Management", ["Review responses (weekly)", "Media uploads (weekly)", "Google Business Posts (monthly)", "Google Business Profile health checks", "Keyword alignment for categories & services", "NAP consistency monitoring", "Geo-targeted ranking check (5–10 keywords)", "Duplicate listing check (quarterly)", "Spam review removal assistance (if flagged)"]],
    ["Website Technical & SEO Maintenance", ["Uptime & security monitoring", "SSL & hosting health checks", "Speed test", "Broken links check", "Error log scan", "Image compression checks", "Mobile responsiveness check (quarterly)", "Minor SEO fixes (titles, descriptions, alt tags, headings)", "Internal linking fixes", "Sitemap & robots validation", "Indexing checks & Search Console review", "Schema basics validation", "Fixing small content errors (typos, spacing, formatting)", "Improvement suggestions"]],
    ["Reporting", ["Weekly mini-reports", "Quarterly full report", "Insights analysis (calls, direction requests, profile views)"]],
  ],
  exclusions: ["Custom app backend or software development", "Dynamic, custom-built web portals (see add-ons)", "UI redesigns of the base template", "New pages, sections, or features outside the agreed scope"],
  upgrade: ["Modular system: add-ons can be added anytime", "No part of the initial build is wasted", "Upgrades delivered as independent mini-projects"],
  timeline: ["Go-live: 3 weeks from receiving content (logo, images, text)", "Google Business Profile optimization runs in parallel with the build", "Weekly progress updates"],
  payment: ["50% advance, 50% on delivery (one-time build)", "Ongoing maintenance billed monthly", `Current pricing is always at ${CONTACT.web}/packages/`],
  addons: [
    ["E-Commerce Store (Lite)", "up to 25 products, WhatsApp-first checkout, manual shipping"],
    ["E-Commerce Store (Full)", "full catalog, cart + checkout, payment gateway, shipping/taxes"],
    ["Payment Gateway Integration", "accept online payments directly (Razorpay, etc.)"],
    ["Appointment Booking + Google Meet", "online scheduling with automatic links"],
    ["Customer Login Portal", "accounts, order history, saved details"],
    ["Blog / Content Management", "for businesses that want to publish regularly"],
    ["Multi-Language Support", "serve visitors in more than one language"],
    ["Live Chat Widget", "an on-site chat option beyond WhatsApp"],
    ["Loyalty & Rewards Program", "points, referrals, repeat-customer incentives"],
    ["Advanced Analytics Dashboard", "deeper reporting than standard Search Console"],
    ["Inventory Management", "stock tracking and low-stock alerts for product-based businesses"],
    ["Staff Scheduling", "shift planning and roster management for team-based businesses"],
    ["Custom Quotation / Invoice Generator", "generate branded PDF quotes and invoices"],
  ],
};

const rateRow = (i) => `<tr><td>${esc(i.name)}</td><td class="r"><span class="mrp">${inr(i.mrp)}</span><span class="amt">${i.from ? "from " : ""}${inr(i.price)}</span><span class="off">${discountPct(i)}% off${i.per ? " · per month" : i.from ? "" : " · one-time"}</span></td></tr>`;
const rateTable = (items) => `<table class="rates"><thead><tr><th>Service</th><th class="r">Price</th></tr></thead><tbody>${items.map(rateRow).join("")}</tbody></table>`;
const groups = (g) => `<div class="groups">${g.map(([t, l]) => `<div class="group"><h3>${esc(t)}</h3><ul>${l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>`;
const plain = (l) => `<ul class="plain">${l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

function setupPdf() {
  const s = PACKAGES.setup;
  const m = PACKAGES.maintenance;
  const pkgs = `<div class="pkgs">
<div class="pkg"><small>One-time</small><h3>Website + Discoverability Setup</h3>
<div class="big">${inr(s.price)}<span class="mrp">${inr(s.mrp)}</span></div><span class="badge">${discountPct(s)}% off</span>
<ul><li>Fast, SEO-optimized website, hosting included</li><li>Full Google Business Profile setup &amp; optimization</li><li>WhatsApp-first enquiry flow, mobile-first design</li><li>Live within 3 weeks of receiving content</li><li>First month of maintenance free</li></ul></div>
<div class="pkg"><small>Ongoing</small><h3>GBP + Website Maintenance</h3>
<div class="big">${inr(m.price)}<span class="per"> / month</span><span class="mrp">${inr(m.mrp)}</span></div><span class="badge">${discountPct(m)}% off</span>
<ul><li>Weekly Google Business Profile management</li><li>Ongoing website technical &amp; SEO maintenance</li><li>Search Console review &amp; indexing checks</li><li>Weekly mini-reports + quarterly full report</li></ul></div></div>`;

  const body =
    cover("Website +<br>Discoverability<br>Setup", "A fast, SEO-optimized website paired with a fully optimized Google Business Profile, so your business is found on Search and Maps.") +
    pkgs +
    `<div class="bonus">Included bonus: first month of GBP + Website Maintenance is free with the one-time build.</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">1</span>Website + Discoverability Build · one-time</h2>${groups(SETUP.build)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">2</span>GBP Management + Website Maintenance · monthly</h2>${groups(SETUP.maintenance)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">3</span>Exclusions</h2>${plain(SETUP.exclusions)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">4</span>Upgrade policy</h2>${plain(SETUP.upgrade)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">5</span>Timeline &amp; delivery</h2>${plain(SETUP.timeline)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">6</span>Payment terms</h2>${plain(SETUP.payment)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">7</span>Individual services</h2><p class="sec-note">Don’t need the full bundle? Pick just what you need. “From” prices are starting prices; the final quote depends on scope.</p>${rateTable(FOUND_SERVICES)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">8</span>Get leads: paid ads &amp; automation</h2><p class="sec-note">Ad budget is separate and paid directly to Google/Meta. Ads Setup &amp; Tracking is charged once; Google Ads and Meta Ads management are monthly.</p>${rateTable(ADS_SERVICES)}<h3 class="sub">Add-ons to convert more leads</h3>${rateTable(ADDON_SERVICES)}</div>` +
    `<div class="sec-block"><h2 class="sec"><span class="n">9</span>Website add-ons</h2><p class="sec-note">Features beyond the base packages, added as independent mini-projects and quoted to your scope.</p><div class="addons">${SETUP.addons.map(([a, b]) => `<div class="addon"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div></div>` +
    back("Ready to get found?", "Message us on WhatsApp to start. We’ll confirm scope and share the content checklist.");
  renderPdf("setup", page("Website + Discoverability Setup", body), resolve(root, "public/Website-Discoverability-Setup.pdf"));
}

const only = process.argv[2];
if (!only || only === "services") servicesPdf();
if (!only || only === "setup") setupPdf();
