import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { applyImageFallback } from '../utils/imageFallback';
import './ProductDetails.css';

const ANIM_MS = 160;

const ProductDetails = ({ isModal = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const productId = Number(id);
  const product = useMemo(() => products.find((p) => p.id === productId), [productId]);

  const close = () => {
    if (isClosing) return;
    if (!isModal) {
      navigate('/shop');
      return;
    }
    setIsClosing(true);
    window.setTimeout(() => navigate(-1), ANIM_MS);
  };

  useEffect(() => {
    if (!isModal) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModal, isClosing]);

  useEffect(() => {
    if (!isModal) return;
    modalRef.current?.focus?.();
  }, [isModal]);

  if (!product) {
    return (
      <div className={isModal ? 'product-modal-overlay product-modal-open' : ''}>
        <div className={isModal ? 'product-modal-sheet' : 'product-details-notfound'}>
          <h2>Product Not Found</h2>
          <p>The item you’re looking for doesn’t exist (or the link is outdated).</p>
          <button className="btn-primary" onClick={() => (isModal ? close() : navigate('/shop'))}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
  };

  const content = (
    <div className="product-details-card product-modal-card">
      <button className="product-modal-close" onClick={close} aria-label="Close product details">
        <X size={18} />
      </button>
      <div className="product-details-media">
        <img
          className="product-details-image"
          src={product.img}
          alt={product.name}
          loading="lazy"
          onError={applyImageFallback}
        />
      </div>
      <div className="product-details-info">
        <h2 className="product-details-title">{product.name}</h2>
        <div className="product-details-price">${product.price}</div>
        <p className="product-details-description">{product.description}</p>

        <div className="product-details-actions">
          <button className="btn-add-cart" onClick={handleAdd}>
            Add to Cart
          </button>
          <button className="btn-secondary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="product-details-container">{content}</div>;
  }

  return (
    <div
      className={`product-modal-overlay ${isClosing ? 'product-modal-closing' : 'product-modal-open'}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onTouchStart={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="product-modal-sheet" ref={modalRef} tabIndex={-1}>
        {content}
      </div>
    </div>
  );
};

export default ProductDetails;

