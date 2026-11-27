import { describe, expect, it } from "vitest";
import {
  buildFooterNavigation,
  buildMainNavigation,
} from "../../src/i18n/navigation";
import { PAGE_SLUGS } from "../../src/i18n/routes";
import { CONTACT_EMAIL } from "../../src/lib/site";

describe("buildMainNavigation", () => {
  it("links home sections with anchors and pages with their localized path", () => {
    const hrefs = buildMainNavigation("en", PAGE_SLUGS.home).map(
      (link) => link.href,
    );
    expect(hrefs).toEqual([
      "/en/#associations",
      "/en/communaute/",
      "/en/spots/",
      "/en/#agenda",
      "/en/ressources/",
      "/en/association/",
    ]);
  });

  it("marks only the whole page being viewed as current", () => {
    const currentLabels = buildMainNavigation("fr", PAGE_SLUGS.home)
      .filter((link) => link.isCurrent)
      .map((link) => link.label);
    expect(currentLabels).toEqual([]);

    const spotsLinks = buildMainNavigation("fr", PAGE_SLUGS.spots);
    expect(spotsLinks.filter((link) => link.isCurrent)).toEqual([
      { label: "Spots", href: "/spots/", isCurrent: true },
    ]);
  });
});

describe("buildFooterNavigation", () => {
  it("ends with the contact email", () => {
    const links = buildFooterNavigation("fr", PAGE_SLUGS.legalNotice);
    expect(links.at(-1)?.href).toBe(`mailto:${CONTACT_EMAIL}`);
    expect(links.find((link) => link.isCurrent)?.href).toBe(
      "/mentions-legales/",
    );
  });
});
