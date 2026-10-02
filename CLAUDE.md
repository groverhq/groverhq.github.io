# CLAUDE.md

## What this repo is
GroverHQ site at https://groverhq.com: Astro 6 + Tailwind 4 static site on GitHub Pages (repo groverhq/groverhq.github.io). Work happens on branches and PRs into main; every PR gets a Cloudflare preview that the owner checks before merging. `dist/` is ignored.
Commands: `npm run dev`, `npm run build`, `npm run check` (both must be clean before saying a change is done), `npm run sync:legal` (see below).
- `src/config.ts`: site, contact, social, `NAV_LINKS`, location/industry links, `CAMERA_VIEWER` (name, path, tagline, price text, `storeLive`/`storeUrl`).
- `src/layouts/BaseLayout.astro`: head, SEO tags, canonical, OG/Twitter, JSON-LD (Organization on every page plus a page `schema` prop, single object or array). `src/utils/schema.ts`: breadcrumb/FAQ/review schema builders.
- Theme tokens in `src/styles/global.css` (use `bg-surface`, `text-muted`, `text-accent`, ... not raw colours). Components in `src/components`.
- `astro.config.mjs`: sitemap integration (`sitemap-index.xml` + `sitemap-0.xml` are generated; there is no hand-written sitemap). Priorities are set in `serialize`: home 1.0, depth-1 pages 0.9, deeper pages 0.8, legal pages (`/privacy/`, `/terms/`, `/security/`, `/lawful-use/`) 0.3, `/apps/camera-viewer/` 0.9.

## GroverHQ Camera Viewer pages
The Samsung Smart TV app is built in another repo (C:\WorkLocal\TizenDotnet, read only from here). Pages here:
- `/apps/` (card + "at a glance" table; keep it short), `/apps/camera-viewer/` (product page with FAQ + SoftwareApplication/FAQ/breadcrumb JSON-LD), `/apps/camera-viewer/support/`.
- `/apps/camera-viewer/privacy|terms|security|lawful-use/` come from `src/pages/apps/camera-viewer/[doc].astro`, rendered by `src/components/LegalDocument.astro` from `src/data/camera-viewer-legal.json`.
- `/privacy/` is the privacy notice for this website itself (contact form, Formspree, Cloudflare analytics). The app's policy is separate: the app collects nothing.
- Screenshots in `src/assets/camera-viewer/` (captured on a real TV); the Open Graph image is `public/apps/camera-viewer/og.jpg` (HD demo screenshot; replace with the Samsung store image when available).

### Legal text rules
- The legal pages must be word for word the in-app texts. Never edit `src/data/camera-viewer-legal.json` by hand: change `LegalTexts.cs` in the app repo (and bump its consent `Version`), then run `npm run sync:legal` (default path `C:/WorkLocal/TizenDotnet/groverhqcctv/groverhqcctv/LegalTexts.cs`, override with env `LEGAL_TEXTS_CS`). A wording change must go to the app and the site together.
- Known: the in-app documents still say "Effective 30 September 2026" although the text changed at consent version 3 (2 Oct 2026); fix in the app source, then re-sync.

### When the Samsung listing goes live
Set `storeLive: true` and `storeUrl` in `CAMERA_VIEWER` (`src/config.ts`). Pages that show availability switch automatically. Later: `public/app-ads.txt` when Google ads are added; a small static JSON of promo tiles for the app is planned (see the checklist).

### Facts the copy must match
India only; English only; product `unlock_monthly`, Rs. 99/month + GST via Samsung Checkout; free = lowest-resolution stream with watermark, paid = HD + no watermark; live view only (no recording/playback); H.264/H.265 + AAC; nothing sent to GroverHQ (the Samsung account ID goes to Samsung Checkout for purchases only); contact info@groverhq.com. Do not promise features the app does not have (no recording, no cloud, no accounts).
Reference material (OneDrive): `C:\OneDrive\GroverHQ\Apps\Samsung Tizen Camera Viewer\` - `PROJECT_NOTES.md` (app/store knowledge), `Website\WEBSITE_CHECKLIST.md`, `Store_text\description.txt`, `Images\Store_1920x1080\`.

## Rules for any change
- Never commit, push, open or merge a PR without the owner saying go. Show the diff or the preview first. Never push to main directly.
- SEO for every new/edited page: one h1, title <= 60 characters, description <= 160, correct canonical, OG image, alt text on images, JSON-LD that matches visible content (FAQ markup only for FAQs that are visible), breadcrumbs that include every level, internal links that resolve, and the page appears in the sitemap.
- Keep the existing visual style and mobile-first layout. Check the preview at phone width.
- No Samsung or camera-brand logos; keep the trademark disclaimer ("Samsung, Tizen, Smart Hub and Samsung Checkout are trademarks of Samsung; camera brand names belong to their owners; GroverHQ is not affiliated").
- No secrets or personal data in the repo.

## Open questions for the owner
- Human legal review of the wording (governing law Mohali, liability cap, refund wording) and of the website privacy notice.
- Confirm the real Samsung steps for cancelling/restoring a subscription before expanding the Support copy.
