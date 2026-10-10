// Builds the School Management System PDF (6 pages, A4) in the same house style as the other menus.
//   node scripts/build-school-pdf.mjs
// Prices and copy come from src/data/school.ts (shared with the website page); this file is layout only.
// Output: public/School-Management-System.pdf (served by the site). If the OneDrive menus folder exists it also
// gets a copy (override with SCHOOL_PDF_COPY, set to "" to skip). Run all PDFs with: npm run build:pdfs
//   SCHOOL_PDF_OUT   override the output path
//   CHROME_PATH      override the Chrome/Edge executable
//   WORDMARK_PATH    override the white wordmark (default tools/brand/assets/wordmark-light.png)
// The script warns if the content spills past 6 pages (a sign a page got too long, e.g. after a copy change).
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = resolve(root, "tools/pdf/.tmp");
mkdirSync(tmp, { recursive: true });

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const browser = process.env.CHROME_PATH ?? BROWSERS.find(existsSync);
if (!browser) throw new Error("No Chrome/Edge found; set CHROME_PATH");

const OUT = process.env.SCHOOL_PDF_OUT ?? resolve(root, "public/School-Management-System.pdf");
const COPY =
  process.env.SCHOOL_PDF_COPY ??
  "C:/OneDrive/GroverHQ/Brand Assets/06_Services_Menus/Current/School-Management-System.pdf";
const wordmark = pathToFileURL(
  process.env.WORDMARK_PATH ?? resolve(root, "tools/brand/assets/wordmark-light.png"),
).href;
const FONT = process.env.FONT_STACK ?? "'Montserrat','Segoe UI',sans-serif";

const TITLE = "School Management System";
const CONTACT = { web: "groverhq.com", phone: "+91 98782 36480", email: "info@groverhq.com", place: "Sector 68, Mohali" };

const {
  SCHOOL_STUDENT_CAP: STUDENT_CAP, SCHOOL_PACKAGES: PACKAGES, SCHOOL_WEBSITE: WEBSITE, SCHOOL_COMPARE: COMPARE,
  SCHOOL_INCLUDED: INCLUDED, SCHOOL_ADDONS: ADDONS, SCHOOL_NOT_INCLUDED: NOT_INCLUDED,
} = await import(pathToFileURL(resolve(root, "src/data/school.ts")).href);

const inr = (n) => "₹" + new Intl.NumberFormat("en-IN").format(n);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

