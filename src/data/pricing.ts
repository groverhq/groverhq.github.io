/**
 * Single source of truth for prices shown on /packages/, /services/ and in
 * their JSON-LD. `price` is what the client pays; `mrp` is the list price
 * shown struck through. `from: true` means "starting at".
 * Ad budget is always separate and paid directly to Google/Meta.
 */
export type PriceItem = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  from?: boolean;
  /** "month" for recurring items; omitted for one-time. */
  per?: "month";
};

export const PACKAGES = {
  setup: {
    id: "website-gbp-setup",
    name: "Website + Discoverability Setup",
    price: 50000,
    mrp: 75000,
  },
  maintenance: {
    id: "gbp-website-maintenance",
    name: "GBP + Website Maintenance",
    price: 7500,
    mrp: 12500,
    per: "month",
  },
} satisfies Record<string, PriceItem>;

/** Part 1: individual services shown on /packages/ and /services/ */
export const FOUND_SERVICES: PriceItem[] = [
  { id: "gbp", name: "Google Business Profile optimization", price: 10000, mrp: 20000, from: true },
  { id: "business-website", name: "Business website + CMS", price: 40000, mrp: 60000, from: true },
  { id: "catalog-website", name: "Product catalog / portfolio website", price: 50000, mrp: 75000, from: true },
  { id: "domain-email-hosting", name: "Domain + email + hosting setup", price: 5000, mrp: 7500, from: true },
];

/** Part 2: ads and lead-conversion services */
export const ADS_SERVICES: PriceItem[] = [
  { id: "ads-setup", name: "Ads Setup & Tracking", price: 10000, mrp: 20000 },
  { id: "google-ads", name: "Google Ads Management", price: 10000, mrp: 15000, per: "month" },
  { id: "meta-ads", name: "Meta Ads Management", price: 10000, mrp: 15000, per: "month" },
  { id: "landing-pages", name: "Campaign landing pages", price: 12000, mrp: 20000, from: true },
];

export const ADDON_SERVICES: PriceItem[] = [
  { id: "whatsapp-business", name: "WhatsApp Business setup", price: 5000, mrp: 10000, from: true },
  { id: "follow-ups", name: "Automated follow-ups (WhatsApp/email/SMS)", price: 15000, mrp: 25000, from: true },
  { id: "review-automation", name: "Google review automation", price: 15000, mrp: 25000, from: true },
  { id: "crm", name: "CRM & lead management", price: 35000, mrp: 60000, from: true },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const discountPct = (item: Pick<PriceItem, "price" | "mrp">) =>
  Math.round((1 - item.price / item.mrp) * 100);

/** Schema.org Offer carrying both the sale price and the list price (MRP). */
export function buildOffer(item: PriceItem, url: string, withMrp = true) {
  const unit = item.per
    ? { referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } }
    : {};
  const listPrice = {
    "@type": "UnitPriceSpecification",
    priceType: "https://schema.org/ListPrice",
    price: item.mrp,
    priceCurrency: "INR",
    ...unit,
  };
  const salePrice = {
    "@type": "UnitPriceSpecification",
    price: item.price,
    priceCurrency: "INR",
    ...unit,
  };
  const base = {
    "@type": "Offer",
    name: item.name,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url,
  };
  if (!withMrp) {
    // Generic "starts from" pricing: no list price, open-ended upper bound.
    return {
      ...base,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        ...(item.from ? { minPrice: item.price } : { price: item.price }),
        ...unit,
      },
      description: item.from
        ? "Starting price; final quote depends on scope."
        : item.per
          ? "Per month."
          : "One-time fee.",
    };
  }
  return {
    ...base,
    price: item.price,
    priceSpecification: [salePrice, listPrice],
    ...(item.from
      ? { description: "Starting price; final quote depends on scope." }
      : {}),
  };
}

/** OfferCatalog JSON-LD for every priced item (shared by /packages/ and /services/). */
export function buildCatalogSchema(
  url: string,
  provider: { "@type": string; name: string; url: string },
  withMrp = true,
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "GroverHQ services and add-ons",
    url,
    itemListElement: [...FOUND_SERVICES, ...ADS_SERVICES, ...ADDON_SERVICES].map(
      (item) => ({
        ...buildOffer(item, url, withMrp),
        itemOffered: { "@type": "Service", name: item.name, provider },
      }),
    ),
  };
}

/** Formatted rupee price of any priced item by id, e.g. priceOf("business-website") -> "₹40,000". */
export const priceOf = (id: string) => {
  const item = [...FOUND_SERVICES, ...ADS_SERVICES, ...ADDON_SERVICES].find((i) => i.id === id);
  if (!item) throw new Error(`Unknown price id: ${id}`);
  return inr(item.price);
};
