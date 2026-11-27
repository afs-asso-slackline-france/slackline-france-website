import type { PostalAddress } from "./site";

export function countryName(countryCode: string, language: string): string {
  const regionNames = new Intl.DisplayNames([language], { type: "region" });
  return regionNames.of(countryCode) ?? countryCode;
}

export function formatPostalAddress(
  address: PostalAddress,
  language: string,
): string {
  const locality = `${address.postalCode} ${address.addressLocality}`;
  const country = countryName(address.addressCountry, language);
  return [address.streetAddress, locality, country].join(", ");
}
