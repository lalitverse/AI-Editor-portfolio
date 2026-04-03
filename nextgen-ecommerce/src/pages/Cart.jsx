import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { applyImageFallback } from '../utils/imageFallback';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <ShoppingCart size={64} className="empty-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any gear yet.</p>
        <NavLink to="/shop" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
          Explore Shop
        </NavLink>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">SHOPPING <span className="highlight">CART</span></h2>
      
      <div className="cart-layout">
        <div className="cart-items-section">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="item-image-wrapper">
                <img src={item.img} alt={item.name} loading="lazy" onError={applyImageFallback} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="highlight">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
