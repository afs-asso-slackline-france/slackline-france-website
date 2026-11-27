// Placeholder until the production domain is chosen.
export const SITE_ORIGIN = "https://www.slackline-france.fr";

export const SITE_NAME = "Association Française de Slackline";

export const SITE_SHORT_NAME = "AFS";

export const CONTACT_EMAIL = "associationfrancaiseslackline@gmail.com";

export const MEMBERSHIP_URL =
  "https://www.helloasso.com/associations/association-francaise-de-slackline/adhesions/adhesion-afs-2026-2027";

export const SOCIAL_LINKS = {
  discord: "https://discord.gg/HYdsCbbu7C",
  instagram: "https://www.instagram.com/associationfrancaise_slackline/",
  facebook: "https://www.facebook.com/AssociationFrancaiseSlackline/",
  youtube: "https://www.youtube.com/@AFS-AssociationFran%C3%A7aiseSlack",
} as const;

export const SOCIAL_NETWORK_NAMES: Record<keyof typeof SOCIAL_LINKS, string> = {
  discord: "Discord",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
};

export const SITE_TIME_ZONE = "Europe/Paris";

export const ISA_EVENTS_PAGE =
  "https://www.slacklineinternational.org/slackline-events/";

// The ISA events page shows these two public Google Calendars: events and festivals, and the World Cup.
export const ISA_CALENDAR_FEEDS = [
  "https://calendar.google.com/calendar/ical/slacklineinternational.org_vkg41vk9rou3ge6tg2ro3q3qco%40group.calendar.google.com/public/basic.ics",
  "https://calendar.google.com/calendar/ical/c_313178c5777ceec7db1a61cf939f51f8cd9ec9c7b33411f4ef4ee4f3e32ea0d6%40group.calendar.google.com/public/basic.ics",
];

export interface PostalAddress {
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  addressCountry: string;
}

export const LEGAL_IDENTITY = {
  siren: "133 193 474",
  siret: "133 193 474 00011",
  rna: "W071006980",
  publicationDirector: "Gaëlle Joubert",
  address: {
    streetAddress: "387 route du Chambon",
    postalCode: "07310",
    addressLocality: "Saint-Martial",
    addressCountry: "FR",
  } satisfies PostalAddress,
} as const;

export const HOSTING_PROVIDER = {
  name: "GitHub, Inc.",
  service: "GitHub Pages",
  url: "https://pages.github.com/",
  address: {
    streetAddress: "88 Colin P. Kelly Jr. Street",
    postalCode: "CA 94107",
    addressLocality: "San Francisco",
    addressCountry: "US",
  } satisfies PostalAddress,
} as const;
