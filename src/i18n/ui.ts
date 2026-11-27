import type { Locale } from "./locales";

const fr = {
  accessibility: {
    skipToContent: "Aller au contenu",
  },
  header: {
    homeLinkLabel:
      "Association Française de Slackline, AFS, retour à l’accueil",
    mainNavigationLabel: "Navigation principale",
    thisLanguageVersion: "Version française",
  },
  navigation: {
    main: {
      associations: "Associations",
      community: "Communauté",
      spots: "Spots",
      agenda: "Agenda",
      resources: "Ressources",
      association: "L’AFS",
    },
    footer: {
      statutes: "Statuts",
      photoCredits: "Crédits photo",
      legalNotice: "Mentions légales",
      contact: "Contact",
    },
  },
  footer: {
    statement:
      "Association Française de Slackline, loi 1901. Membre de l’International Slackline Association.",
    navigationLabel: "Pied de page",
  },
  photoCredits: {
    creditPrefix: "Photo :",
    photoCount: { one: "photo sur ce site", other: "photos sur ce site" },
    memberAssociation: "Association membre de l’AFS.",
    removalTitle: "Une photo de vous ici ?",
    removalText:
      "Si vous apparaissez sur une image et souhaitez son retrait, ou si un crédit est incomplet, écrivez à l’AFS.",
    removalLink: "Contacter l’AFS",
  },
  legalNotice: {
    publisherTitle: "Éditeur",
    name: "Nom",
    legalForm: "Forme",
    legalFormValue: "Association loi 1901",
    headOffice: "Siège",
    siren: "SIREN",
    siret: "SIRET",
    rna: "RNA",
    email: "Contact",
    publicationTitle: "Publication",
    publicationDirector: "Directrice de la publication",
    publicationDirectorRole: "présidente de l’association",
    hostingTitle: "Hébergement",
    host: "Hébergeur",
    hostingService: "Service",
    hostAddress: "Adresse",
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
  header: {
    homeLinkLabel: "French Slackline Association, AFS, back to the home page",
    mainNavigationLabel: "Main navigation",
    thisLanguageVersion: "English version",
  },
  navigation: {
    main: {
      associations: "Associations",
      community: "Community",
      spots: "Spots",
      agenda: "Events",
      resources: "Resources",
      association: "About AFS",
    },
    footer: {
      statutes: "Statutes",
      photoCredits: "Photo credits",
      legalNotice: "Legal notice",
      contact: "Contact",
    },
  },
  footer: {
    statement:
      "French Slackline Association, a non-profit under the French law of 1901. Member of the International Slackline Association.",
    navigationLabel: "Footer",
  },
  photoCredits: {
    creditPrefix: "Photo:",
    photoCount: { one: "photo on this site", other: "photos on this site" },
    memberAssociation: "Member association of the AFS.",
    removalTitle: "Is that you in a photo?",
    removalText:
      "If you appear in a picture and want it removed, or if a credit is incomplete, write to the AFS.",
    removalLink: "Contact the AFS",
  },
  legalNotice: {
    publisherTitle: "Publisher",
    name: "Name",
    legalForm: "Legal form",
    legalFormValue: "Non-profit association under the French law of 1901",
    headOffice: "Registered office",
    siren: "SIREN",
    siret: "SIRET",
    rna: "RNA",
    email: "Contact",
    publicationTitle: "Publication",
    publicationDirector: "Publication director",
    publicationDirectorRole: "president of the association",
    hostingTitle: "Hosting",
    host: "Host",
    hostingService: "Service",
    hostAddress: "Address",
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
