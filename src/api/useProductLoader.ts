import { useCallback } from 'react';
import { BapiClient } from '@aboutyou/backbone';
import { APISortOrder } from '@aboutyou/backbone/endpoints/products/products';
import { useAsyncLoader } from './useAsyncLoader';
import { normalizeProduct } from './normalizeProduct';

const SHOP_ID = 605;
const PORT = process.env.PORT || 9459;
const HOST = `http://0.0.0.0:${PORT}/v1/`;

export const useProductLoader = () => {
  const bapi = new BapiClient({
    host: HOST,
    shopId: SHOP_ID,
  });

  const products = useAsyncLoader(
    useCallback(() => {
      return bapi.products
        .query({
          where: {
            categoryId: 20236,
          },
          pagination: {
            page: 1,
            perPage: 50,
          },
          sort: {
            channel: 'web_default',
            direction: APISortOrder.Descending,
            score: 'category_scores',
          },
          with: {
            attributes: {
              withKey: ['brand'],
            },
            priceRange: true,
          },
        })
        .then((data) => data.entities.map(normalizeProduct));
    }, []),
  );

  return Array.isArray(products) ? products : [];
};
