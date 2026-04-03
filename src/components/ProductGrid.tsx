import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', fontSize: '16px', padding: '40px 20px' }}>
        No products found.
      </p>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{ flex: '1 1 260px', maxWidth: '300px', minWidth: '240px' }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
