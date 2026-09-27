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

/**
 * Builds a Review JSON-LD object for a testimonial about GroverHQ.
 * IMPORTANT: the review text, author, and rating here must also be
 * visibly rendered on the page — same rule as FAQ markup.
 */
export function buildReviewSchema({
  author,
  reviewBody,
  ratingValue = 5,
  datePublished,
  url,
}: {
  author: string;
  reviewBody: string;
  ratingValue?: number;
  datePublished?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    author: {
      "@type": "Person",
      name: author,
    },
    reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating: 5,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(url ? { url } : {}),
  };
}