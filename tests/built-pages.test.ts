import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { LOCALES } from "../src/i18n/locales";
import { HOME_PAGE_SLUG, localizedPath } from "../src/i18n/routes";
import { absoluteUrl } from "../src/lib/seo";

const DIST_DIRECTORY = join(import.meta.dirname, "..", "dist");

const PUBLISHED_PAGE_SLUGS = [HOME_PAGE_SLUG];

const PUBLISHED_PATHS = PUBLISHED_PAGE_SLUGS.flatMap((pageSlug) =>
  LOCALES.map((locale) => localizedPath(pageSlug, locale)),
);

function distFileFor(path: string): string {
  return join(DIST_DIRECTORY, path, "index.html");
}

function readBuiltPage(path: string): string {
  return readFileSync(distFileFor(path), "utf-8");
}

function countMatches(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

beforeAll(() => {
  if (!existsSync(DIST_DIRECTORY)) {
    throw new Error("dist/ is missing: run `npm run build` before `npm test`.");
  }
});

describe.each(PUBLISHED_PATHS)("page %s", (path) => {
  it("is built", () => {
    expect(existsSync(distFileFor(path))).toBe(true);
  });

  it("has exactly one h1", () => {
    expect(countMatches(readBuiltPage(path), /<h1[\s>]/g)).toBe(1);
  });

  it("has a title and a meta description", () => {
    const html = readBuiltPage(path);
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]+"/);
  });

  it("declares its own canonical URL", () => {
    expect(readBuiltPage(path)).toContain(
      `<link rel="canonical" href="${absoluteUrl(path)}"`,
    );
  });
});

describe("error page", () => {
  it("is built at the path GitHub Pages serves for unknown URLs", () => {
    expect(existsSync(join(DIST_DIRECTORY, "404.html"))).toBe(true);
  });
});
