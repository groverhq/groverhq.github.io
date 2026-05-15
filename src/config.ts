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
  city: "Mohali",
  state: "Punjab",
  country: "India",
  coordinates: "30.6295°N, 76.7597°E",
};

// Social Links with proper metadata
export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/groverhq",
    icon: "linkedin",
    ariaLabel: "LinkedIn",
  },
  {
    name: "GitHub",
    url: "https://github.com/groverhq",
    icon: "github",
    ariaLabel: "GitHub",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/Grover_HQ",
    icon: "x",
    ariaLabel: "X (Twitter)",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/grover.hq",
    icon: "instagram",
    ariaLabel: "Instagram",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@GroverHQ",
    icon: "youtube",
    ariaLabel: "YouTube",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/GroverHQofficial",
    icon: "facebook",
    ariaLabel: "Facebook",
  },
  {
    name: "Messenger",
    url: "https://m.me/GroverHQofficial",
    icon: "messenger",
    ariaLabel: "Messenger",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/919878236480",
    icon: "whatsapp",
    ariaLabel: "WhatsApp",
  },
  {
    name: "Google Maps",
    url: "https://maps.app.goo.gl/aHfDMJcUiHEYdj1v5",
    icon: "googlemaps",
    ariaLabel: "Google Maps",
  },
  {
    name: "Google Business",
    url: "https://share.google/diNbvz6Pj4CTbKJYQ",
    icon: "googlebusiness",
    ariaLabel: "Google Business",
  },
];

// Navigation Links
export const NAV_LINKS = [
  { name: "Services", href: "/#services" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
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
  address: {
    "@type": "PostalAddress",
    addressLocality: CONTACT_INFO.city,
    addressRegion: CONTACT_INFO.state,
    addressCountry: CONTACT_INFO.country,
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
          name: "Integrations",
          description:
            "Tally, Zoho, Razorpay, WhatsApp API, Google Sheets and custom API integrations.",
        },
      },
    ],
  },
};
