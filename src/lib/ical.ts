export interface CalendarEvent {
  uid: string;
  summary: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface ContentLine {
  name: string;
  parameters: string;
  value: string;
}

const FOLDED_LINE_BREAK = /\r?\n[ \t]/g;
const LINE_BREAK = /\r?\n/;
const COMPACT_DATE = /^(\d{4})(\d{2})(\d{2})/;
const DATE_ONLY_PARAMETER = "VALUE=DATE";
const CANCELLED_STATUS = "CANCELLED";
const ESCAPED_SEQUENCES: Record<string, string> = {
  "\\n": " ",
  "\\N": " ",
  "\\,": ",",
  "\\;": ";",
  "\\\\": "\\",
};
const ESCAPED_SEQUENCE = /\\[nN,;\\]/g;

function unescapeText(value: string): string {
  return value
    .replace(ESCAPED_SEQUENCE, (sequence) => ESCAPED_SEQUENCES[sequence] ?? "")
    .trim();
}

function parseContentLine(line: string): ContentLine | undefined {
  const valueStart = line.indexOf(":");
  if (valueStart === -1) return undefined;
  const head = line.slice(0, valueStart);
  const parametersStart = head.indexOf(";");
  const hasParameters = parametersStart !== -1;
  return {
    name: hasParameters ? head.slice(0, parametersStart) : head,
    parameters: hasParameters ? head.slice(parametersStart + 1) : "",
    value: line.slice(valueStart + 1),
  };
}

export function isoDateFromCompact(compactDate: string): string {
  const dateParts = COMPACT_DATE.exec(compactDate);
  if (!dateParts) {
    throw new Error(`Expected an iCalendar date, received "${compactDate}".`);
  }
  const [, year, month, day] = dateParts;
  return `${year}-${month}-${day}`;
}

export function previousIsoDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, "YYYY-MM-DD".length);
}

// All-day events end on the day after their last day, as RFC 5545 makes DTEND exclusive.
function inclusiveEndDate(endLine: ContentLine): string {
  const endDate = isoDateFromCompact(endLine.value);
  const isDateOnly = endLine.parameters.includes(DATE_ONLY_PARAMETER);
  return isDateOnly ? previousIsoDate(endDate) : endDate;
}

function toEvent(
  properties: Map<string, ContentLine>,
): CalendarEvent | undefined {
  const start = properties.get("DTSTART");
  const isCancelled = properties.get("STATUS")?.value === CANCELLED_STATUS;
  if (!start || isCancelled) return undefined;
  const startDate = isoDateFromCompact(start.value);
  const end = properties.get("DTEND");
  return {
    uid: properties.get("UID")?.value ?? `${startDate}-${start.value}`,
    summary: unescapeText(properties.get("SUMMARY")?.value ?? ""),
    location: unescapeText(properties.get("LOCATION")?.value ?? ""),
    startDate,
    endDate: end ? inclusiveEndDate(end) : startDate,
  };
}

export function parseCalendar(calendarText: string): CalendarEvent[] {
  const lines = calendarText.replace(FOLDED_LINE_BREAK, "").split(LINE_BREAK);
  const events: CalendarEvent[] = [];
  let currentProperties: Map<string, ContentLine> | undefined;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      currentProperties = new Map();
      continue;
    }
    if (line === "END:VEVENT" && currentProperties) {
      const event = toEvent(currentProperties);
      if (event) events.push(event);
      currentProperties = undefined;
      continue;
    }
    const contentLine = currentProperties && parseContentLine(line);
    if (contentLine) currentProperties?.set(contentLine.name, contentLine);
  }
  return events;
}

export async function fetchCalendar(feedUrl: string): Promise<CalendarEvent[]> {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(
      `Could not load the calendar ${feedUrl}: HTTP ${response.status}. The agenda needs it to build.`,
    );
  }
  return parseCalendar(await response.text());
}
