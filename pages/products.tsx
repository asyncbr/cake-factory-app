import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  isSiteLocale,
  localeLabels,
  siteConfig,
  supportedLocales,
  type SiteLocale,
} from '@/lib/site';
import { getLocalizedProducts, productCatalog } from '@/lib/products';

export default function ProductsPreviewPage() {
  const router = useRouter();
  const routerLocale = router.locale ?? null;
  const locale: SiteLocale = isSiteLocale(routerLocale) ? routerLocale : 'pt-BR';
  const products = getLocalizedProducts(locale);

  return (
    <>
      <Head>
        <title>{`${siteConfig.brandName} | Product Catalog Preview`}</title>
        <meta
          name="description"
          content="Preview page for validating the D'Lourdes product catalog JSON data."
        />
      </Head>

      <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f1_0%,#f4ecdf_35%,#fffdf9_100%)] text-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-800/70">
                  Catalog Preview
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                  Product Data Preview
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
                  Use this page to validate additions or removals in{' '}
                  <code className="rounded bg-stone-100 px-2 py-1 text-sm text-stone-800">
                    data/products.json
                  </code>{' '}
                  before checking the landing page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {supportedLocales.map((option) => (
                  <Link
                    key={option}
                    href={router.asPath}
                    locale={option}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      locale === option
                        ? 'bg-stone-900 text-amber-50'
                        : 'border border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {localeLabels[option]}
                  </Link>
                ))}
                <Link
                  href="/"
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
                >
                  Back to landing page
                </Link>
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-stone-200 bg-white/85 p-5 shadow-sm">
              <p className="text-sm font-medium text-stone-500">Current locale</p>
              <p className="mt-2 text-2xl font-semibold text-stone-950">{localeLabels[locale]}</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white/85 p-5 shadow-sm">
              <p className="text-sm font-medium text-stone-500">Products in catalog</p>
              <p className="mt-2 text-2xl font-semibold text-stone-950">{productCatalog.length}</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white/85 p-5 shadow-sm">
              <p className="text-sm font-medium text-stone-500">Available locales</p>
              <p className="mt-2 text-2xl font-semibold text-stone-950">{supportedLocales.length}</p>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_50px_rgba(91,67,50,0.08)]"
              >
                <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="bg-stone-100 p-5">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width={800}
                      height={960}
                      className="h-full w-full rounded-[1.5rem] object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                      {product.id}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-stone-950">{product.name}</h2>
                    <p className="mt-4 text-base leading-7 text-stone-700">{product.description}</p>

                    <div className="mt-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                        CTA
                      </p>
                      <p className="mt-2 text-sm text-stone-800">{product.ctaLabel}</p>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                        Variants
                      </p>
                      <ul className="mt-3 space-y-2">
                        {product.variants.map((variant) => (
                          <li
                            key={variant}
                            className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-800"
                          >
                            {variant}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                        Gallery items
                      </p>
                      <p className="mt-2 text-sm text-stone-800">{product.galleryItems.length}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
