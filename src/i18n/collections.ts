import { getEntry, type CollectionEntry } from "astro:content";
import type { Locale } from "./locales";
import { pageContentId } from "./routes";

export async function getPageEntry(
  pageSlug: string,
  locale: Locale,
): Promise<CollectionEntry<"pages">> {
  const contentId = pageContentId(pageSlug, locale);
  const page = await getEntry("pages", contentId);
  if (!page) {
    throw new Error(
      `Missing page content "${contentId}": add src/content/pages/${contentId}.md.`,
    );
  }
  return page;
}
