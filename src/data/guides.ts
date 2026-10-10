/** Guides shown on /guides/ and used for related-links and JSON-LD. */
export type Guide = {
  slug: string;
  title: string; // <= 60 chars incl. " | GroverHQ"
  h1: string;
  description: string; // <= 160 chars
  published: string; // ISO date
  updated?: string;
  /** Page this guide supports, shown as a call-to-action. */
  cta: { label: string; href: string };
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-choose-a-school-management-system",
    title: "How to Choose a School Management System | GroverHQ",
    h1: "How to choose a school management system (school ERP)",
    description:
      "A practical checklist for Indian schools: modules to expect, mobile access, data ownership, DPDP Act privacy and the questions to ask every vendor.",
    published: "2026-10-10",
    cta: { label: "See the School Management System", href: "/services/school-management-system/" },
  },
  {
    slug: "school-management-system-cost-india",
    title: "School Management System Cost in India | GroverHQ",
    h1: "School management system cost in India: what you actually pay for",
    description:
      "What drives the price of a school ERP in India, one-time vs yearly fees, add-ons and hidden costs, with a real package price list as an example.",
    published: "2026-10-10",
    cta: { label: "View school packages and pricing", href: "/services/school-management-system/#packages" },
  },
  {
    slug: "google-business-profile-setup-checklist",
    title: "Google Business Profile Setup Checklist | GroverHQ",
    h1: "Google Business Profile setup checklist for local businesses",
    description:
      "Step-by-step checklist to claim, verify and optimise your Google Business Profile so customers find you on Google Search and Maps, plus common mistakes.",
    published: "2026-10-10",
    cta: { label: "See website + Google Business Profile packages", href: "/packages/" },
  },
  {
    slug: "business-website-cost-india",
    title: "Business Website Cost in India (2026) | GroverHQ",
    h1: "How much does a business website cost in India?",
    description:
      "What drives the cost of a business website in India: pages, features, hosting, domain and upkeep, with GroverHQ starting prices as a worked example.",
    published: "2026-10-10",
    cta: { label: "See website + Google Business Profile packages", href: "/packages/" },
  },
  {
    slug: "clinic-doctor-website-checklist",
    title: "Clinic & Doctor Website Checklist | GroverHQ",
    h1: "What a clinic or doctor website needs to turn visitors into appointments",
    description:
      "A checklist for clinic and doctor websites in India: booking, WhatsApp enquiries, symptom pages, reviews, local SEO and trust, with a real clinic example.",
    published: "2026-10-10",
    cta: { label: "Website design for clinics & doctors", href: "/services/web-design-for-clinics-doctors/" },
  },
  {
    slug: "interior-designer-website-checklist",
    title: "Interior Designer Website Checklist | GroverHQ",
    h1: "What an interior design or products website needs",
    description:
      "A checklist for interior designer, showroom and product-catalogue websites: galleries, categories, enquiries, maps and SEO, with a real Mohali example.",
    published: "2026-10-10",
    cta: { label: "Website design for interior designers", href: "/services/web-design-for-interior-designers/" },
  },
  {
    slug: "find-rtsp-url-cctv-camera",
    title: "Find Your CCTV Camera's RTSP URL | GroverHQ",
    h1: "How to find your CCTV camera's RTSP URL (CP Plus, Hikvision, Dahua and more)",
    description:
      "RTSP URL formats for common IP cameras and NVRs, how to enable RTSP/ONVIF, find the port and test the stream in VLC before using it anywhere else.",
    published: "2026-10-10",
    cta: { label: "About GroverHQ Camera Viewer for Samsung TV", href: "/apps/camera-viewer/" },
  },
  {
    slug: "watch-cctv-on-samsung-tv",
    title: "Watch CCTV on a Samsung Smart TV | GroverHQ",
    h1: "How to watch your CCTV cameras on a Samsung Smart TV",
    description:
      "Four ways to see IP cameras and NVR/DVR feeds on a Samsung TV: HDMI, casting, a TV app or an RTSP/ONVIF viewer, with the limits of each.",
    published: "2026-10-10",
    cta: { label: "About GroverHQ Camera Viewer for Samsung TV", href: "/apps/camera-viewer/" },
  },
];
