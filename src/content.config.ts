import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { EXTERNAL_TARGET_KEYS, PAGE_KEYS } from "./i18n/links";
import type { Locale } from "./i18n/locales";
import { mergeCalendars } from "./lib/agenda";
import { fetchCalendar } from "./lib/ical";
import { ISA_CALENDAR_FEEDS } from "./lib/site";

const nonEmptyText = z.string().min(1);

const localizedText = z.object({
  fr: nonEmptyText,
  en: nonEmptyText,
} satisfies Record<Locale, typeof nonEmptyText>);

const textTile = z.object({
  title: nonEmptyText,
  text: nonEmptyText,
});

const contentLink = z.union([
  z.object({
    label: nonEmptyText,
    page: z.enum(PAGE_KEYS),
    anchor: nonEmptyText.optional(),
  }),
  z.object({ label: nonEmptyText, external: z.enum(EXTERNAL_TARGET_KEYS) }),
]);

const pluralForms = z.object({ one: nonEmptyText, other: nonEmptyText });

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: nonEmptyText,
    description: nonEmptyText,
    heading: nonEmptyText,
    lede: nonEmptyText.optional(),
    tiles: z.array(textTile).optional(),
  }),
});

const photographerLink = z.object({
  label: nonEmptyText,
  url: z.url(),
});

const photographers = defineCollection({
  loader: file("src/content/photographers.yaml"),
  schema: z.object({
    name: nonEmptyText,
    isMemberAssociation: z.boolean().default(false),
    links: z.array(photographerLink).default([]),
  }),
});

const photos = defineCollection({
  loader: file("src/content/photos.yaml"),
  schema: ({ image }) =>
    z.object({
      image: image(),
      photographer: reference("photographers"),
      title: localizedText,
      alt: localizedText,
    }),
});

const associations = defineCollection({
  loader: file("src/content/associations.yaml"),
  schema: z.object({
    name: nonEmptyText,
    city: nonEmptyText,
    email: z.email(),
    place: nonEmptyText,
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});

const events = defineCollection({
  loader: async () => {
    const calendars = await Promise.all(ISA_CALENDAR_FEEDS.map(fetchCalendar));
    return mergeCalendars(calendars).map((event, index) => ({
      ...event,
      id: `${event.startDate}-${index}`,
    }));
  },
  schema: z.object({
    uid: nonEmptyText,
    summary: z.string(),
    location: z.string(),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }),
});

const discipline = z.object({
  name: nonEmptyText,
  text: nonEmptyText,
  photo: reference("photos"),
});

const home = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/home" }),
  schema: z.object({
    hero: z.object({
      mainPhoto: reference("photos"),
      sidePhotos: z.tuple([reference("photos"), reference("photos")]),
    }),
    audiences: z.array(
      z.object({ title: nonEmptyText, links: z.array(contentLink) }),
    ),
    disciplines: z.object({
      heading: nonEmptyText,
      featured: z.tuple([discipline, discipline, discipline]),
      others: z.array(discipline),
    }),
    gathering: z.object({
      photo: reference("photos"),
      statement: z.object({
        before: nonEmptyText,
        emphasis: nonEmptyText,
        after: nonEmptyText,
      }),
      link: contentLink,
    }),
    associations: z.object({
      heading: pluralForms,
      mapLabel: nonEmptyText,
      contactLabel: nonEmptyText,
    }),
    agenda: z.object({
      heading: nonEmptyText,
      photo: reference("photos"),
      source: nonEmptyText,
      calendarLink: contentLink,
      noEvents: nonEmptyText,
    }),
    community: z.object({
      heading: nonEmptyText,
      photo: reference("photos"),
      lede: nonEmptyText,
      discordLabel: nonEmptyText,
      membership: z.object({
        title: nonEmptyText,
        text: nonEmptyText,
        link: contentLink,
      }),
      link: contentLink,
    }),
    about: z.object({
      heading: nonEmptyText,
      lede: nonEmptyText,
      memberCountLabel: pluralForms,
      isaLabel: nonEmptyText,
      photo: reference("photos"),
      link: contentLink,
    }),
  }),
});

export const collections = {
  pages,
  photographers,
  photos,
  associations,
  events,
  home,
};
