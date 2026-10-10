import { FOUND_SERVICES, ADS_SERVICES, ADDON_SERVICES, inr } from "./data/pricing";
import { SCHOOL_PACKAGES } from "./data/school";

// Price band for LocalBusiness schema, derived from the shared price data.
const ALL_PRICES = [
  ...FOUND_SERVICES,
  ...ADS_SERVICES,
  ...ADDON_SERVICES,
  ...SCHOOL_PACKAGES,
].map((i) => i.price);
const PRICE_MIN = Math.min(...ALL_PRICES);
const PRICE_MAX = Math.max(...ALL_PRICES);

// Site Configuration
export const SITE_CONFIG = {
  name: "GroverHQ",
  title: "GroverHQ Digital Solutions: Web, Apps, Bots, Automation, AI",
  description: "GroverHQ builds modern digital solutions — websites, apps, automation, CRM, internal tools, industry systems, integrations, and AI workflows.",
  url: "https://groverhq.com",
  logo: "/logo-light.png",
  ogImage: "/og-image.png",
};

// Contact Information
export const CONTACT_INFO = {
  phone: "+91 9878236480",
  phoneLink: "919878236480",
  email: "info@groverhq.com",
  address: "Sector 68, Mohali, Punjab, India",
  streetAddress: "Sector 68, Sahibzada Ajit Singh Nagar, Punjab, India",
  postalCode: "160062",
  city: "Mohali",
  state: "Punjab",
  country: "India",
  coordinates: "30.6295°N, 76.7597°E",
};

// Social Links with proper metadata
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/grover.hq",
    icon: "instagram",
    ariaLabel: "Instagram",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/GroverHQofficial",
    icon: "facebook",
    ariaLabel: "Facebook",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/919878236480",
    icon: "whatsapp",
    ariaLabel: "WhatsApp",
  },
  {
    name: "Google Business",
    url: "https://share.google/diNbvz6Pj4CTbKJYQ",
    icon: "googlebusiness",
    ariaLabel: "Google Business",
  },
  {
    name: "Google Maps",
    url: "https://maps.app.goo.gl/aHfDMJcUiHEYdj1v5",
    icon: "googlemaps",
    ariaLabel: "Google Maps",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/groverhq",
    icon: "linkedin",
    ariaLabel: "LinkedIn",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/Grover_HQ",
    icon: "x",
    ariaLabel: "X (Twitter)",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@GroverHQ",
    icon: "youtube",
    ariaLabel: "YouTube",
  },
  {
    name: "GitHub",
    url: "https://github.com/groverhq",
    icon: "github",
    ariaLabel: "GitHub",
  },
  {
    name: "Messenger",
    url: "https://m.me/GroverHQofficial",
    icon: "messenger",
    ariaLabel: "Messenger",
  },
];

// Navigation Links
export const NAV_LINKS = [
  { name: "Services", href: "/services/" },
  { name: "Packages", href: "/packages/" },
  { name: "Work", href: "/work/" },
  { name: "Apps", href: "/apps/" },
  { name: "About", href: "/#about" },
];

// Footer "Company" column (home-page sections that are not in the top nav)
export const FOOTER_COMPANY_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Why GroverHQ", href: "/#why-us" },
  { name: "Work", href: "/work/" },
  { name: "Apps", href: "/apps/" },
  { name: "Contact", href: "/#contact" },
];

// Footer "Services" column
export const FOOTER_SERVICE_LINKS = [
  { name: "All services", href: "/services/" },
  { name: "Packages & pricing", href: "/packages/" },
];

// Location Pages (footer + services hub links)
export const LOCATION_LINKS = [
  { name: "Mohali", href: "/locations/mohali/" },
  { name: "Chandigarh", href: "/locations/chandigarh/" },
  { name: "Panchkula", href: "/locations/panchkula/" },
  { name: "Delhi", href: "/locations/delhi/" },
];

// Industry-Specific Service Pages (footer + services hub links)
export const SERVICE_VERTICAL_LINKS = [
  { name: "Clinics & Doctors", href: "/services/web-design-for-clinics-doctors/" },
  { name: "Interior Designers", href: "/services/web-design-for-interior-designers/" },
  { name: "Schools & Institutes", href: "/services/school-management-system/" },
];

// Schema Organization Data
export const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
  image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
  description: SITE_CONFIG.description,
  telephone: CONTACT_INFO.phone,
  priceRange: `${inr(PRICE_MIN)} - ${inr(PRICE_MAX)}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_INFO.streetAddress,
    addressLocality: CONTACT_INFO.city,
    addressRegion: CONTACT_INFO.state,
    postalCode: CONTACT_INFO.postalCode,
    addressCountry: "IN",
  },
  areaServed: ["India", "Mohali", "Chandigarh", "Delhi NCR"],
  foundingLocation: {
    "@type": "Place",
    name: `${CONTACT_INFO.city}, ${CONTACT_INFO.state}, ${CONTACT_INFO.country}`,
  },
  sameAs: SOCIAL_LINKS.map((link) => link.url),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${SITE_CONFIG.name} Services`,
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description:
            "Business websites, landing pages, portfolios and online presence systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "App Development",
          description:
            "Web apps, mobile apps, internal tools and industry‑specific systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bots & Automation",
          description:
            "AI bots, workflow automation, WhatsApp automation and internal process automation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "CRM & Customer Systems",
          description:
            "CRM, follow‑ups, loyalty, reviews, customer portals and communication tools.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO & Google Business Profile",
          description:
            "SEO-optimized websites, Google Business Profile setup and ongoing SEO maintenance so local customers can find you.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google & Meta Ads Management",
          description:
            "Google Ads and Meta (Facebook, Instagram, click-to-WhatsApp) ad setup, conversion tracking, optimization and reporting.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Integrations",
          description:
            "Tally, Zoho, Razorpay, WhatsApp API, Google Sheets and custom API integrations.",
        },
      },
    ],
  },
};
// GroverHQ Camera Viewer (Samsung Smart TV app) - facts used by the /apps/camera-viewer pages.
// Keep in sync with the app and the Samsung store listing (see the app repo's PROJECT_NOTES.md).
export const CAMERA_VIEWER = {
  name: "GroverHQ Camera Viewer",
  path: "/apps/camera-viewer/",
  tagline: "Watch your IP cameras and NVRs live on your Samsung TV.",
  // Flip to true and fill storeUrl when the Samsung TV Store listing is live.
  storeLive: false,
  storeUrl: "",
  priceText: "₹99 per month + GST",
};
