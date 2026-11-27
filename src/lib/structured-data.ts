import {
  CONTACT_EMAIL,
  LEGAL_IDENTITY,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SHORT_NAME,
  SOCIAL_LINKS,
} from "./site";

const SCHEMA_CONTEXT = "https://schema.org";

export function buildWebSiteSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_ORIGIN,
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "SportsOrganization",
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_ORIGIN,
    sport: "Slackline",
    email: CONTACT_EMAIL,
    address: { "@type": "PostalAddress", ...LEGAL_IDENTITY.address },
    sameAs: Object.values(SOCIAL_LINKS),
  };
}
