import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { cleanImageUrl } from '../utils/imageHelper';

interface Props {
  product: Product;
}

const noImageStyle: React.CSSProperties = {
  width: '100%',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: '#f3f4f6',
  color: '#9ca3af',
  fontSize: '13px',
  gap: '6px',
};

function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = cleanImageUrl(product.images);
  const showFallback = !imageUrl || imgFailed;

  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View details for ${product.title}`}
    >
      {showFallback ? (
        <div style={noImageStyle}>
          <span style={{ fontSize: '28px' }}>&#128247;</span>
          <span>Image not available</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={product.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          onError={() => setImgFailed(true)}
        />
      )}
      <div style={{ padding: '16px' }}>
        <h3
          style={{
            margin: '0 0 8px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#1a1a1a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.title}
        </h3>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#2d8f2d' }}>
          ${product.price}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
