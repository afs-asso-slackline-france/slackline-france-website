import { describe, expect, it } from "vitest";
import { mergeCalendars, upcomingEvents } from "../../src/lib/agenda";
import type { CalendarEvent } from "../../src/lib/ical";

function event(
  summary: string,
  startDate: string,
  endDate = startDate,
): CalendarEvent {
  return { uid: summary, summary, location: "", startDate, endDate };
}

describe("mergeCalendars", () => {
  it("keeps one copy of an event listed in both calendars, sorted by date", () => {
    const merged = mergeCalendars([
      [event("Festival B", "2027-02-01"), event("World Cup", "2027-01-10")],
      [event("world cup", "2027-01-10")],
    ]);
    expect(merged.map((entry) => entry.summary)).toEqual([
      "World Cup",
      "Festival B",
    ]);
  });
});

describe("upcomingEvents", () => {
  const events = [
    event("Past", "2026-11-01"),
    event("Running", "2026-11-20", "2026-11-30"),
    event("Next", "2026-12-05"),
    event("Later", "2027-04-12"),
  ];

  it("keeps events that have not ended yet, up to the limit", () => {
    expect(
      upcomingEvents(events, "2026-11-27", 2).map((entry) => entry.summary),
    ).toEqual(["Running", "Next"]);
  });
});