/* ================================================================== */
/* LAYOUT                                                              */
/* ================================================================== */
const CSS = `
  @page { size: A4; margin: 0; }
  :root{ --ink:#0B0D10; --teal:#4EEAD1; --teal-d:#0F9D89; --muted:#5B6573; --line:#E4E7EC; --soft:#F5F7F8; }
  *{ box-sizing:border-box; margin:0; padding:0; }
  html,body{ font-family:${FONT}; color:var(--ink); -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .page{ width:210mm; height:297mm; position:relative; page-break-after:always; background:#fff; padding:14mm 14mm 0 14mm; }
  .page:last-child{ page-break-after:auto; }
  .foot{ position:absolute; left:14mm; right:14mm; bottom:9mm; border-top:1px solid var(--line); padding-top:3.2mm; display:flex; justify-content:space-between; font-size:8.5pt; color:var(--muted); }
  .dark{ background:var(--ink); color:#fff; padding:0; overflow:hidden; }
  .dark .glow1{ position:absolute; right:-40mm; top:-40mm; width:150mm; height:150mm; border-radius:50%; background:radial-gradient(circle, rgba(40,110,105,.55) 0%, rgba(40,110,105,0) 68%); }
  .dark .glow2{ position:absolute; left:-50mm; bottom:-50mm; width:120mm; height:120mm; border-radius:50%; background:radial-gradient(circle, rgba(25,80,75,.40) 0%, rgba(25,80,75,0) 68%); }
  .cover-in{ position:absolute; left:21mm; right:21mm; top:92mm; }
  .cover-in img{ width:92mm; display:block; }
  .bar{ width:25mm; height:1.6mm; border-radius:2mm; background:var(--teal); margin:17mm 0 13mm; }
  .cover-in h1{ font-size:30pt; line-height:1.15; font-weight:700; letter-spacing:-.4px; }
  .cover-in p.sub{ margin-top:7mm; font-size:12.5pt; line-height:1.55; color:#B4B6B9; max-width:150mm; }
  .cover-in p.tags{ margin-top:8mm; font-size:10pt; font-weight:600; color:var(--teal); letter-spacing:.2px; }
  .cover-foot,.end-foot{ position:absolute; left:21mm; right:21mm; bottom:21mm; display:flex; justify-content:space-between; font-size:9pt; color:#B4B6B9; }
  .cover-foot b{ color:var(--teal); font-weight:600; }
  .sec{ display:flex; align-items:center; gap:3.4mm; margin:8mm 0 4.5mm; }
  .sec .n{ width:8mm; height:8mm; border-radius:2.2mm; background:var(--ink); color:#fff; font-size:10pt; font-weight:600; display:flex; align-items:center; justify-content:center; }
  .sec h2{ font-size:16pt; font-weight:700; letter-spacing:-.2px; }
  .sec.first{ margin-top:0; }
  .lede{ font-size:9.6pt; color:var(--muted); line-height:1.5; margin:-1mm 0 4.5mm; }
  .pk{ display:grid; grid-template-columns:repeat(3,1fr); gap:4mm; }
  .pkc{ position:relative; background:var(--ink); color:#fff; border-radius:4mm; padding:5.5mm 5mm; overflow:hidden; }
  .pkc:before{ content:''; position:absolute; right:-20mm; top:-24mm; width:60mm; height:60mm; border-radius:50%; background:radial-gradient(circle, rgba(40,110,105,.45) 0%, rgba(40,110,105,0) 70%); }
  .pkc > *{ position:relative; }
  .pkc .k{ font-size:7.5pt; letter-spacing:1.6px; color:var(--teal); font-weight:600; text-transform:uppercase; }
  .pkc h3{ font-size:11.5pt; font-weight:700; margin-top:2mm; line-height:1.25; }
  .pkc .from{ font-size:7.5pt; color:#B4B6B9; margin-top:3mm; }
  .pkc .price{ font-size:21pt; font-weight:700; color:var(--teal); letter-spacing:-.5px; line-height:1.1; }
  .pkc .amc{ margin-top:2.2mm; display:inline-block; font-size:7.8pt; font-weight:600; color:var(--ink); background:var(--teal); padding:1mm 2.6mm; border-radius:5mm; }
  .pkc ul{ list-style:none; margin-top:4mm; }
  .pkc li{ font-size:8.4pt; line-height:1.4; color:#E7E9EC; padding-left:4.2mm; position:relative; margin-bottom:1.6mm; }
  .pkc li:before{ content:'✓'; position:absolute; left:0; color:var(--teal); font-weight:700; }
  .note{ margin-top:5mm; background:var(--soft); border-left:1.1mm solid var(--teal-d); border-radius:0 2mm 2mm 0; padding:3.4mm 4.5mm; font-size:9.2pt; font-weight:600; }
  .card{ border:1px solid var(--line); border-radius:3.6mm; padding:4.6mm 5mm 4.2mm; margin-bottom:3.6mm; break-inside:avoid; }
  .card.soft{ background:var(--soft); }
  .card h4{ font-size:10.3pt; font-weight:700; margin-bottom:2.6mm; }
  .card h4 small{ font-weight:500; color:var(--muted); font-size:8.3pt; margin-left:1.5mm; }
  .cols{ display:grid; grid-template-columns:1fr 1fr; column-gap:8mm; }
  ul.b{ list-style:none; }
  ul.b li{ font-size:8.8pt; line-height:1.42; padding-left:4.2mm; position:relative; margin-bottom:1.4mm; }
  ul.b li:before{ content:''; position:absolute; left:0; top:1.6mm; width:1.7mm; height:1.7mm; border-radius:50%; background:var(--teal-d); }
  ul.x li:before{ background:#B6BCC6; }
  table{ width:100%; border-collapse:collapse; font-size:8.8pt; }
  th{ text-align:left; font-size:7.6pt; letter-spacing:1.2px; text-transform:uppercase; color:var(--muted); font-weight:600; padding:0 3mm 2.2mm; border-bottom:1px solid var(--line); }
  td{ padding:3mm; border-bottom:1px solid var(--line); vertical-align:top; line-height:1.4; }
  td.p{ font-weight:700; white-space:nowrap; }
  td .s{ display:block; font-weight:500; font-size:7.8pt; color:var(--muted); }
  td.nm{ font-weight:600; }
  tr.hl td{ background:var(--soft); }
  .cmp td{ padding:1.9mm 3mm; }
  .cmp td:nth-child(2){ color:var(--muted); }
  .cmp td:nth-child(3){ font-weight:600; }
  .ad td{ padding:1.7mm 3mm; }
  .two{ display:grid; grid-template-columns:1fr 1fr; gap:4mm; }
  .two .card{ margin-bottom:0; }
  .end{ position:absolute; left:21mm; right:21mm; top:98mm; }
  .end h1{ font-size:30pt; font-weight:700; letter-spacing:-.4px; }
  .end p{ margin-top:5mm; font-size:12pt; line-height:1.55; color:#B4B6B9; max-width:140mm; }
  .contact{ display:flex; gap:12mm; margin-top:13mm; }
  .contact div span{ display:block; font-size:7.5pt; letter-spacing:1.6px; color:var(--teal); font-weight:600; margin-bottom:1.6mm; }
  .contact div b{ font-size:11pt; font-weight:600; }
`;

