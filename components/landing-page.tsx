import { useState, type FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getDefaultVariantId,
  getFeaturedProducts,
  getOrderedVariants,
  getProductPrice,
  productCatalog,
} from '@/lib/products';
import {
  buildWhatsAppLink,
  getLocalizedPath,
  siteConfig,
  type SocialLinkId,
} from '@/lib/site';
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

type VariantDictionaryEntry = {
  label: string;
  description: string;
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/75">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">{description}</p>
    </div>
  );
}

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  flavor: string;
  topping: string;
  deliveryDate: string;
  deliveryTime: string;
  observations: string;
};

function formatPrice(locale: Locale, price: number) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: productCatalog.currency,
  }).format(price);
}

const featuredProducts = getFeaturedProducts();
const orderedVariants = getOrderedVariants();

function getSocialLabel(contact: Dictionary['contact'], id: SocialLinkId) {
  switch (id) {
    case 'instagram':
      return contact.instagramLabel;
    case 'facebook':
      return 'Facebook';
    case 'x':
      return 'X';
    case 'tiktok':
      return 'TikTok';
    default:
      return id;
  }
}

export function LandingPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const content = dictionary.landingPage;
  const products = featuredProducts;
  const variants = orderedVariants;
  const catalogProducts = dictionary.catalog.products as Record<string, ProductDictionaryEntry>;
  const catalogVariants = dictionary.catalog.variants as Record<string, VariantDictionaryEntry>;
  const galleryItems = products.flatMap((product) =>
    product.gallery.map((item) => {
      const translation = catalogProducts[product.id].gallery[item.id];
      return {
        id: `${product.id}-${item.id}`,
        image: item.image,
        title: translation.title,
        description: translation.description,
        alt: translation.alt,
      };
    })
  );
  const flavorOptions = products.map((product) => ({
    value: product.id,
    label: catalogProducts[product.id].formLabel,
  }));
  const primaryWhatsAppLink = buildWhatsAppLink(dictionary.contact.whatsappMessage);
  const socialLinks = Array.isArray(siteConfig.socialLinks) ? siteConfig.socialLinks : [];
  const canonicalUrl = `${siteConfig.siteUrl}${getLocalizedPath(locale)}`;
  const alternateLocales = i18n.locales.map((item) => ({
    locale: item,
    href: `${siteConfig.siteUrl}${getLocalizedPath(item)}`,
  }));
  const seoImage = `${siteConfig.siteUrl}/cake-social-proof.png`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: siteConfig.brandName,
    image: products.map((product) => `${siteConfig.siteUrl}${product.image}`),
    url: canonicalUrl,
    telephone: '+55 11 95831-6072',
    email: siteConfig.contactEmail,
    servesCuisine: 'Bakery',
    sameAs: [siteConfig.instagramUrl],
    areaServed: 'Sao Paulo, Brazil',
    description: dictionary.meta.homeDescription,
  };

  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    flavor: '',
    topping: '',
    deliveryDate: '',
    deliveryTime: '',
    observations: '',
  });
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'success' | 'error' | 'validation'
  >('idle');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() =>
    Object.fromEntries(products.map((product) => [product.id, getDefaultVariantId(product)]))
  );

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitState !== 'idle') {
      setSubmitState('idle');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.phone.trim() ||
      !formState.flavor.trim() ||
      !formState.topping.trim() ||
      !formState.deliveryDate.trim() ||
      !formState.deliveryTime.trim()
    ) {
      setSubmitState('validation');
      return;
    }

    setSubmitState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSubmitState('success');
      setFormState({
        name: '',
        email: '',
        phone: '',
        flavor: '',
        topping: '',
        deliveryDate: '',
        deliveryTime: '',
        observations: '',
      });
    } catch (error) {
      console.error(error);
      setSubmitState('error');
    }
  };

  const heroImage =
    products[0]?.gallery[1]?.image ?? products[0]?.image ?? '/carrot-cake-with-chocolate-topper.png';
  const heroImageAlt =
    catalogProducts[products[0]?.id ?? 'carrot-cake']?.gallery[
      products[0]?.gallery[1]?.id ?? 'carrot-cake-chocolate-topper'
    ]?.alt ?? '';

  return (
    <>
      <Head>
        <title>{dictionary.meta.homeTitle}</title>
        <meta name="description" content={dictionary.meta.homeDescription} />
        <meta name="keywords" content={dictionary.meta.homeKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteConfig.brandName} />
        <link rel="canonical" href={canonicalUrl} />
        {alternateLocales.map((item) => (
          <link key={item.locale} rel="alternate" hrefLang={item.locale} href={item.href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteConfig.siteUrl}${getLocalizedPath(i18n.defaultLocale)}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.brandName} />
        <meta property="og:title" content={dictionary.meta.homeTitle} />
        <meta property="og:description" content={dictionary.meta.homeDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:image:alt" content={content.socialProof.imageAlt} />
        <meta property="og:locale" content={locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dictionary.meta.homeTitle} />
        <meta name="twitter:description" content={dictionary.meta.homeDescription} />
        <meta name="twitter:image" content={seoImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f1_0%,#f4ecdf_35%,#fffdf9_100%)] text-stone-900">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <header className="rounded-[2rem] border border-stone-200/80 bg-white/80 px-4 py-4 shadow-sm backdrop-blur sm:rounded-[2.25rem] sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <a href="#top" className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-800/70">
                    {content.brandTag}
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-stone-900">
                    {siteConfig.brandName}
                  </p>
                </a>
              </div>

              <nav
                aria-label="Primary"
                className="hidden items-center gap-x-5 gap-y-2 text-sm text-stone-700 lg:flex lg:flex-wrap"
              >
                {content.navigation.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-stone-950">
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="grid gap-3 lg:hidden">
                <div className="flex flex-wrap items-center gap-2">
                  {i18n.locales.map((option) => (
                    <Link
                      key={option}
                      href={getLocalizedPath(option)}
                      aria-pressed={locale === option}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        locale === option
                          ? 'bg-stone-900 text-amber-50'
                          : 'border border-stone-200 bg-stone-50/80 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {dictionary.navbar.locales[option]}
                    </Link>
                  ))}
                </div>

                <nav aria-label="Primary mobile" className="grid grid-cols-2 gap-2 text-sm text-stone-700">
                  {content.navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-stone-200 bg-stone-50/70 px-3 py-2.5 text-center transition hover:text-stone-950"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <a
                  href={primaryWhatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-stone-900 px-5 py-3 text-center text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                >
                  {content.cta.orderWhatsapp}
                </a>
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                    {dictionary.navbar.languageLabel}
                  </span>
                  <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50/80 p-1">
                    {i18n.locales.map((option) => (
                      <Link
                        key={option}
                        href={getLocalizedPath(option)}
                        aria-pressed={locale === option}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          locale === option
                            ? 'bg-stone-900 text-amber-50'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {dictionary.navbar.locales[option]}
                      </Link>
                    ))}
                  </div>
                </div>
                <a
                  href={primaryWhatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                >
                  {content.cta.orderWhatsapp}
                </a>
              </div>
            </div>
          </header>

          <section
            id="top"
            className="grid gap-10 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20"
          >
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-amber-800/75">
                {content.hero.eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
                {content.hero.description}
              </p>
              <div className="mt-5 inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900">
                {content.hero.highlight}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={primaryWhatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                >
                  {content.cta.orderWhatsapp}
                </a>
                <a
                  href="#products"
                  className="rounded-full border border-stone-300 px-6 py-3 text-center text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-white/70"
                >
                  {content.cta.exploreCakes}
                </a>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {content.hero.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-stone-200/80 bg-white/75 px-5 py-4 shadow-sm"
                  >
                    <p className="text-sm font-medium text-stone-500">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-amber-100 bg-[radial-gradient(circle_at_top,#fff3dd,transparent_58%),linear-gradient(180deg,#7b4b31_0%,#3a2419_100%)] p-6 shadow-[0_30px_80px_rgba(87,54,36,0.18)] sm:p-8">
              <div className="absolute inset-x-10 top-0 h-32 rounded-full bg-amber-200/20 blur-3xl" />
              <div className="relative grid gap-4">
                <div className="rounded-[1.5rem] bg-white/90 p-4 shadow-lg">
                  <Image
                    src={heroImage}
                    alt={heroImageAlt}
                    width={800}
                    height={960}
                    className="h-auto w-full rounded-[1.25rem] object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/12 p-4 text-amber-50 backdrop-blur">
                    <p className="text-sm uppercase tracking-[0.24em] text-amber-100/70">
                      {content.hero.feature.eyebrow}
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{content.hero.feature.title}</p>
                    <p className="mt-2 text-sm leading-6 text-amber-50/80">
                      {content.hero.feature.description}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-amber-50/90 p-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-amber-900/55">
                      {content.hero.statementEyebrow}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-stone-900">
                      {content.brandStatement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200/80 bg-white/70 px-5 py-6 shadow-sm sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.valueStrip.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-stone-200/70 bg-stone-50/80 px-4 py-4"
                >
                  <p className="text-base font-semibold text-stone-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-20">
            <div className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white/85 p-6 shadow-sm sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-[1.75rem] bg-stone-100 shadow-sm">
                <Image
                  src={content.socialProof.image}
                  alt={content.socialProof.imageAlt}
                  width={640}
                  height={640}
                  className="h-auto w-full"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                  {content.socialProof.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
                  {content.socialProof.title}
                </h2>
                <div
                  aria-label={content.socialProof.ratingLabel}
                  className="mt-4 flex items-center gap-1 text-amber-700"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-700">
                  {content.socialProof.quote}
                </p>
                <p className="mt-4 text-sm font-semibold text-stone-900">
                  {content.socialProof.author}
                </p>
                <p className="text-sm text-stone-500">{content.socialProof.role}</p>
              </div>
            </div>
          </section>

          <section id="products" className="pt-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow={content.productsSection.eyebrow}
                title={content.productsSection.title}
                description={content.productsSection.description}
              />
              <Link
                href={getLocalizedPath(locale, '/products')}
                className="inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-white/70"
              >
                {content.productsSection.viewAllLabel}
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {products.map((product) => {
                const productCopy = catalogProducts[product.id];
                const selectedVariantId = selectedVariants[product.id] ?? getDefaultVariantId(product);
                const selectedVariant = catalogVariants[selectedVariantId];
                const price = formatPrice(locale, getProductPrice(product, selectedVariantId as typeof product.variantIds[number]));

                return (
                  <article
                    key={product.id}
                    className="h-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_22px_60px_rgba(91,67,50,0.08)]"
                  >
                    <div className="grid h-full gap-0 md:grid-cols-[0.95fr_1.05fr]">
                      <div className="bg-stone-100 p-5">
                        <Image
                          src={product.image}
                          alt={productCopy.imageAlt}
                          width={800}
                          height={960}
                          className="h-full w-full rounded-[1.5rem] object-cover"
                        />
                      </div>
                      <div className="flex flex-col p-6 sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                          {content.productsSection.selectionEyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-stone-950">
                          {productCopy.name}
                        </h3>
                        <p className="mt-4 text-base leading-7 text-stone-700">
                          {productCopy.description}
                        </p>

                        <p className="mt-5 text-sm font-semibold text-stone-900">
                          {content.productsSection.priceFromLabel} {price}
                        </p>

                        <div className="mt-6">
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                            {content.productsSection.variationsLabel}
                          </p>
                          <ul className="mt-3 space-y-3">
                            {product.variantIds.map((variantId) => {
                              const variant = catalogVariants[variantId];
                              return (
                                <li key={variantId} className="list-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedVariants((current) => ({
                                        ...current,
                                        [product.id]: variantId,
                                      }))
                                    }
                                    aria-pressed={selectedVariantId === variantId}
                                    className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                                      selectedVariantId === variantId
                                        ? 'bg-stone-900 text-amber-50'
                                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100'
                                    }`}
                                  >
                                    <span
                                      className={`mt-1 h-2.5 w-2.5 rounded-full ${
                                        selectedVariantId === variantId
                                          ? 'bg-amber-200'
                                          : 'bg-amber-700'
                                      }`}
                                    />
                                    <span>
                                      <span className="block font-semibold">{variant.label}</span>
                                      <span className="mt-1 block opacity-80">
                                        {variant.description}
                                      </span>
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="mt-8 md:mt-auto">
                          <a
                            href={buildWhatsAppLink(
                              `${productCopy.whatsappMessage} ${content.whatsapp.variantPrefix}: ${selectedVariant.label}.`
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                          >
                            {productCopy.ctaLabel}
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="gallery" className="pt-20">
            <SectionHeading
              eyebrow={content.gallerySection.eyebrow}
              title={content.gallerySection.title}
              description={content.gallerySection.description}
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {galleryItems.map((item) => (
                <figure
                  key={item.id}
                  className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm"
                >
                  <div className="bg-stone-100 p-4">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={800}
                      height={960}
                      className="h-auto w-full rounded-[1.25rem] object-cover"
                    />
                  </div>
                  <figcaption className="flex flex-1 flex-col px-5 pb-5 pt-2">
                    <p className="text-base font-semibold text-stone-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="how-to-order" className="pt-20">
            <SectionHeading
              eyebrow={content.howToOrder.eyebrow}
              title={content.howToOrder.title}
              description={content.howToOrder.description}
            />

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.howToOrder.steps.map((item) => (
                <article
                  key={item.step}
                  className="rounded-[1.75rem] border border-stone-200 bg-white/85 p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                    {content.howToOrder.stepLabel} {item.step}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-stone-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="pt-20">
            <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#4f2f22_0%,#8f603d_55%,#d0a46d_100%)] px-6 py-10 text-amber-50 shadow-[0_30px_80px_rgba(86,54,36,0.2)] sm:px-10 sm:py-14">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-100/80">
                {content.aboutSection.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {content.aboutSection.title}
              </h2>
              <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-amber-50/90">
                {content.aboutSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.26em] text-amber-100/80">
                {content.aboutSection.classicsIntro}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {content.aboutSection.classics.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-amber-100/25 bg-white/10 px-4 py-2 text-sm font-medium text-amber-50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="pt-20">
            <SectionHeading
              eyebrow={content.contactForm.eyebrow}
              title={content.contactForm.title}
              description={content.contactForm.description}
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="rounded-[2rem] border border-stone-200 bg-white/85 p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                  {siteConfig.brandName}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-stone-950">
                  {content.contactForm.cardTitle}
                </h3>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  {content.contactForm.cardDescription}
                </p>
                <div className="mt-6 space-y-4 rounded-[1.5rem] bg-stone-50 p-5">
                  <p className="text-sm text-stone-700">
                    <span className="font-semibold text-stone-950">
                      {dictionary.contact.whatsappLabel}:
                    </span>{' '}
                    <a
                      href={primaryWhatsAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-stone-950"
                    >
                      {content.cta.contactToOrder}
                    </a>
                  </p>
                  <p className="text-sm text-stone-700">
                    <span className="font-semibold text-stone-950">
                      {dictionary.contact.emailLabel}:
                    </span>{' '}
                    {siteConfig.contactEmail}
                  </p>
                  <p className="text-sm text-stone-600">{content.footer.pickupNote}</p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_22px_60px_rgba(91,67,50,0.08)] sm:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                    {content.contactForm.fields.name}
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(event) => handleFieldChange('name', event.target.value)}
                      placeholder={content.contactForm.placeholders.name}
                      className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                    {content.contactForm.fields.email}
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(event) => handleFieldChange('email', event.target.value)}
                      placeholder={content.contactForm.placeholders.email}
                      className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                    {content.contactForm.fields.phone}
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(event) => handleFieldChange('phone', event.target.value)}
                      placeholder={content.contactForm.placeholders.phone}
                      className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                    {content.contactForm.fields.flavor}
                    <select
                      value={formState.flavor}
                      onChange={(event) => handleFieldChange('flavor', event.target.value)}
                      className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                      required
                    >
                      <option value="">{content.contactForm.options.flavorPlaceholder}</option>
                      {flavorOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                    {content.contactForm.fields.topping}
                    <select
                      value={formState.topping}
                      onChange={(event) => handleFieldChange('topping', event.target.value)}
                      className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                      required
                    >
                      <option value="">{content.contactForm.options.toppingPlaceholder}</option>
                      {variants.map((variant) => (
                        <option key={variant.id} value={catalogVariants[variant.id].label}>
                          {catalogVariants[variant.id].label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-5 grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                      {content.contactForm.fields.deliveryDate}
                      <input
                        type="date"
                        value={formState.deliveryDate}
                        onChange={(event) => handleFieldChange('deliveryDate', event.target.value)}
                        className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                        required
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                      {content.contactForm.fields.deliveryTime}
                      <input
                        type="time"
                        value={formState.deliveryTime}
                        onChange={(event) => handleFieldChange('deliveryTime', event.target.value)}
                        className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                        required
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
                    {content.contactForm.fields.observations}
                    <textarea
                      value={formState.observations}
                      onChange={(event) => handleFieldChange('observations', event.target.value)}
                      placeholder={content.contactForm.placeholders.observations}
                      rows={5}
                      className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-amber-50 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-500"
                  >
                    {submitState === 'submitting'
                      ? content.contactForm.submittingLabel
                      : content.contactForm.submitLabel}
                  </button>

                  {submitState === 'validation' && (
                    <p className="text-sm text-amber-900">{content.contactForm.requiredError}</p>
                  )}
                  {submitState === 'success' && (
                    <p className="text-sm text-emerald-700">{content.contactForm.successMessage}</p>
                  )}
                  {submitState === 'error' && (
                    <p className="text-sm text-red-700">{content.contactForm.errorMessage}</p>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section id="faq" className="pt-20">
            <SectionHeading
              eyebrow={content.faqSection.eyebrow}
              title={content.faqSection.title}
              description={content.faqSection.description}
            />

            <div className="mt-10 space-y-4">
              {content.faqSection.items.map((item) => (
                <details
                  key={item.question}
                  className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4 shadow-sm open:bg-stone-50/70"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-stone-950">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="pt-20">
            <div className="rounded-[2.25rem] border border-amber-200/70 bg-[linear-gradient(180deg,#fff4df_0%,#f4e4cb_100%)] px-6 py-10 shadow-sm sm:px-10 sm:py-14">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-900/65">
                {content.finalCta.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                {content.finalCta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700">
                {content.finalCta.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={primaryWhatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                >
                  {content.finalCta.buttonLabel}
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-stone-300 px-6 py-3 text-center text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-white/70"
                >
                  {content.cta.visitInstagram}
                </a>
              </div>
            </div>
          </section>

          <footer className="pt-12">
            <div className="rounded-[2rem] border border-stone-200/80 bg-white/85 px-6 py-8 shadow-sm sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-800/70">
                    {siteConfig.brandName}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-7 text-stone-700">
                    {content.footer.description}
                  </p>
                  <p className="mt-3 text-sm text-stone-600">{content.footer.serviceNote}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800/70">
                    {content.footer.socialTitle}
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-stone-700">
                    <a
                      href={primaryWhatsAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-stone-950"
                    >
                      {dictionary.contact.whatsappLabel}
                    </a>
                    {socialLinks.map((socialLink) => (
                      <a
                        key={socialLink.id}
                        href={socialLink.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-stone-950"
                      >
                        {getSocialLabel(dictionary.contact, socialLink.id)}
                      </a>
                    ))}
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="transition hover:text-stone-950"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-stone-200/80 pt-5 text-sm text-stone-600 lg:flex-row lg:items-center lg:justify-between">
                <p>{content.footer.rights}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {i18n.locales.map((option) => (
                    <Link
                      key={option}
                      href={getLocalizedPath(option)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        locale === option
                          ? 'bg-stone-900 text-amber-50'
                          : 'border border-stone-200 bg-stone-50/80 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {dictionary.navbar.locales[option]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>

        <a
          href={primaryWhatsAppLink}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-amber-50 shadow-[0_18px_40px_rgba(40,25,18,0.22)] transition hover:bg-stone-800 sm:bottom-6 sm:right-6"
        >
          {content.cta.orderWhatsapp}
        </a>
      </main>
    </>
  );
}
