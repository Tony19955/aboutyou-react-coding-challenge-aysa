import { useCallback } from 'react';
import { BapiClient } from '@aboutyou/backbone';
import { useAsyncLoader } from './useAsyncLoader';
import { normalizeProduct } from './normalizeProduct';
import { APISortOrder } from '@aboutyou/backbone/endpoints/products/products';
import { AttributeWithValuesFilter } from '@aboutyou/backbone/types/AttributeOrAttributeValueFilter';

const SHOP_ID = 605;
const PORT = process.env.PORT || 9459;
const HOST = `http://127.0.0.1:${PORT}/v1/`;

const bapi = new BapiClient({
  host: HOST,
  shopId: SHOP_ID,
});

export const useProductLoader = (attributes: Array<AttributeWithValuesFilter>) => {

  const products = useAsyncLoader(
    useCallback(() => {
      return bapi.products
        .query({
          where: {
            categoryId: 20236,
            attributes: attributes
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
    }, [attributes])
  );

  return Array.isArray(products) ? products : [];
};