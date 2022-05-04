import React, { useState } from 'react';
import styled from 'styled-components';
import FilterSection from './FilterSection';

import useFilterLoader from '../api/useFilterLoader';
import { FilterItem, FilterValue } from '../types/Filter';

const ProductFilter = ({ setAttributes }) => {
  
  const [selectedFilters, setFilter] = useState<FilterValue[]>([]);
  const filters = useFilterLoader([1, 317]);

  const selectFilter = (currentFilter: FilterValue): void => {
    setFilter(prevState => [...prevState, currentFilter]);
    setAttributes(prevState => {
      if (!prevState) {
        return [{ id: currentFilter.filterCategoryId, type: 'attributes', values: [currentFilter.id]}]
      } else if (prevState.some(attribute => attribute.id === currentFilter.filterCategoryId)) {
        return prevState.map(attribute => {
          if (attribute.id === currentFilter.filterCategoryId) {
            return {
              ...attribute,
              values: [...attribute.values, currentFilter.id]
            }
          }

          return attribute;
        })
      }
      return [...prevState, { id: currentFilter.filterCategoryId, type: 'attributes', values: [currentFilter.id]}];
    });
  };

  const removeFilter = (currentFilter: FilterValue): void => {
    const newSelectedFilters = selectedFilters.filter(filter => filter.id !== currentFilter.id);
    setFilter(newSelectedFilters);
    
    setAttributes(prevState => {
      const newAttributes = prevState.map(filter => {
        if (filter.id === currentFilter.filterCategoryId) {
          const newAttributes = filter.values.filter(value => value !== currentFilter.id);
          if (!newAttributes.length) return null;
          if (newAttributes.length) {
            return {
              ...filter,
              values: newAttributes
            };
          }
        }
        return filter;
      });
      return newAttributes.filter(newAttribute => !!newAttribute);
    });
  }

  const clearFilters = (): void => {
    setFilter([]);
    setAttributes(null);
  }


  return (
    <Wrapper>
      {filters.map((filter: FilterItem): JSX.Element => {
        return (
          <FilterSection
            key={filter.id}
            filter={filter}
            clearFilters={clearFilters}
            removeFilter={removeFilter}
            selectFilter={selectFilter}
            selectedFilters={selectedFilters}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 20%;
  height: 100%;
  margin-top: 10px;
  margin-right: 20px;
  background-color: #ecececec;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`;

export default ProductFilter;