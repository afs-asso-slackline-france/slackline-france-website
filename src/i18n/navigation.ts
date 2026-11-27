import { CONTACT_EMAIL } from "../lib/site";
import type { Locale } from "./locales";
import { PAGE_SLUGS, localizedAnchor, localizedPath } from "./routes";
import { uiStrings, type UiStrings } from "./ui";

export const HOME_ANCHORS = {
  associations: "associations",
  agenda: "agenda",
} as const;

export const ASSOCIATION_ANCHORS = {
  statutes: "statuts",
} as const;

type MainNavigationKey = keyof UiStrings["navigation"]["main"];
type FooterNavigationKey = keyof UiStrings["navigation"]["footer"];

interface PageTarget {
  pageSlug: string;
  anchorId?: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  isCurrent: boolean;
}

const MAIN_NAVIGATION: Record<MainNavigationKey, PageTarget> = {
  associations: {
    pageSlug: PAGE_SLUGS.home,
    anchorId: HOME_ANCHORS.associations,
  },
  community: { pageSlug: PAGE_SLUGS.community },
  spots: { pageSlug: PAGE_SLUGS.spots },
  agenda: { pageSlug: PAGE_SLUGS.home, anchorId: HOME_ANCHORS.agenda },
  resources: { pageSlug: PAGE_SLUGS.resources },
  association: { pageSlug: PAGE_SLUGS.association },
};

const FOOTER_NAVIGATION: Record<
  Exclude<FooterNavigationKey, "contact">,
  PageTarget
> = {
  statutes: {
    pageSlug: PAGE_SLUGS.association,
    anchorId: ASSOCIATION_ANCHORS.statutes,
  },
  photoCredits: { pageSlug: PAGE_SLUGS.photoCredits },
  legalNotice: { pageSlug: PAGE_SLUGS.legalNotice },
};

function targetHref(target: PageTarget, locale: Locale): string {
  if (target.anchorId === undefined) {
    return localizedPath(target.pageSlug, locale);
  }
  return localizedAnchor(target.pageSlug, locale, target.anchorId);
}

function isCurrentPage(target: PageTarget, currentPageSlug: string): boolean {
  const isWholePage = target.anchorId === undefined;
  return isWholePage && target.pageSlug === currentPageSlug;
}

export function buildMainNavigation(
  locale: Locale,
  currentPageSlug: string,
): NavigationLink[] {
  const labels = uiStrings(locale).navigation.main;
  return Object.entries(MAIN_NAVIGATION).map(([key, target]) => ({
    label: labels[key as MainNavigationKey],
    href: targetHref(target, locale),
    isCurrent: isCurrentPage(target, currentPageSlug),
  }));
}

export function buildFooterNavigation(
  locale: Locale,
  currentPageSlug: string,
): NavigationLink[] {
  const labels = uiStrings(locale).navigation.footer;
  const pageLinks = Object.entries(FOOTER_NAVIGATION).map(([key, target]) => ({
    label: labels[key as FooterNavigationKey],
    href: targetHref(target, locale),
    isCurrent: isCurrentPage(target, currentPageSlug),
  }));
  const contactLink = {
    label: labels.contact,
    href: `mailto:${CONTACT_EMAIL}`,
    isCurrent: false,
  };
  return [...pageLinks, contactLink];
}
