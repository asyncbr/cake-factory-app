import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ProductsPage } from '@/components/products-page';
import { i18n, isLocale, type Locale } from '@/src/i18n/config';
import { getDictionary, type Dictionary } from '@/src/i18n/get-dictionary';

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: i18n.locales.map((locale) => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const localeParam = typeof params?.locale === 'string' ? params.locale : i18n.defaultLocale;

  if (!isLocale(localeParam)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      locale: localeParam,
      dictionary: await getDictionary(localeParam),
    },
  };
};

export default function LocalizedProductsPage({
  locale,
  dictionary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ProductsPage locale={locale} dictionary={dictionary} />;
}
