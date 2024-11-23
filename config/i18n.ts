// config/i18n.ts
export const locales = ['en', 'ko'] as const
export type Locale = typeof locales[number]

export const defaultLocale = 'ko'

export const localeNames = {
  en: 'English',
  ko: '한국어'
} as const