import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { DEFAULT_LOCALE, LOCALES, LOCALE_SETTINGS } from "./src/i18n/locales";
import { SITE_ORIGIN } from "./src/lib/site";

const sitemapLanguages = Object.fromEntries(
  LOCALES.map((locale) => [locale, LOCALE_SETTINGS[locale].sitemapLanguage]),
);

export default defineConfig({
  site: SITE_ORIGIN,
  // GitHub Pages serves folders with a trailing slash; matching it avoids a redirect on every page.
  trailingSlash: "always",
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  env: {
    schema: {
      SITE_INDEXABLE: envField.boolean({
        context: "server",
        access: "public",
        default: false,
      }),
    },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: DEFAULT_LOCALE, locales: sitemapLanguages },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
