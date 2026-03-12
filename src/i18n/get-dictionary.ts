import {
  getOrderedCategories,
  getOrderedSizes,
  getOrderedVariants,
  productCatalog,
} from '@/lib/products';
import type { Locale } from '@/src/i18n/config';
import enDictionary from '@/src/i18n/dictionaries/en';
import esDictionary from '@/src/i18n/dictionaries/es';
import ptBRDictionary from '@/src/i18n/dictionaries/pt-BR';

type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer Item)[]
        ? readonly DeepWiden<Item>[]
        : T extends object
          ? { [Key in keyof T]: DeepWiden<T[Key]> }
          : T;

export type Dictionary = DeepWiden<typeof ptBRDictionary>;

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

function assertDictionary(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[i18n] ${message}`);
  }
}

function validateDictionary(locale: Locale, dictionary: Dictionary) {
  const catalogProducts = dictionary.catalog.products as Record<string, ProductDictionaryEntry>;

  for (const category of getOrderedCategories()) {
    const entry = dictionary.catalog.categories[category.id];
    assertDictionary(entry, `Missing category translation "${category.id}" for locale "${locale}".`);
    assertDictionary(
      typeof entry.name === 'string' && entry.name.length > 0,
      `Missing category name for "${category.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.description === 'string' && entry.description.length > 0,
      `Missing category description for "${category.id}" in locale "${locale}".`
    );
  }

  for (const size of getOrderedSizes()) {
    const entry = dictionary.catalog.sizes[size.id];
    assertDictionary(entry, `Missing size translation "${size.id}" for locale "${locale}".`);
    assertDictionary(
      typeof entry.label === 'string' && entry.label.length > 0,
      `Missing size label for "${size.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.servesLabel === 'string' && entry.servesLabel.length > 0,
      `Missing servesLabel for "${size.id}" in locale "${locale}".`
    );
  }

  for (const variant of getOrderedVariants()) {
    const entry = dictionary.catalog.variants[variant.id];
    assertDictionary(entry, `Missing variant translation "${variant.id}" for locale "${locale}".`);
    assertDictionary(
      typeof entry.label === 'string' && entry.label.length > 0,
      `Missing variant label for "${variant.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.description === 'string' && entry.description.length > 0,
      `Missing variant description for "${variant.id}" in locale "${locale}".`
    );
  }

  for (const product of productCatalog.products) {
    const entry = catalogProducts[product.id];
    assertDictionary(entry, `Missing product translation "${product.id}" for locale "${locale}".`);
    assertDictionary(
      typeof entry.name === 'string' && entry.name.length > 0,
      `Missing product name for "${product.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.shortName === 'string' && entry.shortName.length > 0,
      `Missing product shortName for "${product.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.formLabel === 'string' && entry.formLabel.length > 0,
      `Missing product formLabel for "${product.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.description === 'string' && entry.description.length > 0,
      `Missing product description for "${product.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.imageAlt === 'string' && entry.imageAlt.length > 0,
      `Missing product imageAlt for "${product.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.whatsappMessage === 'string' && entry.whatsappMessage.length > 0,
      `Missing product WhatsApp message for "${product.id}" in locale "${locale}".`
    );
    assertDictionary(
      typeof entry.ctaLabel === 'string' && entry.ctaLabel.length > 0,
      `Missing product CTA label for "${product.id}" in locale "${locale}".`
    );

    for (const galleryItem of product.gallery) {
      const galleryEntry = entry.gallery[galleryItem.id];
      assertDictionary(
        galleryEntry,
        `Missing gallery item translation "${product.id}.${galleryItem.id}" for locale "${locale}".`
      );
      assertDictionary(
        typeof galleryEntry.title === 'string' && galleryEntry.title.length > 0,
        `Missing gallery title for "${product.id}.${galleryItem.id}" in locale "${locale}".`
      );
      assertDictionary(
        typeof galleryEntry.description === 'string' && galleryEntry.description.length > 0,
        `Missing gallery description for "${product.id}.${galleryItem.id}" in locale "${locale}".`
      );
      assertDictionary(
        typeof galleryEntry.alt === 'string' && galleryEntry.alt.length > 0,
        `Missing gallery alt for "${product.id}.${galleryItem.id}" in locale "${locale}".`
      );
    }
  }
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'pt-BR': async () => ptBRDictionary,
  en: async () => enDictionary,
  es: async () => esDictionary,
};

validateDictionary('pt-BR', ptBRDictionary);
validateDictionary('en', enDictionary);
validateDictionary('es', esDictionary);

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
