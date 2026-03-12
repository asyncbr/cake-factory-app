import type { Locale } from '@/src/i18n/config';

export const siteConfig = {
  brandName: "D'Lourdes Casa de Bolos",
  instagramUrl: 'https://instagram.com/dlourdes.bolos',
  instagramHandle: '@dlourdescasadebolos',
  whatsappNumber: '5511958316072',
  contactEmail: 'dlourdesoficial@gmail.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://cake-factory-app.vercel.app',
} as const;

export function buildWhatsAppLink(message: string) {
  const sanitizedNumber = siteConfig.whatsappNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
}

export function getLocalizedPath(locale: Locale, pathname = '') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
}
