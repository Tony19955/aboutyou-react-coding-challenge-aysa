import { Product } from '../types/Product';
import {
  BapiProduct,
  ProductImage,
  Value,
} from '@aboutyou/backbone/types/BapiProduct';

const getImageUrl = (hash: string) =>
  `//cdn.aboutstatic.com/file/${hash}?quality=70&progressive=true&width=800&height=800&brightness=0.95`;

const getProductDefaultImage = (
  productImages: ProductImage[],
): string | null => {
  const bustImage = productImages.find(
    (p) => (p.attributes.imageType?.values as Value)?.value === 'bust',
  );

  if (bustImage) {
    return getImageUrl(bustImage.hash);
  }

  if (productImages[0]) {
    return getImageUrl(productImages[0].hash);
  }

  return null;
};

const formatPrice = (centPrice: number, currency: string) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(
    centPrice / 100,
  );

export const normalizeProduct = (product: BapiProduct): Product => ({
  id: product.id,
  image: getProductDefaultImage(product.images),
  name: (product.attributes.brand?.values as Value).label,
  price: product.priceRange
    ? `from ${formatPrice(
        product.priceRange.min.withTax,
        product.priceRange.min.currencyCode,
      )}`
    : undefined,
});
