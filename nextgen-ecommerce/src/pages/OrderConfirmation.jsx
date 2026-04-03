import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Package, Truck, MapPin, BadgeCheck } from 'lucide-react';
import './OrderConfirmation.css';

const STORAGE_ORDERS_KEY = 'nextgen-orders';
const STEPS = [
  { key: 'placed', label: 'Order Placed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'out', label: 'Out for Delivery', icon: MapPin },
  { key: 'delivered', label: 'Delivered', icon: BadgeCheck },
];

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();

  const order = useMemo(() => {
    const fromState = location.state?.order;
    if (fromState?.id) return fromState;
    const all = safeJsonParse(localStorage.getItem(STORAGE_ORDERS_KEY), []);
    return all.find((o) => o.id === orderId) || null;
  }, [location.state, orderId]);

  if (!order) {
    return (
      <div className="order-empty">
        <h2>Order Not Found</h2>
        <p>We couldn’t find that order. If you just placed it, try going to Profile → Order History.</p>
        <button className="btn-primary" onClick={() => navigate('/profile')}>
          Go to Profile
        </button>
      </div>
    );
  }

  const currentIndex = Math.max(1, Math.min(5, Number(order.statusIndex || 1)));

  return (
    <div className="order-container">
      <div className="order-header">
        <h2>
          ORDER <span className="highlight">CONFIRMED</span>
        </h2>
        <p className="order-subtitle">
          Order ID: <span className="highlight">{order.id}</span>
        </p>
      </div>

      <div className="order-grid">
        <div className="order-card">
          <h3>Tracking</h3>
          <div className="order-steps">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const stepIndex = idx + 1;
              const isDone = stepIndex <= currentIndex;
              return (
                <div key={s.key} className={isDone ? 'order-step done' : 'order-step'}>
                  <div className="step-dot">
                    <Icon size={18} />
                  </div>
                  <div className="step-label">{s.label}</div>
                </div>
              );
            })}
          </div>
          <div className="order-progress">
            <div
              className="order-progress-bar"
              style={{ width: `${((currentIndex - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          <p className="order-hint">
            This is a UI simulation. Status updates are mock for a premium experience.
          </p>
        </div>

        <div className="order-card">
          <h3>Order Summary</h3>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-left">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-meta">
                    Qty <span className="highlight">{item.quantity}</span>
                  </div>
                </div>
                <div className="order-item-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <div className="order-total-row">
              <span>Total</span>
              <span className="highlight">${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
          <div className="order-actions">
            <button className="btn-primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
            <button className="btn-secondary" onClick={() => navigate('/profile')}>
              View in Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

