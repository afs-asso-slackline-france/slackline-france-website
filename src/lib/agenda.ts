import type { CalendarEvent } from "./ical";

function duplicateKey(event: CalendarEvent): string {
  return `${event.startDate}|${event.summary.toLowerCase()}`;
}

function byStartDate(first: CalendarEvent, second: CalendarEvent): number {
  return (
    first.startDate.localeCompare(second.startDate) ||
    first.summary.localeCompare(second.summary)
  );
}

export function mergeCalendars(calendars: CalendarEvent[][]): CalendarEvent[] {
  const eventsByKey = new Map<string, CalendarEvent>();
  for (const event of calendars.flat()) {
    const key = duplicateKey(event);
    if (!eventsByKey.has(key)) eventsByKey.set(key, event);
  }
  return [...eventsByKey.values()].sort(byStartDate);
}

export function upcomingEvents(
  events: CalendarEvent[],
  todayIsoDate: string,
  limit: number,
): CalendarEvent[] {
  return events
    .filter((event) => event.endDate >= todayIsoDate)
    .sort(byStartDate)
    .slice(0, limit);
}
