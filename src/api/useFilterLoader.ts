import { useCallback } from 'react';
import { useAsyncLoader } from './useAsyncLoader';
import { BapiClient } from '@aboutyou/backbone';
import { FilterItem } from '../types/Filter';

const SHOP_ID = 605;
const PORT = process.env.PORT || 9459;
const HOST = `http://127.0.0.1:${PORT}/v1/`;

const bapi = new BapiClient({
  host: HOST,
  shopId: SHOP_ID,
});

const useFilterLoader = (filterIds: number[]) => {
  let filters = useAsyncLoader(
    useCallback(() => {
      return bapi.filters
        .get({
          where: {
            categoryId: 20236
          },
          with: ['values']
        })
        .then((data) => data)
    }, [])
  ); 

  const filtersArray = Array.isArray(filters) ? filters : [];
  return (filtersArray && filterIds.length) ? filtersArray.filter((item: FilterItem) => filterIds.includes(item.id)) : filtersArray;
};

export default useFilterLoader;