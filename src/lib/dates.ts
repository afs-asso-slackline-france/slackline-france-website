const DAY_MONTH_YEAR: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
};

function utcDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}

export function isoDateInTimeZone(moment: Date, timeZone: string): string {
  // The Swedish locale formats dates as YYYY-MM-DD, the ISO order.
  return moment.toLocaleDateString("sv-SE", { timeZone });
}

export function formatDateRange(
  startIsoDate: string,
  endIsoDate: string,
  language: string,
): string {
  const formatter = new Intl.DateTimeFormat(language, DAY_MONTH_YEAR);
  const start = utcDate(startIsoDate);
  if (startIsoDate === endIsoDate) return formatter.format(start);
  return formatter.formatRange(start, utcDate(endIsoDate));
}
