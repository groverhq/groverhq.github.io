import { SITE_CONFIG } from "../config";

/**
 * Builds a BreadcrumbList JSON-LD object.
 * Pass items in order from Home to the current page.
 *
 * Example:
 *   buildBreadcrumbSchema([
 *     { name: "Home", url: "/" },
 *     { name: "Locations", url: "/locations/" }, // ok even if not a real page
 *     { name: "Mohali", url: "/locations/mohali/" },
 *   ])
 */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.url, SITE_CONFIG.url).toString(),
    })),
  };
}

/**
 * Builds an FAQPage JSON-LD object.
 * IMPORTANT: every question/answer here must also be visibly rendered
 * on the page. Google disallows FAQ markup for hidden content.
 */
export function buildFAQSchema(
  qas: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}