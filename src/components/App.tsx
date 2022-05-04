import React, { useState } from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import ProductStream from './ProductStream';
import { useProductLoader } from '../api/useProductLoader';
import ProductFilter from './ProductFilter';
import { AttributeWithValuesFilter } from '@aboutyou/backbone/types/AttributeOrAttributeValueFilter';

const App = () => {
  const [attributes, setAttributes] = useState<AttributeWithValuesFilter[]>([]);
  const products = useProductLoader(attributes);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <ProductFilter setAttributes={setAttributes} />
        <ProductStream products={products} />
      </Layout>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Layout = styled.article`
  width: 100%;
  display: flex;
  padding: 0 20px;
  max-width: 100%;
`;

export default App;