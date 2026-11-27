import { describe, expect, it } from "vitest";
import { parseCalendar, previousIsoDate } from "../../src/lib/ical";

const CALENDAR = [
  "BEGIN:VCALENDAR",
  "BEGIN:VEVENT",
  "DTSTART;VALUE=DATE:20261211",
  "DTEND;VALUE=DATE:20261214",
  "UID:chuntiva@google.com",
  "SUMMARY:CHUNTIVA HIGHLINE WORLD CUP  – 1K Gutiérrez\\, Colombia.",
  "LOCATION:CHUNTIVA ( Gutierrez - Colombia)",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "DTSTART:20260301T130000Z",
  "DTEND:20260301T150000Z",
  "UID:barbarium@google.com",
  "SUMMARY:BARBARIUM 2025",
  "DESCRIPTION:A long description that is folded",
  "  across two lines",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "DTSTART;VALUE=DATE:20270101",
  "STATUS:CANCELLED",
  "SUMMARY:Cancelled meeting",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

describe("parseCalendar", () => {
  it("reads all-day events with an inclusive end date and unescaped text", () => {
    expect(parseCalendar(CALENDAR)[0]).toEqual({
      uid: "chuntiva@google.com",
      summary: "CHUNTIVA HIGHLINE WORLD CUP  – 1K Gutiérrez, Colombia.",
      location: "CHUNTIVA ( Gutierrez - Colombia)",
      startDate: "2026-12-11",
      endDate: "2026-12-13",
    });
  });

  it("keeps the date of timed events and tolerates a missing location", () => {
    expect(parseCalendar(CALENDAR)[1]).toMatchObject({
      summary: "BARBARIUM 2025",
      location: "",
      startDate: "2026-03-01",
      endDate: "2026-03-01",
    });
  });

  it("skips cancelled events", () => {
    expect(parseCalendar(CALENDAR)).toHaveLength(2);
  });
});

describe("previousIsoDate", () => {
  it("crosses month and year boundaries", () => {
    expect(previousIsoDate("2027-01-01")).toBe("2026-12-31");
  });
});
