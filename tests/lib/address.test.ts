import { describe, expect, it } from "vitest";
import { formatPostalAddress } from "../../src/lib/address";

const address = {
  streetAddress: "88 Colin P. Kelly Jr. Street",
  postalCode: "CA 94107",
  addressLocality: "San Francisco",
  addressCountry: "US",
};

describe("formatPostalAddress", () => {
  it("names the country in the page language", () => {
    expect(formatPostalAddress(address, "fr")).toBe(
      "88 Colin P. Kelly Jr. Street, CA 94107 San Francisco, États-Unis",
    );
    expect(formatPostalAddress(address, "en")).toBe(
      "88 Colin P. Kelly Jr. Street, CA 94107 San Francisco, United States",
    );
  });
});
