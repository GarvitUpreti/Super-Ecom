import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { CartItem, CartAction, Product } from '../types';

const CART_KEY = 'super_ecom_cart';

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalItems: number;
  totalPrice: number;
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = state.findIndex((i) => i.product.id === action.product.id);
      if (idx >= 0) {
        const updated = [...state];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((i) => i.product.id !== action.productId);
    case 'LOAD':
      return action.items;
    default:
      return state;
  }
}

export const CartContext = createContext<CartContextValue>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        dispatch({ type: 'LOAD', items: JSON.parse(raw) });
      }
    } catch {
      // ignore corrupt data
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable
    }
  }, [items]);

  const addToCart = useCallback(
    (product: Product) => dispatch({ type: 'ADD_ITEM', product }),
    []
  );

  const removeFromCart = useCallback(
    (productId: number) => dispatch({ type: 'REMOVE_ITEM', productId }),
    []
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
