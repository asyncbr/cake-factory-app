import productCatalogData from '@/data/products.json';

export const productCategoryIds = ['homemade-cakes'] as const;
export const productSizeIds = ['whole'] as const;
export const productVariantIds = ['plain', 'chocolate-topping'] as const;

export type ProductCategoryId = (typeof productCategoryIds)[number];
export type ProductSizeId = (typeof productSizeIds)[number];
export type ProductVariantId = (typeof productVariantIds)[number];

export type ProductCategory = {
  id: ProductCategoryId;
  order: number;
};

export type ProductSize = {
  id: ProductSizeId;
  order: number;
  serves: number;
};

export type ProductVariant = {
  id: ProductVariantId;
  order: number;
  priceModifier: number;
};

export type ProductGalleryItem = {
  id: string;
  image: string;
};

export type ProductItem = {
  id: string;
  slug: string;
  categoryId: ProductCategoryId;
  sizesAvailable: ProductSizeId[];
  variantIds: ProductVariantId[];
  basePrice: number;
  featured: boolean;
  image: string;
  gallery: ProductGalleryItem[];
};

export type ProductCatalog = {
  brand: string;
  currency: 'BRL';
  defaultLocale: 'pt-BR';
  categories: ProductCategory[];
  sizes: ProductSize[];
  variants: ProductVariant[];
  products: ProductItem[];
  featuredProductIds: string[];
  serviceInfo: {
    delivery: boolean;
    pickup: boolean;
  };
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[products] ${message}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCategoryId(value: unknown): value is ProductCategoryId {
  return productCategoryIds.includes(value as ProductCategoryId);
}

function isSizeId(value: unknown): value is ProductSizeId {
  return productSizeIds.includes(value as ProductSizeId);
}

function isVariantId(value: unknown): value is ProductVariantId {
  return productVariantIds.includes(value as ProductVariantId);
}

function assertPositivePrice(value: unknown, message: string) {
  assert(typeof value === 'number' && Number.isFinite(value) && value > 0, message);
}

function validateProductCatalog(data: unknown): ProductCatalog {
  assert(isRecord(data), 'Catalog root must be an object.');
  assert(data.brand === "D'Lourdes Casa de Bolos", 'Catalog brand must be "D\'Lourdes Casa de Bolos".');
  assert(data.currency === 'BRL', 'Catalog currency must be "BRL".');
  assert(data.defaultLocale === 'pt-BR', 'Catalog defaultLocale must be "pt-BR".');
  assert(Array.isArray(data.categories) && data.categories.length > 0, 'Catalog categories must be a non-empty array.');
  assert(Array.isArray(data.sizes) && data.sizes.length > 0, 'Catalog sizes must be a non-empty array.');
  assert(Array.isArray(data.variants) && data.variants.length > 0, 'Catalog variants must be a non-empty array.');
  assert(Array.isArray(data.products) && data.products.length > 0, 'Catalog products must be a non-empty array.');
  assert(Array.isArray(data.featuredProductIds), 'Catalog featuredProductIds must be an array.');
  assert(isRecord(data.serviceInfo), 'Catalog serviceInfo must be an object.');
  assert(typeof data.serviceInfo.delivery === 'boolean', 'Catalog serviceInfo.delivery must be boolean.');
  assert(typeof data.serviceInfo.pickup === 'boolean', 'Catalog serviceInfo.pickup must be boolean.');

  const validCategoryIds = new Set<ProductCategoryId>();
  for (const category of data.categories) {
    assert(isRecord(category), 'Each category must be an object.');
    assert(isCategoryId(category.id), `Category "${String(category.id)}" must use a supported category id.`);
    assert(typeof category.order === 'number', `Category "${String(category.id)}" must have a numeric order.`);
    validCategoryIds.add(category.id);
  }

  const validSizeIds = new Set<ProductSizeId>();
  for (const size of data.sizes) {
    assert(isRecord(size), 'Each size must be an object.');
    assert(isSizeId(size.id), `Size "${String(size.id)}" must use a supported size id.`);
    assert(typeof size.order === 'number', `Size "${String(size.id)}" must have a numeric order.`);
    assert(typeof size.serves === 'number' && size.serves > 0, `Size "${String(size.id)}" must have a positive serves number.`);
    validSizeIds.add(size.id);
  }

  const validVariantIds = new Set<ProductVariantId>();
  for (const variant of data.variants) {
    assert(isRecord(variant), 'Each variant must be an object.');
    assert(isVariantId(variant.id), `Variant "${String(variant.id)}" must use a supported variant id.`);
    assert(typeof variant.order === 'number', `Variant "${String(variant.id)}" must have a numeric order.`);
    assert(typeof variant.priceModifier === 'number' && Number.isFinite(variant.priceModifier) && variant.priceModifier >= 0, `Variant "${String(variant.id)}" must have a valid non-negative priceModifier.`);
    validVariantIds.add(variant.id);
  }

  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const product of data.products) {
    assert(isRecord(product), 'Each product must be an object.');
    assert(typeof product.id === 'string' && product.id.length > 0, 'Each product must have an id.');
    assert(!seenIds.has(product.id), `Duplicate product id "${product.id}".`);
    seenIds.add(product.id);
    assert(typeof product.slug === 'string' && product.slug.length > 0, `Product "${product.id}" must have a slug.`);
    assert(!seenSlugs.has(product.slug), `Duplicate product slug "${product.slug}".`);
    seenSlugs.add(product.slug);
    assert(validCategoryIds.has(product.categoryId as ProductCategoryId), `Product "${product.id}" has invalid category "${String(product.categoryId)}".`);
    assert(Array.isArray(product.sizesAvailable) && product.sizesAvailable.length > 0, `Product "${product.id}" must define sizesAvailable.`);
    for (const sizeId of product.sizesAvailable) {
      assert(validSizeIds.has(sizeId as ProductSizeId), `Product "${product.id}" references unknown size "${String(sizeId)}".`);
    }
    assert(Array.isArray(product.variantIds) && product.variantIds.length > 0, `Product "${product.id}" must define variantIds.`);
    for (const variantId of product.variantIds) {
      assert(validVariantIds.has(variantId as ProductVariantId), `Product "${product.id}" references unknown variant "${String(variantId)}".`);
    }
    assertPositivePrice(product.basePrice, `Product "${product.id}" must have a positive numeric basePrice.`);
    assert(typeof product.featured === 'boolean', `Product "${product.id}" featured must be boolean.`);
    assert(typeof product.image === 'string' && product.image.startsWith('/'), `Product "${product.id}" must have an image path starting with "/".`);
    assert(Array.isArray(product.gallery) && product.gallery.length > 0, `Product "${product.id}" must define a non-empty gallery.`);

    const seenGalleryIds = new Set<string>();
    for (const galleryItem of product.gallery) {
      assert(isRecord(galleryItem), `Gallery items for "${product.id}" must be objects.`);
      assert(typeof galleryItem.id === 'string' && galleryItem.id.length > 0, `Gallery items for "${product.id}" must have an id.`);
      assert(!seenGalleryIds.has(galleryItem.id), `Duplicate gallery id "${galleryItem.id}" for product "${product.id}".`);
      seenGalleryIds.add(galleryItem.id);
      assert(typeof galleryItem.image === 'string' && galleryItem.image.startsWith('/'), `Gallery item "${galleryItem.id}" for "${product.id}" must have an image path starting with "/".`);
    }
  }

  for (const featuredId of data.featuredProductIds) {
    assert(typeof featuredId === 'string' && featuredId.length > 0, 'Every featured product id must be a string.');
    assert(seenIds.has(featuredId), `featuredProductIds references missing product "${featuredId}".`);
  }

  return data as ProductCatalog;
}

