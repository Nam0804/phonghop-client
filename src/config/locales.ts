export const LOCALES = process.env.NEXT_PUBLIC_LOCALES ? process.env.NEXT_PUBLIC_LOCALES.split(',') : ['en', 'vn']
export const LOCALE_FALLBACK = process.env.NEXT_PUBLIC_LOCALE_FALLBACK || 'en'