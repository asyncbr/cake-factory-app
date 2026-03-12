import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getDefaultVariantId,
  getFeaturedProducts,
  getOrderedCategories,
  getProductPrice,
  getProductsByCategory,
  getSizeById,
} from '@/lib/products';
import { buildWhatsAppLink, getLocalizedPath, siteConfig } from '@/lib/site';
import { i18n, type Locale } from '@/src/i18n/config';
import type { Dictionary } from '@/src/i18n/get-dictionary';

type ProductDictionaryEntry = {
  name: string;
  shortName: string;
  formLabel: string;
  description: string;
  imageAlt: string;
  whatsappMessage: string;
  ctaLabel: string;
  gallery: Record<
    string,
    {
      title: string;
      description: string;
      alt: string;
    }
  >;
};

type SizeDictionaryEntry = {
  label: string;
  servesLabel: string;
};

type VariantDictionaryEntry = {
  label: string;
  description: string;
};

function formatPrice(locale: Locale, price: number) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function ProductsPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const labels = dictionary.productCatalog;
  const orderedCategories = getOrderedCategories();
  const featuredProducts = getFeaturedProducts();
  const catalogProducts = dictionary.catalog.products as Record<string, ProductDictionaryEntry>;
  const catalogSizes = dictionary.catalog.sizes as Record<string, SizeDictionaryEntry>;
  const catalogVariants = dictionary.catalog.variants as Record<string, VariantDictionaryEntry>;
  const canonicalUrl = `${siteConfig.siteUrl}${getLocalizedPath(locale, '/products')}`;
  const alternateLocales = i18n.locales.map((item) => ({
    locale: item,
    href: `${siteConfig.siteUrl}${getLocalizedPath(item, '/products')}`,
  }));

  return (
    <>
      <Head>
        <title>{dictionary.meta.productsTitle}</title>
        <meta name="description" content={dictionary.meta.productsDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {alternateLocales.map((item) => (
          <link key={item.locale} rel="alternate" hrefLang={item.locale} href={item.href} />
        ))}
      </Head>

      <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f1_0%,#f4ecdf_35%,#fffdf9_100%)] text-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/90 shadow-[0_24px_80px_rgba(91,67,50,0.12)] backdrop-blur">
            <div className="grid gap-8 px-5 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-800/70">
                  {labels.eyebrow}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
                  {labels.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-stone-700">
                  {labels.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppLink(dictionary.contact.whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                  >
                    {labels.primaryCta}
                  </a>
                  <Link
                    href={getLocalizedPath(locale)}
                    className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-white/70"
                  >
                    {labels.secondaryCta}
                  </Link>
                </div>
                <div className="mt-6 inline-flex max-w-2xl items-center gap-3 rounded-full border border-stone-200/70 bg-stone-50/80 px-4 py-2 text-sm text-stone-700">
                  <span className="font-semibold uppercase tracking-[0.22em] text-amber-800/90">
                    {labels.serviceBadge}
                  </span>
                  <span>{labels.serviceNote}</span>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-stone-200/80 bg-stone-50/70 p-5">
                <div className="flex flex-wrap gap-2">
                  {i18n.locales.map((language) => (
                    <Link
                      key={language}
                      href={getLocalizedPath(language, '/products')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        language === locale
                          ? 'bg-stone-900 text-amber-50'
                          : 'border border-stone-300 text-stone-700 hover:bg-white'
                      }`}
                    >
                      {dictionary.navbar.locales[language]}
                    </Link>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-stone-200/70 bg-white px-5 py-4">
                    <p className="text-3xl font-semibold text-amber-800">
                      {orderedCategories.reduce(
                        (count, category) => count + getProductsByCategory(category.id).length,
                        0
                      )}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                      {labels.stats.totalProducts}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-stone-200/70 bg-white px-5 py-4">
                    <p className="text-3xl font-semibold text-amber-800">
                      {featuredProducts.length}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                      {labels.stats.featuredProducts}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-stone-200/70 bg-white px-5 py-4">
                    <p className="text-3xl font-semibold text-amber-800">
                      {orderedCategories.length}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                      {labels.stats.categories}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-6">
            {orderedCategories.map((category) => {
              const categoryCopy = dictionary.catalog.categories[category.id];
              const products = getProductsByCategory(category.id);

              return (
                <article
                  key={category.id}
                  className="rounded-[2rem] border border-stone-200 bg-white px-5 py-6 shadow-[0_22px_60px_rgba(91,67,50,0.08)] sm:px-6"
                >
                  <div className="flex flex-col gap-3 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                        {categoryCopy.name}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-stone-950">
                        {categoryCopy.description}
                      </h2>
                    </div>
                    <p className="text-sm font-medium text-stone-600">
                      {products.length} {labels.categoryCountLabel}
                    </p>
                  </div>

                  {products.length === 0 ? (
                    <p className="mt-5 text-sm text-stone-600">{labels.emptyLabel}</p>
                  ) : (
                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      {products.map((product) => {
                        const productCopy = catalogProducts[product.id];
                        const defaultVariantId = getDefaultVariantId(product);
                        const defaultPrice = formatPrice(
                          locale,
                          getProductPrice(product, defaultVariantId)
                        );
                        const sizeLabel = product.sizesAvailable
                          .map((sizeId) => {
                            const size = getSizeById(sizeId);
                            if (!size) {
                              return null;
                            }

                            const copy = catalogSizes[size.id];
                            return `${copy.label} • ${copy.servesLabel}`;
                          })
                          .filter(Boolean)
                          .join(' / ');

                        return (
                          <article
                            key={product.id}
                            className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-50/60"
                          >
                            <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
                              <div className="bg-stone-100 p-4">
                                <Image
                                  src={product.image}
                                  alt={productCopy.imageAlt}
                                  width={800}
                                  height={960}
                                  className="h-full w-full rounded-[1.25rem] object-cover"
                                />
                              </div>
                              <div className="flex h-full flex-col p-5">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                  <div>
                                    <h3 className="text-2xl font-semibold text-stone-950">
                                      {productCopy.name}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-stone-700">
                                      {productCopy.description}
                                    </p>
                                  </div>
                                  <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                                      {labels.priceFromLabel}
                                    </p>
                                    <p className="mt-1 text-xl font-semibold text-stone-950">
                                      {defaultPrice}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-5 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700">
                                  <span className="font-semibold text-stone-900">
                                    {labels.sizeLabel}:
                                  </span>{' '}
                                  {sizeLabel}
                                </div>

                                <div className="mt-5">
                                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                                    {labels.variantsLabel}
                                  </p>
                                  <div className="mt-3 grid gap-3">
                                    {product.variantIds.map((variantId) => {
                                      const variant = catalogVariants[variantId];
                                      const variantPrice = formatPrice(
                                        locale,
                                        getProductPrice(product, variantId)
                                      );

                                      return (
                                        <div
                                          key={variantId}
                                          className="rounded-2xl border border-stone-200 bg-white px-4 py-4"
                                        >
                                          <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                              <p className="text-base font-semibold text-stone-950">
                                                {variant.label}
                                              </p>
                                              <p className="mt-2 text-sm leading-6 text-stone-700">
                                                {variant.description}
                                              </p>
                                            </div>
                                            <div className="text-right">
                                              <p className="text-lg font-semibold text-stone-950">
                                                {variantPrice}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="mt-4">
                                            <a
                                              href={buildWhatsAppLink(
                                                `${productCopy.whatsappMessage} ${dictionary.landingPage.whatsapp.variantPrefix}: ${variant.label}.`
                                              )}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="inline-flex rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                                            >
                                              {productCopy.ctaLabel}
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="mt-5">
                                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                                    {labels.galleryLabel}
                                  </p>
                                  <div className="mt-3 grid grid-cols-3 gap-3">
                                    {product.gallery.map((item) => {
                                      const galleryItem = productCopy.gallery[item.id];
                                      return (
                                        <div
                                          key={item.id}
                                          className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
                                        >
                                          <Image
                                            src={item.image}
                                            alt={galleryItem.alt}
                                            width={480}
                                            height={480}
                                            className="aspect-square h-full w-full object-cover"
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}
