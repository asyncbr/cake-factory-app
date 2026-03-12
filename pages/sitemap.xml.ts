import type { GetServerSideProps } from 'next';
import { siteConfig, supportedLocales } from '@/lib/site';

function buildUrl(path: string) {
  return path ? `${siteConfig.siteUrl}${path}` : siteConfig.siteUrl;
}

function buildSitemap() {
  const locales = supportedLocales.map((locale) => ({
    locale,
    path: locale === 'pt-BR' ? '' : `/${locale}`,
  }));

  const urls = locales
    .map(
      ({ path }) => `
  <url>
    <loc>${buildUrl(path)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path ? '0.8' : '1.0'}</priority>
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
