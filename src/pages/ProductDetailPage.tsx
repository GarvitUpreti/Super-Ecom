import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/apiClient';
import { Product } from '../types';
import { CartContext } from '../context/CartContext';
import { cleanImageUrl } from '../utils/imageHelper';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get<Product>(`/products/${id}`)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        requestAnimationFrame(() => setVisible(true));
      })
      .catch(() => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 1500);
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: 'center', padding: '80px 20px', color: '#6b7280', fontSize: '16px' }}>
        Loading product...
      </p>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#f9fafb' }}>
        <h2 style={{ color: '#374151', marginBottom: '12px' }}>Product not available</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          {error || 'This product could not be found.'}
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: 600,
            backgroundColor: '#3b82f6',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const imageUrl = cleanImageUrl(product.images);
  const showFallback = !imageUrl || imgFailed;

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: '#f9fafb',
        padding: '20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '8px 20px',
          fontSize: '14px',
          fontWeight: 600,
          color: '#3b82f6',
          border: '1px solid #3b82f6',
          borderRadius: '6px',
          textDecoration: 'none',
          marginBottom: '24px',
        }}
        aria-label="Go back to home page"
      >
        ← Back to Home
      </Link>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ flex: '1 1 320px', minWidth: '260px' }}>
          {showFallback ? (
            <div
              style={{
                width: '100%',
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                color: '#9ca3af',
                fontSize: '15px',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '40px' }}>&#128247;</span>
              <span>Image not available</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={product.title}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
              onError={() => setImgFailed(true)}
            />
          )}
        </div>

        <div
          style={{
            flex: '1 1 300px',
            minWidth: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700, color: '#111827' }}>
              {product.title}
            </h1>

            {product.category && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor: '#eff6ff',
                  color: '#3b82f6',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                {product.category.name}
              </span>
            )}

            <p style={{ fontSize: '28px', fontWeight: 800, color: '#059669', margin: '0 0 16px' }}>
              ${product.price}
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#4b5563', margin: '0 0 24px' }}>
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addedFeedback}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 700,
              backgroundColor: addedFeedback ? '#059669' : '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: addedFeedback ? 'default' : 'pointer',
              transition: 'background-color 0.3s ease',
              width: '100%',
            }}
            aria-label={addedFeedback ? 'Added to cart' : 'Add to cart'}
          >
            {addedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
