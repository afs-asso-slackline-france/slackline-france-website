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
