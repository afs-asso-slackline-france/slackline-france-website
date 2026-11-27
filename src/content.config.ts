import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import type { Locale } from "./i18n/locales";

const nonEmptyText = z.string().min(1);

const localizedText = z.object({
  fr: nonEmptyText,
  en: nonEmptyText,
} satisfies Record<Locale, typeof nonEmptyText>);

const textTile = z.object({
  title: nonEmptyText,
  text: nonEmptyText,
});

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

export const collections = { pages, photographers, photos };
