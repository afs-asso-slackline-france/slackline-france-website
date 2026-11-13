import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const nonEmptyText = z.string().min(1);

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: nonEmptyText,
    description: nonEmptyText,
    heading: nonEmptyText,
  }),
});

export const collections = { pages };
