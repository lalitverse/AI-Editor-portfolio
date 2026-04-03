/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { normalizeCartProduct } from './cartUtils';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load from local storage on initial mount
    const savedCart = localStorage.getItem('nextgen-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('nextgen-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    const normalized = normalizeCartProduct(product);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === normalized.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === normalized.id
            ? { ...item, ...normalized, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { ...normalized, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
