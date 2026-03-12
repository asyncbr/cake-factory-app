import type { GetServerSideProps } from 'next';
import { getLocalizedPath, siteConfig } from '@/lib/site';
import { i18n } from '@/src/i18n/config';

function buildUrl(path: string) {
  return path ? `${siteConfig.siteUrl}${path}` : siteConfig.siteUrl;
}

function buildSitemap() {
  const localizedPaths = i18n.locales.flatMap((locale) => [
    getLocalizedPath(locale),
    getLocalizedPath(locale, '/products'),
  ]);

  const urls = localizedPaths
    .map(
      (path) => `
  <url>
    <loc>${buildUrl(path)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path.endsWith('/products') ? '0.8' : '1.0'}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml');
  res.write(buildSitemap());
  res.end();

  return {
    props: {},
  };
};

export default function SitemapXml() {
  return null;
}
