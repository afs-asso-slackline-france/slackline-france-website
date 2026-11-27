import { describe, expect, it } from "vitest";
import { formatDateRange, isoDateInTimeZone } from "../../src/lib/dates";

describe("formatDateRange", () => {
  it("shows a single day once", () => {
    expect(formatDateRange("2026-12-05", "2026-12-05", "fr")).toBe(
      "5 déc. 2026",
    );
  });

  it("merges the shared parts of a range", () => {
    const range = formatDateRange("2026-12-11", "2026-12-13", "en");
    expect(range.replace(/\s/g, " ")).toBe("Dec 11 – 13, 2026");
  });
});

describe("isoDateInTimeZone", () => {
  it("uses the calendar day of the given time zone", () => {
    const lateEveningInParis = new Date("2026-11-27T23:30:00Z");
    expect(isoDateInTimeZone(lateEveningInParis, "Europe/Paris")).toBe(
      "2026-11-28",
    );
  });
});
