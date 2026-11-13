import type { Locale } from "./locales";

const fr = {
  accessibility: {
    skipToContent: "Aller au contenu",
  },
  notFound: {
    pageTitle: "Page introuvable | AFS",
    pageDescription: "Cette page n'existe pas ou a été déplacée.",
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    homeButton: "Retour à l'accueil",
  },
};

export type UiStrings = typeof fr;

const en: UiStrings = {
  accessibility: {
    skipToContent: "Skip to content",
  },
  notFound: {
    pageTitle: "Page not found | AFS",
    pageDescription: "This page does not exist or has moved.",
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    homeButton: "Back to the home page",
  },
};

const UI_STRINGS: Record<Locale, UiStrings> = { fr, en };

export function uiStrings(locale: Locale): UiStrings {
  return UI_STRINGS[locale];
}