export const productCatalog = validateProductCatalog(productCatalogData);

export function getProductBySlug(slug: string) {
  return productCatalog.products.find((product) => product.slug === slug) ?? null;
}

export function getProductById(id: string) {
  return productCatalog.products.find((product) => product.id === id) ?? null;
}

export function getFeaturedProducts() {
  return productCatalog.featuredProductIds
    .map((id) => getProductById(id))
    .filter((product): product is ProductItem => product !== null);
}

export function getOrderedCategories() {
  return [...productCatalog.categories].sort((left, right) => left.order - right.order);
}

export function getOrderedSizes() {
  return [...productCatalog.sizes].sort((left, right) => left.order - right.order);
}

export function getOrderedVariants() {
  return [...productCatalog.variants].sort((left, right) => left.order - right.order);
}

export function getProductsByCategory(categoryId: ProductCategoryId) {
  return productCatalog.products.filter((product) => product.categoryId === categoryId);
}

export function getSizeById(id: ProductSizeId) {
  return productCatalog.sizes.find((size) => size.id === id) ?? null;
}

export function getVariantById(id: ProductVariantId) {
  return productCatalog.variants.find((variant) => variant.id === id) ?? null;
}

export function getDefaultSizeId(product: ProductItem) {
  return product.sizesAvailable[0];
}

export function getDefaultVariantId(product: ProductItem) {
  return product.variantIds[0];
}

export function getProductPrice(product: ProductItem, variantId: ProductVariantId) {
  const variant = getVariantById(variantId);
  assert(variant, `Unknown variant "${variantId}" for product "${product.id}".`);
  return product.basePrice + variant.priceModifier;
}
