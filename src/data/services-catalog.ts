/**
 * Services catalog: the single source for /services/ and scripts/build-pdfs.mjs
 * (GroverHQ_Services_Full.pdf). Prices are generic "starting at" figures; items
 * that are also sold on /packages/ take their price from ./pricing.ts.
 * `pdfName` is used in the PDF when it differs from the shorter website name.
 */
import { FOUND_SERVICES, ADS_SERVICES, ADDON_SERVICES } from "./pricing.ts";

export type CatalogItem = {
  name: string;
  pdfName?: string;
  price: number;
  blurb: string;
  bullets: string[];
};
export type CatalogSection = {
  id: string;
  title: string;
  items: CatalogItem[];
};

const priced = [...FOUND_SERVICES, ...ADS_SERVICES, ...ADDON_SERVICES];
const p = (id: string) => priced.find((i) => i.id === id)!.price;

export const CATALOG: CatalogSection[] = [
  {
    id: "websites",
    title: "Websites & Online Presence",
    items: [
      {
        name: "Business Website",
        price: p("business-website"),
        blurb: "Modern, fast, SEO-ready.",
        bullets: [
          "Modern, Fast, Responsive",
          "SEO-ready",
          "Lead-optimized",
          "CMS Included",
        ],
      },
      {
        name: "Product Catalog",
        pdfName: "Product Catalog / Portfolio",
        price: p("catalog-website"),
        blurb: "Filters, galleries.",
        bullets: [
          "Showcase products or work",
          "Category filters",
          "Performance optimized images",
          "Mobile-first layout",
        ],
      },
      {
        name: "Landing Pages",
        price: p("landing-pages"),
        blurb: "High-conversion.",
        bullets: [
          "Campaign-focused",
          "Lead capture",
          "High-conversion design",
          "Fast loading",
        ],
      },
      {
        name: "Google Business Profile",
        price: p("gbp"),
        blurb: "Optimization.",
        bullets: [
          "Profile optimization",
          "Photos & services",
          "Keyword strategy",
          "Ranking improvements",
        ],
      },
      {
        name: "WhatsApp Business Setup",
        price: p("whatsapp-business"),
        blurb: "Catalog + replies.",
        bullets: [
          "Catalog setup",
          "Quick replies",
          "Auto-response",
          "Business profile",
        ],
      },
      {
        name: "Domain + Email + Hosting",
        price: p("domain-email-hosting"),
        blurb: "Setup + DNS.",
        bullets: [
          "Domain configuration",
          "Business email setup",
          "Hosting setup",
          "DNS management",
        ],
      },
    ],
  },
  {
    id: "selling",
    title: "Online Selling & Payments",
    items: [
      {
        name: "E‑commerce Store",
        pdfName: "E-commerce Store",
        price: 75000,
        blurb: "Cart + checkout.",
        bullets: [
          "Product management",
          "Cart + checkout",
          "Payment gateway integration",
          "Mobile-first design",
        ],
      },
      {
        name: "Ordering & Delivery",
        price: 50000,
        blurb: "Tracking + updates.",
        bullets: [
          "Order tracking",
          "Delivery status",
          "Customer notifications",
          "Admin dashboard",
        ],
      },
      {
        name: "Inventory & Stock",
        price: 25000,
        blurb: "Stock alerts.",
        bullets: [
          "Stock levels",
          "Low-stock alerts",
          "Multi-location support",
          "Barcode/QR support",
        ],
      },
      {
        name: "Distributor Orders",
        pdfName: "Distributor-Retailer Orders",
        price: 50000,
        blurb: "B2B ordering.",
        bullets: [
          "B2B ordering",
          "Price lists",
          "Order history",
          "Role-based access",
        ],
      },
      {
        name: "Subscription Billing",
        pdfName: "Subscription & Billing",
        price: 35000,
        blurb: "Recurring payments.",
        bullets: [
          "Recurring payments",
          "Auto-invoices",
          "Reminders",
          "Customer portal",
        ],
      },
      {
        name: "WhatsApp Ordering",
        price: 25000,
        blurb: "Catalog + flow.",
        bullets: [
          "Product catalog",
          "Order flow",
          "Auto-confirmations",
          "Payment links",
        ],
      },
    ],
  },
  {
    id: "crm",
    title: "CRM & Customer Loyalty",
    items: [
      {
        name: "CRM System",
        pdfName: "CRM (Leads → Customers)",
        price: p("crm"),
        blurb: "Leads + customers.",
        bullets: [
          "Lead capture",
          "Pipeline tracking",
          "Follow-ups",
          "Customer history",
        ],
      },
      {
        name: "Automated Follow‑ups",
        pdfName: "Automated Follow-ups",
        price: p("follow-ups"),
        blurb: "WhatsApp + email.",
        bullets: [
          "WhatsApp sequences",
          "Email reminders",
          "SMS alerts",
          "Lead nurturing",
        ],
      },
      {
        name: "Review Automation",
        price: p("review-automation"),
        blurb: "Google + WhatsApp.",
        bullets: [
          "Google review flows",
          "WhatsApp review prompts",
          "Auto-reminders",
          "Feedback tracking",
        ],
      },
      {
        name: "Loyalty & Rewards",
        pdfName: "Loyalty & Rewards System",
        price: 25000,
        blurb: "Points + cashback.",
        bullets: [
          "Points engine",
          "Cashback rules",
          "Tiered rewards",
          "Customer wallet",
        ],
      },
      {
        name: "Referral Program",
        price: 15000,
        blurb: "Tracking + rewards.",
        bullets: [
          "Referral tracking",
          "Incentives",
          "Auto-notifications",
          "Dashboard",
        ],
      },
      {
        name: "Chatbots",
        pdfName: "Chatbots (Web/WhatsApp)",
        price: 20000,
        blurb: "FAQ + lead bots.",
        bullets: ["FAQ bots", "Lead bots", "Support bots", "Custom workflows"],
      },
    ],
  },
  {
    id: "operations",
    title: "Operations & Internal Tools",
    items: [
      {
        name: "Billing System",
        pdfName: "Billing & Invoicing System",
        price: 25000,
        blurb: "GST + PDFs.",
        bullets: [
          "GST invoices",
          "Auto-PDF generation",
          "Payment links",
          "Customer records",
        ],
      },
      {
        name: "Attendance & Payroll",
        pdfName: "Attendance & Payroll Lite",
        price: 30000,
        blurb: "Staff + reports.",
        bullets: [
          "Staff attendance",
          "Leave tracking",
          "Basic payroll",
          "Monthly reports",
        ],
      },
      {
        name: "Appointment System",
        pdfName: "Appointment Systems",
        price: 18000,
        blurb: "Scheduling.",
        bullets: [
          "Calendar scheduling",
          "Reminders",
          "Online payments",
          "Customer portal",
        ],
      },
      {
        name: "Ticket System",
        pdfName: "Complaint / Ticket System",
        price: 30000,
        blurb: "Complaints + SLA.",
        bullets: [
          "Ticket creation",
          "Status tracking",
          "SLA alerts",
          "Multi-department routing",
        ],
      },
      {
        name: "Field Staff Mgmt",
        pdfName: "Field Staff Management",
        price: 40000,
        blurb: "Tracking + tasks.",
        bullets: [
          "Location tracking",
          "Task assignment",
          "Daily reporting",
          "Attendance sync",
        ],
      },
      {
        name: "Vendor & Purchase",
        pdfName: "Vendor & Purchase System",
        price: 30000,
        blurb: "PO + inventory.",
        bullets: [
          "Purchase orders",
          "Vendor records",
          "Approvals",
          "Inventory sync",
        ],
      },
      {
        name: "Document Mgmt",
        pdfName: "Document Management",
        price: 25000,
        blurb: "Files + access.",
        bullets: [
          "File uploads",
          "Folder structure",
          "Permissions",
          "Secure access",
        ],
      },
      {
        name: "Project & Tasks",
        pdfName: "Project & Task Management",
        price: 25000,
        blurb: "Teams + deadlines.",
        bullets: [
          "Task assignment",
          "Deadlines",
          "Team collaboration",
          "Progress tracking",
        ],
      },
      {
        name: "Expense OCR",
        pdfName: "Expense Upload + OCR",
        price: 25000,
        blurb: "Scan + extract.",
        bullets: [
          "Receipt scanning",
          "Auto-extraction",
          "Categorization",
          "Reports",
        ],
      },
      {
        name: "Vendor KYC",
        pdfName: "Vendor KYC Collection",
        price: 15000,
        blurb: "Forms + verify.",
        bullets: [
          "KYC forms",
          "Document uploads",
          "Verification",
          "Status tracking",
        ],
      },
      {
        name: "Asset Management",
        pdfName: "Asset Management System",
        price: 25000,
        blurb: "QR + logs.",
        bullets: [
          "Track company assets",
          "Assign to staff",
          "Maintenance logs",
          "QR/Barcode tagging",
        ],
      },
      {
        name: "Forms & Approvals",
        pdfName: "Internal Forms & Approvals",
        price: 18000,
        blurb: "Workflows.",
        bullets: [
          "Custom forms",
          "Approval workflows",
          "Status tracking",
          "Auto-notifications",
        ],
      },
    ],
  },
  {
    id: "industry",
    title: "Industry‑Ready Systems",
    items: [
      {
        name: "Education System",
        pdfName: "Education Management",
        price: 50000,
        blurb: "Students + fees.",
        bullets: [
          "Student records",
          "Fees & receipts",
          "Attendance",
          "Parent communication",
        ],
      },
      {
        name: "Clinic System",
        pdfName: "Healthcare & Clinic Systems",
        price: 60000,
        blurb: "EMR + billing.",
        bullets: ["Appointments", "EMR/records", "Prescriptions", "Billing"],
      },
      {
        name: "Retail & Distribution",
        price: 50000,
        blurb: "Inventory + flow.",
        bullets: [
          "Inventory",
          "Billing",
          "Distributor-Retailer flow",
          "Reports",
        ],
      },
      {
        name: "AMC System",
        pdfName: "AMC & Service Systems",
        price: 35000,
        blurb: "Renewals.",
        bullets: [
          "AMC tracking",
          "Renewals",
          "Technician assignment",
          "Service history",
        ],
      },
      {
        name: "Agency Workflow",
        pdfName: "Creative Agency Workflow",
        price: 30000,
        blurb: "Tasks + approvals.",
        bullets: [
          "Project briefs",
          "Task boards",
          "Client approvals",
          "File sharing",
        ],
      },
      {
        name: "Hospitality Booking",
        pdfName: "Hospitality & Bookings",
        price: 40000,
        blurb: "Rooms + payments.",
        bullets: [
          "Room/slot booking",
          "Payments",
          "Customer records",
          "Reports",
        ],
      },
    ],
  },
  {
    id: "automation",
    title: "Automation & Intelligence",
    items: [
      {
        name: "Workflow Automation",
        price: 20000,
        blurb: "Multi-step flows.",
        bullets: [
          "Auto-tasks",
          "Multi-step flows",
          "Conditional logic",
          "Cross-app triggers",
        ],
      },
      {
        name: "Auto‑Invoicing",
        pdfName: "Auto-invoicing",
        price: 15000,
        blurb: "PDF + reminders.",
        bullets: [
          "Auto-generate invoices",
          "Auto-send PDFs",
          "Payment reminders",
          "Ledger updates",
        ],
      },
      {
        name: "Low‑Stock Alerts",
        pdfName: "Low-Stock Alerts",
        price: 12000,
        blurb: "WhatsApp/SMS.",
        bullets: [
          "Threshold alerts",
          "WhatsApp/SMS",
          "Multi-location",
          "Supplier triggers",
        ],
      },
      {
        name: "AI FAQ Bot",
        price: 30000,
        blurb: "Trained on data.",
        bullets: [
          "Trained on your data",
          "Instant replies",
          "Website + WhatsApp",
          "Lead capture",
        ],
      },
      {
        name: "OCR Tools",
        pdfName: "OCR & Auto-Data Entry",
        price: 20000,
        blurb: "Scan + extract.",
        bullets: [
          "Scan documents",
          "Extract fields",
          "Auto-fill forms",
          "Reduce manual work",
        ],
      },
      {
        name: "WhatsApp Micro‑tools",
        pdfName: "WhatsApp Micro-tools",
        price: 10000,
        blurb: "Mini workflows.",
        bullets: [
          "Quick calculators",
          "Mini-forms",
          "Auto-responses",
          "Lead routing",
        ],
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations, Sync Tools & APIs",
    items: [
      {
        name: "Tally Integration",
        price: 20000,
        blurb: "Invoices + ledger.",
        bullets: [
          "Sync invoices",
          "Sync payments",
          "Auto-ledger updates",
          "Error-free import/export",
        ],
      },
      {
        name: "Zoho Books/CRM",
        pdfName: "Zoho Books / Zoho CRM",
        price: 25000,
        blurb: "Sync + logs.",
        bullets: [
          "Contacts sync",
          "Invoices sync",
          "Lead updates",
          "Activity logs",
        ],
      },
      {
        name: "Payment Gateway",
        pdfName: "Payment Gateway Setup",
        price: 12000,
        blurb: "Razorpay/Stripe.",
        bullets: [
          "Razorpay/Paytm/Stripe",
          "Payment links",
          "Auto-reconciliation",
          "Webhook automation",
        ],
      },
      {
        name: "Shiprocket",
        pdfName: "Shiprocket Integration",
        price: 15000,
        blurb: "Orders + tracking.",
        bullets: [
          "Order sync",
          "AWB generation",
          "Tracking updates",
          "Status automation",
        ],
      },
      {
        name: "Google Sheets Sync",
        price: 20000,
        blurb: "Dashboards.",
        bullets: [
          "Auto-export data",
          "Live dashboards",
          "Two-way sync",
          "Zero manual work",
        ],
      },
      {
        name: "WhatsApp API",
        pdfName: "WhatsApp API Integration",
        price: 25000,
        blurb: "Templates + CRM.",
        bullets: [
          "Template messages",
          "Notifications",
          "Chat automation",
          "CRM sync",
        ],
      },
    ],
  },
  {
    id: "admin",
    title: "Business Admin & Utility Tools",
    items: [
      {
        name: "Quotations & Estimates",
        price: 12000,
        blurb: "PDF + approvals.",
        bullets: [
          "Custom templates",
          "Auto-PDF",
          "Approval flow",
          "Convert to invoice",
        ],
      },
      {
        name: "Purchase Orders",
        price: 15000,
        blurb: "PO + tracking.",
        bullets: [
          "PO Creation",
          "Vendor mapping",
          "Status tracking",
          "Inventory sync",
        ],
      },
      {
        name: "E‑Signatures",
        pdfName: "E-Signatures",
        price: 15000,
        blurb: "Secure signing.",
        bullets: [
          "Digital signing",
          "Document tracking",
          "Audit logs",
          "Secure storage",
        ],
      },
      {
        name: "Knowledge Base",
        pdfName: "Internal Knowledge Base",
        price: 20000,
        blurb: "SOP + docs.",
        bullets: [
          "SOP storage",
          "Training docs",
          "Version control",
          "Staff access",
        ],
      },
      {
        name: "Customer Portal",
        price: 30000,
        blurb: "Invoices + tickets.",
        bullets: [
          "View invoices",
          "Make payments",
          "Raise tickets",
          "Update details",
        ],
      },
      {
        name: "Vendor Portal",
        price: 30000,
        blurb: "PO + KYC.",
        bullets: ["PO access", "Invoice upload", "Payment status", "KYC sync"],
      },
      {
        name: "Staff Directory",
        price: 8000,
        blurb: "Profiles + roles.",
        bullets: [
          "Staff profiles",
          "Contact details",
          "Roles & departments",
          "Quick search",
        ],
      },
      {
        name: "Leave Management",
        price: 15000,
        blurb: "Requests + calendar.",
        bullets: ["Leave requests", "Approvals", "Balances", "Calendar view"],
      },
      {
        name: "Internal Chat",
        pdfName: "Internal Chat (Lite)",
        price: 20000,
        blurb: "Teams + files.",
        bullets: [
          "Team messaging",
          "Groups",
          "File sharing",
          "Searchable history",
        ],
      },
      {
        name: "File Sharing",
        pdfName: "File Sharing & Storage",
        price: 15000,
        blurb: "Storage + access.",
        bullets: [
          "Upload files",
          "Folder access",
          "Permissions",
          "Version history",
        ],
      },
      {
        name: "Staff Communication",
        price: 12000,
        blurb: "Updates + alerts.",
        bullets: [
          "Send updates",
          "WhatsApp/SMS alerts",
          "Attachments",
          "Read receipts",
        ],
      },
      {
        name: "Shift & Roster Mgmt",
        pdfName: "Shift & Roster Management",
        price: 25000,
        blurb: "Shifts + attendance.",
        bullets: [
          "Create staff rosters",
          "Shift assignments",
          "Swap requests",
          "Attendance sync",
        ],
      },
    ],
  },
];

/** Bullets for the Ads & Lead Generation section of the PDF (prices come from ADS_SERVICES). */
export const ADS_BULLETS: Record<string, string[]> = {
  "ads-setup": [
    "Google Ads & Meta account setup",
    "Conversion tracking",
    "Calls, WhatsApp clicks and form enquiries measured",
    "Live from day one",
  ],
  "google-ads": [
    "Keyword & location targeting",
    "Search campaign management",
    "Ongoing optimization",
    "Reporting",
  ],
  "meta-ads": [
    "Facebook, Instagram & WhatsApp ads",
    "Click-to-WhatsApp ads",
    "Creatives & targeting",
    "Optimization & reporting",
  ],
};
