# GroverHQ Website

Modern digital solutions agency website built with **Astro** + **Tailwind CSS**.

## 🚀 Tech Stack

- **Framework**: [Astro 6](https://astro.build) — Static site generator
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS
- **Type Safety**: TypeScript with strict mode
- **Analytics**: Cloudflare Web Analytics
- **Integrations**: Formspree (contact emails), WhatsApp API, @astrojs/sitemap

## 📁 Project Structure

```
src/
├── pages/
│   ├── index.astro          # Homepage
│   ├── services.astro       # Services detail page
│   └── 404.astro            # Custom 404 (redirects to home)
├── components/
│   ├── Navbar.astro         # Navigation
│   ├── Hero.astro           # Hero section
│   ├── Services.astro       # Services grid
│   ├── WhyChooseUs.astro    # Differentiators
│   ├── Work.astro           # Portfolio
│   ├── About.astro          # About section
│   ├── Contact.astro        # Contact form (Formspree + WhatsApp)
│   ├── Footer.astro         # Footer with links
│   ├── ScrollTopButton.astro
│   ├── WhatsAppBubble.astro
│   └── SocialLinks.astro
├── layouts/
│   └── BaseLayout.astro     # Main layout with SEO, meta tags, JSON-LD
├── styles/
│   └── global.css           # Global styles (Tailwind + custom utilities)
├── assets/
│   ├── logo-light.png
│   ├── logo-dark.png
│   └── banners/
└── config.ts                # Site config, social links, contact info

public/
├── robots.txt
├── sitemap.xml              # Static sitemapindex pointing to sitemap-0.xml
└── favicons/
```

## 🎨 Features

- ✅ Fully responsive design (mobile-first)
- ✅ SEO optimized (meta tags, JSON-LD schema, Open Graph)
- ✅ Dark + light theme sections
- ✅ Contact form with validation (Formspree email + WhatsApp)
- ✅ Smooth scroll animations (Intersection Observer)
- ✅ Mobile navigation menu
- ✅ Social links integration
- ✅ Analytics via Cloudflare

## 🛠 Setup & Commands

**Install dependencies:**
```sh
npm install
```

**Development server** (auto-reload at `localhost:4321`):
```sh
npm run dev
```

**Build for production:**
```sh
npm run build
```

**Preview production build locally:**
```sh
npm run preview
```

**Type checking:**
```sh
npm run check
```

## 📋 Key Configuration

### Site Config
Edit [src/config.ts](src/config.ts) for:
- Site title, description, URL
- Contact information
- Social media links
- Navigation menu items
- JSON-LD schema data

### Astro Config
[astro.config.mjs](astro.config.mjs) includes:
- Tailwind CSS integration
- HTML minification
- CSS code splitting
- Sharp image optimization

### Contact Form
- **Email**: Formspree endpoint at `https://formspree.io/f/mojkwgno`
- **WhatsApp**: Direct link to WhatsApp business number
- **Validation**: Client-side form validation with error messages

### Sitemap
Auto-generated via `@astrojs/sitemap` integration. Generates `sitemap-0.xml` with dynamic URL priorities based on page depth. Static `public/sitemap.xml` acts as a sitemapindex redirecting to `sitemap-0.xml` for clean `/sitemap.xml` URL.

## 📱 Deployment

Site is deployed via GitHub Pages. Push to main branch to auto-build and deploy.

```bash
# Check build before pushing
npm run build
```

## 🔗 Important Links

- **Website**: https://groverhq.com
- **GitHub**: https://github.com/groverhq
- **Contact**: info@groverhq.com

## 📝 License

© 2026 GroverHQ. All rights reserved.
