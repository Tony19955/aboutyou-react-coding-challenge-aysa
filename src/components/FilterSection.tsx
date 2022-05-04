import React from 'react';
import styled from 'styled-components';
import { FILTER_COLORS } from '../constants';

interface CheckboxProps {
  backgroundColor: string;
  border: string;
}

interface LabelProps {
  color: string;
}

const FilterSection = ({
  filter, selectedFilters, removeFilter, selectFilter, clearFilters
}) => {
  return (
    <FilterWrapper data-testid="FilterSection">
      <FilterHeader>
        <FilterName>{filter.name}</FilterName>
        <FilterClearButton
          onClick={() => clearFilters()}
        >
          Zurücksetzen
        </FilterClearButton>
      </FilterHeader>
      <FilterContainer>
        {filter.values.map(item => {
          const isSelected = selectedFilters.find(filter => filter.id === item.id);
          return (
            <FilterItem
              key={item.id}
              onClick={() => isSelected 
                ? removeFilter({ ...item, filterCategoryId: filter.id }) 
                : selectFilter({ ...item, filterCategoryId: filter.id })
              }
            >
              <CheckboxContainer
                backgroundColor={FILTER_COLORS[item.value] || (filter.name === 'Muster' && isSelected) && '#000' || "#fff"}
                border={item.value === 'weiss' || filter.name === 'Muster' ? '2px solid #9b9b9b' : null}
              />
              <Label
                color={isSelected ? '#000' : '#a3a3a3'}
              >
                {item.name}
              </Label>
            </FilterItem>
          );
        })}
      </FilterContainer>
    </FilterWrapper>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const FilterWrapper = styled.div`
  padding: 30px 20px;
  background: #fff;

  &:last-child {
    margin-top: 10px
  }
`;

const FilterHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`;

const FilterName = styled.div`
  color: #000;
  font-size: 15px;
  font-weight: 900;
`;

const FilterClearButton = styled.button`
  cursor: pointer;
  color: #a3a3a3;
  font-size: 14px;
  font-weight: 700;
  outline: none;
  background: none;
  border: none;
  &:hover {
    color: #000;
  }
`;

const FilterContainer = styled(FlexContainer)`
  margin: 15px 10px 0px 10px;
`;

const FilterItem = styled.button`
  border: 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 15px;
  width: calc(100% / 2);
  background-color: #fff;
  &:focus {
    outline: 0;
`;

const CheckboxContainer = styled(FlexContainer)<CheckboxProps>`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  box-sizing: border-box;
  justify-content: center;
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Label = styled.label<LabelProps>`
  flex: 1;
  cursor: pointer;
  font-size: 13px;
  margin-left: 5px;
  text-align: left;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export default FilterSection;