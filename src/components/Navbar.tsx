import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { totalItems } = useContext(CartContext);

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px',
        backgroundColor: '#1f2937',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px', fontWeight: 800 }}>
        Super Ecom
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#d1d5db',
            fontSize: '15px',
            fontWeight: 500,
          }}
        >
          Home
        </Link>
        <Link
          to="/cart"
          style={{
            textDecoration: 'none',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Cart
          {totalItems > 0 && (
            <span
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'transform 0.3s ease',
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
