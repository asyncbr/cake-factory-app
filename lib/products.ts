import productCatalogJson from '@/data/products.json';
import { supportedLocales, type SiteLocale } from '@/lib/site';

export type LocalizedGalleryItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type LocalizedProductContent = {
  name: string;
  formLabel: string;
  description: string;
  variants: string[];
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  ctaLabel: string;
  galleryItems: LocalizedGalleryItem[];
};

export type ProductCatalogItem = {
  id: string;
  locales: Record<SiteLocale, LocalizedProductContent>;
};

export type LocalizedProduct = {
  id: string;
} & LocalizedProductContent;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function assertNonEmptyString(value: unknown, field: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid product catalog: "${field}" must be a non-empty string.`);
  }
}

function assertStringArray(value: unknown, field: string) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== 'string' || item.trim().length === 0)
  ) {
    throw new Error(`Invalid product catalog: "${field}" must be a non-empty string array.`);
  }
}

function assertGalleryItems(value: unknown, field: string) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Invalid product catalog: "${field}" must be a non-empty array.`);
  }

  value.forEach((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`Invalid product catalog: "${field}[${index}]" must be an object.`);
    }

    assertNonEmptyString(item.title, `${field}[${index}].title`);
    assertNonEmptyString(item.description, `${field}[${index}].description`);
    assertNonEmptyString(item.image, `${field}[${index}].image`);
    assertNonEmptyString(item.alt, `${field}[${index}].alt`);
  });
}

function validateProductCatalog(data: unknown): ProductCatalogItem[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid product catalog: root value must be an array.');
  }

  const seenIds = new Set<string>();

  return data.map((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`Invalid product catalog: product at index ${index} must be an object.`);
    }

    assertNonEmptyString(item.id, `products[${index}].id`);
    const productId = item.id as string;

    if (seenIds.has(productId)) {
      throw new Error(`Invalid product catalog: duplicate product id "${productId}".`);
    }

    seenIds.add(productId);

    if (!isRecord(item.locales)) {
      throw new Error(`Invalid product catalog: products[${index}].locales must be an object.`);
    }

    const locales = item.locales as Record<string, unknown>;

    supportedLocales.forEach((locale) => {
      const localized = locales[locale];

      if (!isRecord(localized)) {
        throw new Error(
          `Invalid product catalog: products[${index}] is missing locale "${locale}".`
        );
      }

      assertNonEmptyString(localized.name, `products[${index}].locales.${locale}.name`);
      assertNonEmptyString(localized.formLabel, `products[${index}].locales.${locale}.formLabel`);
      assertNonEmptyString(
        localized.description,
        `products[${index}].locales.${locale}.description`
      );
      assertStringArray(localized.variants, `products[${index}].locales.${locale}.variants`);
      assertNonEmptyString(localized.image, `products[${index}].locales.${locale}.image`);
      assertNonEmptyString(localized.imageAlt, `products[${index}].locales.${locale}.imageAlt`);
      assertNonEmptyString(
        localized.whatsappMessage,
        `products[${index}].locales.${locale}.whatsappMessage`
      );
      assertNonEmptyString(localized.ctaLabel, `products[${index}].locales.${locale}.ctaLabel`);
      assertGalleryItems(
        localized.galleryItems,
        `products[${index}].locales.${locale}.galleryItems`
      );
    });

    return item as ProductCatalogItem;
  });
}

export const productCatalog: ProductCatalogItem[] = validateProductCatalog(productCatalogJson);

export function getLocalizedProducts(locale: SiteLocale): LocalizedProduct[] {
  return productCatalog.map((product) => ({
    id: product.id,
    ...product.locales[locale],
  }));
}

export function getLocalizedGalleryItems(locale: SiteLocale) {
  return productCatalog.flatMap((product) => product.locales[locale].galleryItems);
}

export function getLocalizedFlavorOptions(locale: SiteLocale) {
  return productCatalog.map((product) => ({
    value: product.id,
    label: product.locales[locale].formLabel,
  }));
}
