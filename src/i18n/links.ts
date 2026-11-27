import {
  CONTACT_EMAIL,
  ISA_EVENTS_PAGE,
  MEMBERSHIP_URL,
  SOCIAL_LINKS,
} from "../lib/site";
import type { Locale } from "./locales";
import { PAGE_SLUGS, localizedAnchor, localizedPath } from "./routes";

export const EXTERNAL_TARGETS = {
  membership: MEMBERSHIP_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  isaEvents: ISA_EVENTS_PAGE,
  ...SOCIAL_LINKS,
} as const;

export type PageKey = keyof typeof PAGE_SLUGS;
export type ExternalTarget = keyof typeof EXTERNAL_TARGETS;

export const PAGE_KEYS = Object.keys(PAGE_SLUGS) as [PageKey, ...PageKey[]];
export const EXTERNAL_TARGET_KEYS = Object.keys(EXTERNAL_TARGETS) as [
  ExternalTarget,
  ...ExternalTarget[],
];

export type ContentLink =
  | { label: string; page: PageKey; anchor?: string }
  | { label: string; external: ExternalTarget };

export function resolveLink(link: ContentLink, locale: Locale): string {
  if ("external" in link) return EXTERNAL_TARGETS[link.external];
  const pageSlug = PAGE_SLUGS[link.page];
  if (link.anchor === undefined) return localizedPath(pageSlug, locale);
  return localizedAnchor(pageSlug, locale, link.anchor);
}
