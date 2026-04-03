import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { cleanImageUrl } from '../utils/imageHelper';

function CartPage() {
  const { items, removeFromCart, totalItems, totalPrice } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#f9fafb', minHeight: '80vh' }}>
        <h2 style={{ color: '#374151', marginBottom: '12px' }}>Your cart is empty</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Browse products and add something you like!
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
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
          Shopping Cart
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item) => {
            const imageUrl = cleanImageUrl(item.product.images);
            return (
              <article
                key={item.product.id}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.product.title}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '12px',
                    }}
                  >
                    No img
                  </div>
                )}

                <div style={{ flex: 1, minWidth: '150px' }}>
                  <Link
                    to={`/product/${item.product.id}`}
                    style={{ textDecoration: 'none', color: '#111827', fontWeight: 600, fontSize: '15px' }}
                  >
                    {item.product.title}
                  </Link>
                  <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '13px' }}>
                    Qty: {item.quantity} &middot; ${item.product.price} each
                  </p>
                </div>

                <p style={{ fontWeight: 700, fontSize: '16px', color: '#059669', margin: 0, minWidth: '70px' }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  aria-label={`Remove ${item.product.title} from cart`}
                >
                  Remove
                </button>
              </article>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '32px',
            padding: '20px 24px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '16px', color: '#374151' }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
          </span>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>
            Total: ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
