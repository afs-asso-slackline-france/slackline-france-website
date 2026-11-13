import { SITE_NAME, SITE_ORIGIN, SITE_SHORT_NAME } from "./site";

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
  };
}
