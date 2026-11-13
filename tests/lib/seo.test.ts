import { describe, expect, it } from "vitest";
import { absoluteUrl, robotsDirective } from "../../src/lib/seo";
import { SITE_ORIGIN } from "../../src/lib/site";

describe("absoluteUrl", () => {
  it("keeps the trailing slash of the home page", () => {
    expect(absoluteUrl("/")).toBe(`${SITE_ORIGIN}/`);
  });

  it("appends the path to the origin", () => {
    expect(absoluteUrl("/en/contact/")).toBe(`${SITE_ORIGIN}/en/contact/`);
  });

  it("rejects a relative path", () => {
    expect(() => absoluteUrl("contact")).toThrow(/starting with "\/"/);
  });
});

describe("robotsDirective", () => {
  it("allows indexing only when the site is indexable", () => {
    expect(robotsDirective(true)).toBe("index, follow");
    expect(robotsDirective(false)).toBe("noindex, nofollow");
  });
});
