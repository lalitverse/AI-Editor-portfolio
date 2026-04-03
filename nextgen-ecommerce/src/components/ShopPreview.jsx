import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { applyImageFallback } from '../utils/imageFallback';
import './ShopPreview.css';

const ShopPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const handleAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    const btn = e.currentTarget;
    const text = btn.innerText;
    btn.innerText = 'Added!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.innerText = text;
      btn.style.background = '';
    }, 1000);
  };

  // Splice arrays exactly for the strict 4x3 layout request
  const topRow = products.slice(0, 4);
  const bottomRow = products.slice(4, 7);

  return (
    <div className="shop-preview-container">
      <div className="preview-header">
        <h2>FEATURED <span className="highlight">GEAR</span></h2>
        <p>A quick glimpse into our elite catalog.</p>
      </div>

      <div className="preview-grid-wrapper">
        <div className="preview-grid-top">
          {topRow.map((product) => (
            <div
              key={product.id}
              className="preview-card"
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: { backgroundLocation: location },
                })
              }
            >
              <div className="preview-img-wrapper">
                <img src={product.img} alt={product.name} loading="lazy" onError={applyImageFallback} />
                <div className="preview-overlay"></div>
              </div>
              <div className="preview-info">
                <h4>{product.name}</h4>
                <p className="preview-price">${product.price}</p>
                <button className="btn-quick-add" onClick={(e) => handleAdd(product, e)}>Add</button>
              </div>
            </div>
          ))}
        </div>

        <div className="preview-grid-bottom">
          {bottomRow.map((product) => (
            <div
              key={product.id}
              className="preview-card"
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: { backgroundLocation: location },
                })
              }
            >
               <div className="preview-img-wrapper">
                <img src={product.img} alt={product.name} loading="lazy" onError={applyImageFallback} />
                <div className="preview-overlay"></div>
              </div>
              <div className="preview-info">
                <h4>{product.name}</h4>
                <p className="preview-price">${product.price}</p>
                <button className="btn-quick-add" onClick={(e) => handleAdd(product, e)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="explore-action">
        <button className="btn-explore" onClick={() => navigate('/shop')}>
          Explore Full Catalog
        </button>
      </div>
    </div>
  );
};

export default ShopPreview;
