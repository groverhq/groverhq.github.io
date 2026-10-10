/**
 * Single source of truth for the School Management System: used by
 * /services/school-management-system/ and scripts/build-school-pdf.mjs.
 * Prices are in rupees (one-time `price`, yearly fee `amc`/`yearly` from year 2).
 * Change a number or a line here and re-run `npm run build:pdfs`.
 */

export type SchoolAddon = {
  name: string;
  sub?: string;
  price: number | null;
  yearly: number | null;
  text: string;
  hl?: boolean;
};

export const SCHOOL_STUDENT_CAP = "1,000"; // pricing band shown on the packages page

export const SCHOOL_PACKAGES = [
  {
    name: "Core", price: 50000, amc: 12000,
    bullets: [
      "Student & parent, Teacher and Admin portals",
      "Attendance, marks, results and circulars",
      "Push notifications and installable app (PWA)",
      "Step-by-step guides for every role",
    ],
  },
  {
    name: "Standard", price: 95000, amc: 24000,
    bullets: [
      "Everything in Core",
      "Fees & receipts with Razorpay online payments",
      "Management dashboard and class-wise insights",
      "Student records and profiles",
    ],
  },
  {
    name: "Complete", price: 140000, amc: 32000,
    bullets: [
      "Everything in Standard",
      "Exams & report cards",
      "Staff attendance & leave",
      "Structured timetable and homework",
    ],
  },
];

export const SCHOOL_WEBSITE = {
  price: 40000, amc: 6000,
  left: ["Custom, fast, mobile-first design", "Home, About, Facilities, Gallery, Events, Achievements, Contact"],
  right: ["Admissions enquiry page", "SEO-friendly, SSL, uptime monitoring, backups"],
};

export const SCHOOL_COMPARE: [string, string, string][] = [
  ["Website speed", "Slow, heavy", "Fast, lightweight"],
  ["Mobile layout", "Often broken", "Fully responsive"],
  ["App", "Sideloaded APK", "Installable web app (PWA), no APK"],
  ["Student, parent & teacher portals", "None or separate", "Built in"],
  ["Admin panel", "Outdated", "Modern, mobile-friendly"],
  ["Notifications", "None", "Browser push + in-portal"],
  ["Vendors", "Multiple", "One"],
  ["Maintenance cost", "Unpredictable", "Predictable yearly fee"],
];

// [title, tag, columns (1 or 2 lists), style: "" | "soft" | "half"]
/** [title, plan tag, columns of bullets, layout hint: "" | "soft" | "half"] */
export type SchoolIncluded = [string, string, string[][], string];

export const SCHOOL_INCLUDED: SchoolIncluded[] = [
  ["Student & parent portal", "Core", [["View attendance", "View marks and results", "View circulars: timetable, homework, announcements, fee reminders", "Student and parent logins created by admin"]], "half"],
  ["Teacher portal", "Core", [["Mark attendance", "Upload marks, results and circulars", "See only assigned classes and students", "Logins created and reset by admin"]], "half"],
  ["Admin panel", "Core", [["Manage students, parents and teachers", "Map teachers and students to classes", "Manage attendance and marks"], ["Manage circulars and results", "Manage gallery and events", "Create logins and reset passwords"]], ""],
  ["System features", "Core", [["Browser push notifications", "In-portal notifications", "Installable app-like experience (PWA)"], ["Guides with screenshots for students, parents, teachers and admin", "Security and privacy-focused design, in line with the DPDP Act"]], ""],
  ["Fees & receipts", "Standard", [["Fee structure by class", "Online payment through Razorpay", "Receipts and payment history"], ["Pending dues view", "Fee reminders as circulars", "Razorpay gateway charges apply as per Razorpay"]], "soft"],
  ["Management dashboard & records", "Standard", [["Attendance and marks summary", "Circulars overview"], ["Student statistics and class-wise insights", "Student records and profiles"]], "soft"],
  ["Academic & staff modules", "Complete", [["Exams and printable report cards", "Structured timetable: day and period-wise"], ["Staff attendance and leave approvals", "Structured homework: date and subject-wise, with attachments"]], "soft"],
];

// price: number | null (null = "Quoted"); yearly: number | null; sub: small line under the name
export const SCHOOL_ADDONS: SchoolAddon[] = [
  { name: "WhatsApp / SMS Alerts", sub: "Recommended", price: 25000, yearly: 5000, text: "Attendance, circular and fee-reminder alerts to parents. Message charges billed at actuals.", hl: true },
  { name: "OTP Login", price: 15000, yearly: 3000, text: "OTP verification at student and parent login. SMS charges billed at actuals." },
  { name: "Fees & Receipts", sub: "Included in Standard, Complete", price: 35000, yearly: 7000, text: "Fee structure, Razorpay payments, receipts, pending dues" },
  { name: "Exams & Report Cards", sub: "Included in Complete", price: 25000, yearly: 5000, text: "Exam schedule, marks entry, printable report-card template" },
  { name: "Staff Attendance & Leave", sub: "Included in Complete", price: 20000, yearly: 4000, text: "Daily staff attendance, leave requests and approvals, monthly report" },
  { name: "Structured Timetable", sub: "Included in Complete", price: 15000, yearly: 3000, text: "Day and period-wise view, teacher upload, clean student view" },
  { name: "Structured Homework", sub: "Included in Complete", price: 15000, yearly: 3000, text: "Date-wise, subject-wise homework with attachments" },
  { name: "Certificates", price: 15000, yearly: 3000, text: "Custom PDF template, student download and print" },
  { name: "Hindi / Punjabi", sub: "per language", price: 8000, yearly: 1500, text: "Hindi and/or Punjabi toggle on the site and portals. English is the default." },
  { name: "Android App", sub: "Play Store", price: 12000, yearly: 2000, text: "Store app with native push, branded splash and offline screen. Published and maintained by GroverHQ." },
  { name: "iOS App", sub: "App Store", price: 25000, yearly: 10000, text: "Store app with native push and navigation, up to 2 review rounds. Published and maintained by GroverHQ." },
  { name: "Android + iOS Apps", price: 35000, yearly: 11000, text: "Both store apps together" },
  { name: "Data Setup & Entry", price: null, yearly: null, text: "We enter your current student, parent and teacher records from your sheets" },
];

export const SCHOOL_NOT_INCLUDED: string[][] = [
  ["Store apps unless the add-on is taken", "Automatic timetable generation", "SMS / WhatsApp alerts and OTP login unless added"],
  ["Migration of previous years’ data", "Data entry (done by your admin unless Data Setup & Entry is taken)", "Content translation"],
];
