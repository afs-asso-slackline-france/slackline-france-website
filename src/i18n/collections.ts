import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import { upcomingEvents } from "../lib/agenda";
import { isoDateInTimeZone } from "../lib/dates";
import { SITE_TIME_ZONE } from "../lib/site";
import type { Locale } from "./locales";
import { pageContentId } from "./routes";

export interface LocalizedPhoto {
  id: string;
  image: ImageMetadata;
  title: string;
  alt: string;
  photographerId: string;
}

export interface CreditedPhoto extends LocalizedPhoto {
  photographerName: string;
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

export async function getCreditedPhoto(
  photoId: string,
  locale: Locale,
): Promise<CreditedPhoto> {
  const photo = await getEntry("photos", photoId);
  if (!photo) {
    throw new Error(
      `Unknown photo "${photoId}": register it in src/content/photos.yaml.`,
    );
  }
  const photographer = await getPhotographer(photo.data.photographer.id);
  return {
    ...localizePhoto(photo, locale),
    photographerName: photographer.data.name,
  };
}

export async function getHomeContent(
  locale: Locale,
): Promise<CollectionEntry<"home">["data"]> {
  const home = await getEntry("home", locale);
  if (!home) {
    throw new Error(
      `Missing home page content: add src/content/home/${locale}.yaml.`,
    );
  }
  return home.data;
}

export async function getAssociations(
  locale: Locale,
): Promise<CollectionEntry<"associations">[]> {
  const associations = await getCollection("associations");
  const collator = new Intl.Collator(locale);
  return associations.sort((first, second) =>
    collator.compare(first.data.name, second.data.name),
  );
}

export async function getUpcomingEvents(
  limit: number,
): Promise<CollectionEntry<"events">["data"][]> {
  const events = await getCollection("events");
  const today = isoDateInTimeZone(new Date(), SITE_TIME_ZONE);
  return upcomingEvents(
    events.map((event) => event.data),
    today,
    limit,
  );
}
