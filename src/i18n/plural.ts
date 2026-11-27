import type { Locale } from "./locales";

export interface PluralForms {
  one: string;
  other: string;
}

export function pluralNoun(
  count: number,
  locale: Locale,
  forms: PluralForms,
): string {
  const category = new Intl.PluralRules(locale).select(count);
  return category === "one" ? forms.one : forms.other;
}

export function countWithNoun(
  count: number,
  locale: Locale,
  forms: PluralForms,
): string {
  return `${count} ${pluralNoun(count, locale, forms)}`;
}