const ul = (items, cls = "b") => `<ul class="${cls}">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const sec = (n, title, first = false, style = "") =>
  `<div class="sec${first ? " first" : ""}"${style ? ` style="${style}"` : ""}><div class="n">${n}</div><h2>${esc(title)}</h2></div>`;
const card = (title, tag, body, extra = "", style = "") =>
  `<div class="card${extra ? " " + extra : ""}"${style ? ` style="${style}"` : ""}><h4>${esc(title)}${tag ? ` <small>${esc(tag)}</small>` : ""}</h4>${body}</div>`;
const cols = (lists, cls = "b") =>
  lists.length === 1 ? ul(lists[0], cls) : `<div class="cols">${lists.map((l) => ul(l, cls)).join("")}</div>`;
const foot = `<div class="foot"><span>GroverHQ · ${esc(TITLE)}</span><span>${CONTACT.web} · ${CONTACT.phone}</span></div>`;

const cover = `<section class="page dark"><div class="glow1"></div><div class="glow2"></div>
  <div class="cover-in"><img src="${wordmark}" alt="GroverHQ"><div class="bar"></div>
    <h1>School Management<br>System</h1>
    <p class="sub">A fast website plus student, teacher and admin portals for schools and institutes. One system, one vendor, and no APK to install.</p>
    <p class="tags">Web • Apps • Bots • Automation • AI</p></div>
  <div class="cover-foot"><b>${CONTACT.web}</b><span>${CONTACT.place} · ${CONTACT.phone}</span></div></section>`;

const back = `<section class="page dark"><div class="glow1"></div><div class="glow2"></div>
  <div class="end"><h1>Let’s digitize<br>your school.</h1>
    <p>Message us on WhatsApp. We’ll understand your school’s setup and reply with scope and a clear quote.</p>
    <div class="contact"><div><span>WHATSAPP</span><b>${CONTACT.phone}</b></div><div><span>WEBSITE</span><b>${CONTACT.web}</b></div><div><span>EMAIL</span><b>${CONTACT.email}</b></div></div></div>
  <div class="end-foot"><span>Digital Solutions for Modern Businesses</span><span>${CONTACT.place}</span></div></section>`;

const packagesPage = `<section class="page">
  ${sec(1, "Packages", true)}
  <p class="lede">Starting prices in Indian rupees for schools of up to ${STUDENT_CAP} students; the final quote depends on scope. Each package includes everything in the one before it. Development is paid once. The first year of hosting and maintenance is included; the yearly fee starts from the second year.</p>
  <div class="pk">${PACKAGES.map(
    (p, i) => `<div class="pkc"><div class="k">Package ${i + 1}</div><h3>${esc(p.name)}</h3>
      <div class="from">Starting at · one-time</div><div class="price">${inr(p.price)}</div>
      <div class="amc">${inr(p.amc)} / year from year 2</div>${ul(p.bullets, "")}</div>`,
  ).join("")}</div>
  <div class="card soft" style="margin-top:4.5mm"><h4>School Website <small>add-on to any package · ${inr(WEBSITE.price)}+ one-time · ${inr(WEBSITE.amc)} / year hosting + maintenance from year 2</small></h4>
    <div class="cols">${ul(WEBSITE.left)}${ul(WEBSITE.right)}</div></div>
  ${sec(2, "One system instead of many", false, "margin-top:6mm")}
  <div class="card" style="padding:3mm 4mm 1mm"><table class="cmp">
    <tr><th style="width:30%">Area</th><th style="width:33%">Typical legacy setup</th><th>GroverHQ system</th></tr>
    ${COMPARE.map(([a, b, c]) => `<tr><td class="nm">${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join("")}
  </table></div>
  ${foot}</section>`;

const includedPage = (() => {
  const out = [];
  for (let i = 0; i < INCLUDED.length; i++) {
    const [title, tag, lists, style] = INCLUDED[i];
    if (style === "half") {
      const [t2, g2, l2] = INCLUDED[i + 1];
      out.push(`<div class="two" style="margin-bottom:3.6mm">${card(title, tag, cols(lists))}${card(t2, g2, cols(l2))}</div>`);
      i++;
    } else out.push(card(title, tag, cols(lists), style));
  }
  return `<section class="page">${sec(3, "What’s included", true)}${out.join("")}${foot}</section>`;
})();

const addonRow = (a) => {
  const nm = `<td class="nm">${esc(a.name)}${a.sub ? `<span class="s">${esc(a.sub)}</span>` : ""}</td>`;
  const pr = a.price == null
    ? `<td class="p">Quoted<span class="s">one-time</span></td>`
    : `<td class="p">${inr(a.price)}<span class="s">+ ${inr(a.yearly)} / year</span></td>`;
  return `<tr${a.hl ? ' class="hl"' : ""}>${nm}${pr}<td>${esc(a.text)}</td></tr>`;
};

const addonsPage = `<section class="page">
  ${sec(4, "Add-on modules", true)}
  <p class="lede">Added anytime as independent mini-projects, quoted to your scope. Each add-on adds a small yearly maintenance fee, starting from the second year. Vendor charges for SMS, WhatsApp and OTP messages are billed at actuals.</p>
  <div class="card" style="padding:3.4mm 4mm 1mm"><table class="ad">
    <tr><th style="width:27%">Module</th><th style="width:21%">Price</th><th>What you get</th></tr>
    ${ADDONS.map(addonRow).join("")}
  </table></div>
  <p class="lede" style="margin:-1mm 0 0">Store apps are published from GroverHQ’s developer accounts.</p>
  ${sec(5, "Not included", false, "margin-top:4mm")}
  <div class="card" style="padding:3.4mm 5mm 2.6mm"><div class="cols">${NOT_INCLUDED.map((l) => ul(l, "b x")).join("")}</div></div>
  ${foot}</section>`;

const termsPage = `<section class="page">
  ${sec(6, "Ownership & renewal", true)}
  <div class="two">
    ${card("Domain · owned by the school", "", ul(["School purchases and renews the domain", "Typical renewal: about ₹1,000 per year", "GroverHQ assists with initial setup"]))}
    ${card("Hosting + maintenance · managed by GroverHQ", "", ul([
      "Hosting charges are included in the yearly fee. The first year is included, billing starts from the second year",
      "Includes SSL, uptime monitoring, security updates and backups",
      "If maintenance is not renewed, hosting stops and the system goes offline",
      "Your data backups are retained for 30 days while it is offline",
      "Store apps are published under GroverHQ’s developer accounts and stop working with the system if maintenance lapses",
    ]))}
  </div>
  ${card("One-time development", "", ul(["Paid once per package or module", "No recurring development fees"]), "", "margin-top:3.6mm")}
  ${sec(7, "Upgrade policy")}
  ${card("", "", ul(["Modular system: modules can be added anytime", "Move from Core to Standard to Complete without rebuilding", "Upgrades are delivered as independent mini-projects"]))}
  ${sec(8, "Timeline & payment")}
  <div class="two">
    ${card("Timeline", "", ul(["Confirmed at scoping, based on package and modules", "Weekly progress updates"]))}
    ${card("Payment terms", "", ul(["50% advance, 50% on delivery (one-time build)", "Hosting and maintenance: first year included, billed yearly from the second year"]))}
  </div>
  ${sec(9, "Pair it with discoverability")}
  <div class="note" style="margin-top:0;font-weight:500;line-height:1.55">Want parents to find your school on Google Search and Maps? Add Google Business Profile optimization and SEO setup. See our <b>Website + Discoverability Setup</b> menu, or ask us for a combined quote.</div>
  ${foot}</section>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(TITLE)} · GroverHQ</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap">
<style>${CSS}</style></head><body>${cover}${packagesPage}${includedPage}${addonsPage}${termsPage}${back}</body></html>`;

/* ================================================================== */
/* RENDER                                                              */
/* ================================================================== */
const EXPECTED_PAGES = 6;
const htmlPath = resolve(tmp, "school.html");
writeFileSync(htmlPath, html);
mkdirSync(dirname(OUT), { recursive: true });
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=10000",
  `--print-to-pdf=${OUT}`,
  pathToFileURL(htmlPath).href,
];
if (process.env.CHROME_NO_SANDBOX) args.unshift("--no-sandbox");
const r = spawnSync(browser, args, { encoding: "utf8" });
if (r.status !== 0 || !existsSync(OUT)) throw new Error(`pdf failed: ${OUT}\n${r.stderr}`);
console.log("wrote", OUT);

if (COPY && existsSync(dirname(COPY))) {
  copyFileSync(OUT, COPY);
  console.log("copied to", COPY);
}

const pages = (readFileSync(OUT).toString("latin1").match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
if (pages !== EXPECTED_PAGES) {
  console.warn(`WARNING: expected ${EXPECTED_PAGES} pages but got ${pages}. A page overflowed; shorten copy or tighten spacing, then re-run.`);
  process.exitCode = 1;
}
