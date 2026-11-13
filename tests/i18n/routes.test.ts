import { describe, expect, it } from "vitest";
import {
  buildAlternateLinks,
  buildLocaleStaticPaths,
  localizedPath,
  pageContentId,
  parseContentId,
} from "../../src/i18n/routes";
import { SITE_ORIGIN } from "../../src/lib/site";

describe("localizedPath", () => {
  it("keeps French at the root", () => {
    expect(localizedPath("", "fr")).toBe("/");
    expect(localizedPath("contact", "fr")).toBe("/contact/");
  });

  it("prefixes English with /en", () => {
    expect(localizedPath("", "en")).toBe("/en/");
    expect(localizedPath("contact", "en")).toBe("/en/contact/");
  });
});

describe("buildAlternateLinks", () => {
  it("lists both locales and points x-default to French", () => {
    expect(buildAlternateLinks("contact")).toEqual([
      { hreflang: "fr-fr", href: `${SITE_ORIGIN}/contact/` },
      { hreflang: "en-us", href: `${SITE_ORIGIN}/en/contact/` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}/contact/` },
    ]);
  });
});

describe("parseContentId", () => {
  it("maps a bare locale id to the home page", () => {
    expect(parseContentId("en")).toEqual({ locale: "en", pageSlug: "" });
  });

  it("reads the locale and the slug", () => {
    expect(parseContentId("fr/agenda")).toEqual({
      locale: "fr",
      pageSlug: "agenda",
    });
  });

  it("rejects an unknown locale", () => {
    expect(() => parseContentId("de/contact")).toThrow(
      /must start with a locale/,
    );
  });
});

describe("pageContentId", () => {
  it("matches the ids produced by the content loader", () => {
    expect(pageContentId("agenda", "en")).toBe("en/agenda");
    expect(pageContentId("", "fr")).toBe("fr");
  });
});

describe("buildLocaleStaticPaths", () => {
  it("serves French at the root and English under /en", () => {
    expect(buildLocaleStaticPaths()).toEqual([
      { params: { locale: undefined }, props: { locale: "fr" } },
      { params: { locale: "en" }, props: { locale: "en" } },
    ]);
  });
});
