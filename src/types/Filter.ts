import { AttributesFilterValue, IdenfitierFilterItemWithValues } from '@aboutyou/backbone/endpoints/filters/filters';

export interface FilterValue extends AttributesFilterValue {
  filterCategoryId: number;
}

export interface FilterItem extends IdenfitierFilterItemWithValues {
  id: number;
}