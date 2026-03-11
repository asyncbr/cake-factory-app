import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  buildWhatsAppLink,
  isSiteLocale,
  siteConfig,
  siteContent,
  supportedLocales,
  type SiteLocale,
} from '@/lib/site';

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
      <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<SiteLocale>(() => {
    if (typeof window === 'undefined') {
      return 'pt-BR';
    }

    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');

    return isSiteLocale(lang) ? lang : 'pt-BR';
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const content = siteContent[locale];
  const primaryWhatsAppLink = buildWhatsAppLink(content.whatsapp.defaultMessage);

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    setLocale(nextLocale);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', nextLocale);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <>
      <Head>
        <title>{siteConfig.brandName}</title>
        <meta
          name="description"
          content={content.metaDescription}
        />
      </Head>

      <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f1_0%,#f4ecdf_35%,#fffdf9_100%)] text-stone-900">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <header className="rounded-full border border-stone-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center justify-between gap-4">
                <a href="#top" className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-800/70">
                    {content.brandTag}
                  </p>
                  <p className="truncate text-lg font-semibold text-stone-900 sm:text-xl">
                    {siteConfig.brandName}
                  </p>
                </a>

                <div className="flex items-center gap-3 lg:hidden">
                  <div className="hidden items-center gap-1 rounded-full border border-stone-200 bg-stone-50/80 p-1 sm:flex">
                    {supportedLocales.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleLocaleChange(option)}
                        aria-pressed={locale === option}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          locale === option
                            ? 'bg-stone-900 text-amber-50'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {option === 'pt-BR' ? 'PT-BR' : 'EN'}
                      </button>
                    ))}
                  </div>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900">
                        {content.auth.signIn}
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/product"
                        className="rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
                      >
                        {content.auth.app}
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </div>

              <nav
                aria-label="Primary"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-700"
              >
                {content.navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-stone-950"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                    {content.languageLabel}
                  </span>
                  <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50/80 p-1">
                    {supportedLocales.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleLocaleChange(option)}
                        aria-pressed={locale === option}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          locale === option
                            ? 'bg-stone-900 text-amber-50'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {option === 'pt-BR' ? 'PT-BR' : 'EN'}
                      </button>
                    ))}
                  </div>
                </div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900">
                      {content.auth.signIn}
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/product"
                      className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
                    >
                      {content.auth.goToApp}
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
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
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
                {content.hero.description}
              </p>
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
                    src="/carrot-cake-with-chocolate-topper.png"
                    alt={content.gallerySection.items[1].alt}
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
                  key={item}
                  className="rounded-2xl border border-stone-200/70 bg-stone-50/80 px-4 py-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800/70">
                    {content.valueStrip.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-stone-900">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="products" className="pt-20">
            <SectionHeading
              eyebrow={content.productsSection.eyebrow}
              title={content.productsSection.title}
              description={content.productsSection.description}
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {content.products.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_22px_60px_rgba(91,67,50,0.08)]"
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
                    <div className="flex flex-col p-6 sm:p-8">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/70">
                        {content.productsSection.selectionEyebrow}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-stone-950">
                        {product.name}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-stone-700">
                        {product.description}
                      </p>

                      <div className="mt-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                          {content.productsSection.variationsLabel}
                        </p>
                        <ul className="mt-3 space-y-3">
                          {product.variants.map((variant) => (
                            <li
                              key={variant}
                              className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-800"
                            >
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-700" />
                              {variant}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8">
                        <a
                          href={buildWhatsAppLink(product.whatsappMessage)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
                        >
                          {content.cta.orderWhatsapp}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pt-20">
            <SectionHeading
              eyebrow={content.whyChoose.eyebrow}
              title={content.whyChoose.title}
              description={content.whyChoose.description}
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {content.whyChoose.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-stone-200/80 bg-white/85 p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800/70">
                    D’Lourdes
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-stone-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="gallery" className="pt-20">
            <SectionHeading
              eyebrow={content.gallerySection.eyebrow}
              title={content.gallerySection.title}
              description={content.gallerySection.description}
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {content.gallerySection.items.map((item) => (
                <figure
                  key={item.title}
                  className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm"
                >
                  <div className="bg-stone-100 p-4">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={800}
                      height={960}
                      className="h-auto w-full rounded-[1.25rem]"
                    />
                  </div>
                  <figcaption className="px-5 pb-5 pt-2">
                    <p className="text-base font-semibold text-stone-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {content.gallerySection.note}
                    </p>
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
                {content.brandPositioning.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {content.brandPositioning.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-amber-50/85">
                {content.brandPositioning.description}
              </p>
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
                  {content.cta.orderWhatsapp}
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
            <div className="flex flex-col gap-6 border-t border-stone-200/80 py-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-800/70">
                  {siteConfig.brandName}
                </p>
                <p className="mt-3 text-base text-stone-700">
                  {content.brandStatement}
                </p>
                <p className="mt-2 text-sm text-stone-600">{content.footer.serviceNote}</p>
              </div>

              <div className="space-y-2 text-sm text-stone-700">
                <p>
                  <span className="font-semibold text-stone-900">{content.footer.whatsappLabel}:</span>{' '}
                  <a
                    href={primaryWhatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-stone-950"
                  >
                    {content.cta.contactToOrder}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-stone-900">{content.footer.instagramLabel}:</span>{' '}
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-stone-950"
                  >
                    @dlourdescasadebolos
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
