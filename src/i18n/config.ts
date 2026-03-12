export const i18n = {
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en', 'es'],
} as const;

export type Locale = (typeof i18n.locales)[number];

export function isLocale(value: string): value is Locale {
  return i18n.locales.includes(value as Locale);
}
