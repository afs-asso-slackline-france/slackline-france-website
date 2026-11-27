import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import { DEFAULT_LOCALE, LOCALES, LOCALE_SETTINGS } from "./src/i18n/locales";
import { SITE_ORIGIN } from "./src/lib/site";

const sitemapLanguages = Object.fromEntries(
  LOCALES.map((locale) => [locale, LOCALE_SETTINGS[locale].sitemapLanguage]),
);

const FONT_WEIGHTS = { regular: 400, medium: 500, semibold: 600, bold: 700 };
const SYSTEM_FALLBACKS = ["system-ui", "sans-serif"];

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
  // Fonts are downloaded at build time and served from the site, so visitors never contact Google.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Bricolage Grotesque",
      cssVariable: "--font-bricolage",
      weights: [FONT_WEIGHTS.bold],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: SYSTEM_FALLBACKS,
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Sans",
      cssVariable: "--font-instrument",
      weights: [
        FONT_WEIGHTS.regular,
        FONT_WEIGHTS.medium,
        FONT_WEIGHTS.semibold,
        FONT_WEIGHTS.bold,
      ],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: SYSTEM_FALLBACKS,
    },
  ],
  integrations: [
    sitemap({
      i18n: { defaultLocale: DEFAULT_LOCALE, locales: sitemapLanguages },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
