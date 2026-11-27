import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import type { Locale } from "./locales";
import { pageContentId } from "./routes";

export interface LocalizedPhoto {
  id: string;
  image: ImageMetadata;
  title: string;
  alt: string;
  photographerId: string;
}

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

function localizePhoto(
  photo: CollectionEntry<"photos">,
  locale: Locale,
): LocalizedPhoto {
  return {
    id: photo.id,
    image: photo.data.image,
    title: photo.data.title[locale],
    alt: photo.data.alt[locale],
    photographerId: photo.data.photographer.id,
  };
}

export async function getAllPhotos(locale: Locale): Promise<LocalizedPhoto[]> {
  const photos = await getCollection("photos");
  return photos.map((photo) => localizePhoto(photo, locale));
}

export async function getPhotographer(
  photographerId: string,
): Promise<CollectionEntry<"photographers">> {
  const photographer = await getEntry("photographers", photographerId);
  if (!photographer) {
    throw new Error(
      `Unknown photographer "${photographerId}": add it to src/content/photographers.yaml.`,
    );
  }
  return photographer;
}
