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
  // @id must match the `breadcrumb` reference in buildWebPageSchema, otherwise
  // Google sees an empty BreadcrumbList ("Missing field itemListElement").
  const current = new URL(items[items.length - 1].url, SITE_CONFIG.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${current}#breadcrumb`,
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
/**
 * Builds a WebPage (or CollectionPage etc.) JSON-LD object that ties the page
 * to the site-wide WebSite/Organization entities, its breadcrumb and its
 * primary image. Pair with buildBreadcrumbSchema for the same path.
 */
export function buildWebPageSchema({
  name,
  description,
  path,
  type = "WebPage",
  image = SITE_CONFIG.ogImage,
  imageSize = { width: 1200, height: 630 },
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  image?: string;
  imageSize?: { width: number; height: number };
}) {
  const url = new URL(path, SITE_CONFIG.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    about: { "@id": `${SITE_CONFIG.url}/#organization` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: new URL(image, SITE_CONFIG.url).toString(),
      ...imageSize,
    },
  };
}
