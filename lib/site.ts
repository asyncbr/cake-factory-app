import type { Locale } from '@/src/i18n/config';

export type SocialLinkId = 'instagram' | 'facebook' | 'x' | 'tiktok';

export type SocialLink = {
  id: SocialLinkId;
  href: string;
};

export const siteConfig = {
  brandName: "D'Lourdes Casa de Bolos",
  whatsappNumber: '5511958316072',
  contactEmail: 'dlourdesoficial@gmail.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://cake-factory-app.vercel.app',
  socialLinks: [
    { id: 'instagram', href: 'https://instagram.com/dlourdes.bolos' },
    { id: 'facebook', href: 'https://facebook.com/dlourdes.bolos' },
    { id: 'tiktok', href: 'https://tiktok.com/@dlourdes.bolos' },
    { id: 'x', href: 'https://x.com/dlourdes.bolos' },
  ] as SocialLink[],
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

export function getSocialLink(id: SocialLinkId) {
  return siteConfig.socialLinks.find((socialLink) => socialLink.id === id) ?? null;
}
