import type { Locale } from "./locales";

export interface PluralForms {
  one: string;
  other: string;
}

export function countWithNoun(
  count: number,
  locale: Locale,
  forms: PluralForms,
): string {
  const category = new Intl.PluralRules(locale).select(count);
  const noun = category === "one" ? forms.one : forms.other;
  return `${count} ${noun}`;
}
