import { absoluteUrl } from "../lib/seo";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_SETTINGS,
  isLocale,
  type Locale,
} from "./locales";

const DEFAULT_HREFLANG = "x-default";

export const HOME_PAGE_SLUG = "";

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export interface LocalizedPage {
  locale: Locale;
  pageSlug: string;
}

function localePrefix(locale: Locale): string | undefined {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}

export function localizedPath(pageSlug: string, locale: Locale): string {
  const segments = [localePrefix(locale), pageSlug].filter(Boolean);
  const isSiteRoot = segments.length === 0;
  return isSiteRoot ? "/" : `/${segments.join("/")}/`;
}

export function buildAlternateLinks(pageSlug: string): AlternateLink[] {
  const localeLinks = LOCALES.map((locale) => ({
    hreflang: LOCALE_SETTINGS[locale].hreflang,
    href: absoluteUrl(localizedPath(pageSlug, locale)),
  }));
  const defaultLink = {
    hreflang: DEFAULT_HREFLANG,
    href: absoluteUrl(localizedPath(pageSlug, DEFAULT_LOCALE)),
  };
  return [...localeLinks, defaultLink];
}

// The glob loader turns "<locale>/index.md" into the bare "<locale>" id.
export function parseContentId(contentId: string): LocalizedPage {
  const [localeSegment = "", pageSlug = ""] = contentId.split("/");
  if (!isLocale(localeSegment)) {
    throw new Error(
      `Content id "${contentId}" must start with a locale among ${LOCALES.join(", ")}.`,
    );
  }
  return { locale: localeSegment, pageSlug };
}

export function pageContentId(pageSlug: string, locale: Locale): string {
  return [locale, pageSlug].filter(Boolean).join("/");
}

export function buildLocaleStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { locale: localePrefix(locale) },
    props: { locale },
  }));
}
