import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { applyImageFallback } from '../utils/imageFallback';
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const handleAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Optional: add a quick animation to the button
    const btn = e.currentTarget;
    const text = btn.innerText;
    btn.innerText = 'Added!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.innerText = text;
      btn.style.background = '';
    }, 1000);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>OUR <span className="highlight">PRODUCTS</span></h2>
        <p>Cutting-edge hardware ready to deploy.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() =>
              navigate(`/product/${product.id}`, {
                state: { backgroundLocation: location },
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <div className="product-image-container">
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
                loading="lazy"
                onError={applyImageFallback}
              />
              <div className="product-overlay"></div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <button 
                  className="btn-add-cart"
                  onClick={(e) => handleAdd(product, e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
