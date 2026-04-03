/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const STORAGE_PROFILE_KEY = 'nextgen-profile';
const STORAGE_ORDERS_KEY = 'nextgen-orders';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[\d\s().-]{7,}$/;

const QR_DEMO_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='640'%3E%3Crect width='100%25' height='100%25' fill='%230b0b0b'/%3E%3Crect x='24' y='24' width='592' height='592' rx='28' fill='none' stroke='%23b74b4b' stroke-opacity='0.85' stroke-width='10'/%3E%3Cg fill='%23ffffff'%3E%3Crect x='70' y='70' width='140' height='140'/%3E%3Crect x='430' y='70' width='140' height='140'/%3E%3Crect x='70' y='430' width='140' height='140'/%3E%3Crect x='106' y='106' width='68' height='68' fill='%230b0b0b'/%3E%3Crect x='466' y='106' width='68' height='68' fill='%230b0b0b'/%3E%3Crect x='106' y='466' width='68' height='68' fill='%230b0b0b'/%3E%3Crect x='270' y='110' width='34' height='34'/%3E%3Crect x='320' y='160' width='34' height='34'/%3E%3Crect x='270' y='210' width='34' height='34'/%3E%3Crect x='320' y='260' width='34' height='34'/%3E%3Crect x='370' y='310' width='34' height='34'/%3E%3Crect x='270' y='310' width='34' height='34'/%3E%3Crect x='320' y='360' width='34' height='34'/%3E%3Crect x='370' y='410' width='34' height='34'/%3E%3Crect x='270' y='410' width='34' height='34'/%3E%3Crect x='320' y='460' width='34' height='34'/%3E%3Crect x='370' y='510' width='34' height='34'/%3E%3Crect x='270' y='510' width='34' height='34'/%3E%3C/g%3E%3Ctext x='50%25' y='94%25' text-anchor='middle' fill='%23b74b4b' font-family='Arial, sans-serif' font-size='22'%3EDEMO UPI QR%3C/text%3E%3C/svg%3E";

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function generateOrderId() {
  const a = Date.now().toString(36).toUpperCase();
  const b = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NG-${a}-${b}`;
}

function validate(values) {
  const errors = {};
  const requiredFields = [
    'fullName',
    'email',
    'phone',
    'address',
    'city',
    'state',
    'zip',
  ];

  requiredFields.forEach((k) => {
    if (!values[k]?.trim()) errors[k] = 'Required';
  });

  if (values.email && !emailRegex.test(values.email)) errors.email = 'Invalid email';
  if (values.phone && !phoneRegex.test(values.phone)) errors.phone = 'Invalid phone';
  if (values.zip && values.zip.trim().length < 4) errors.zip = 'Invalid zip';

  return errors;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const savedProfile = useMemo(
    () => safeJsonParse(localStorage.getItem(STORAGE_PROFILE_KEY), null),
    []
  );

  const [values, setValues] = useState(() => ({
    fullName: savedProfile?.name || '',
    email: savedProfile?.email || '',
    phone: savedProfile?.phone || '',
    address: savedProfile?.address || '',
    city: savedProfile?.city || '',
    state: savedProfile?.state || '',
    zip: savedProfile?.zip || '',
  }));

  const [touched, setTouched] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPlacing, setIsPlacing] = useState(false);
  const [qrSecondsLeft, setQrSecondsLeft] = useState(0);

  const errors = useMemo(() => validate(values), [values]);
  const canPlace = cart.length > 0 && Object.keys(errors).length === 0 && !isPlacing;

  const onChange = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const onBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const placeOrder = () => {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      zip: true,
    });

    const currentErrors = validate(values);
    if (Object.keys(currentErrors).length > 0 || cart.length === 0) return;

    setIsPlacing(true);

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: { ...values },
      paymentMethod,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        price: i.price,
        quantity: i.quantity,
      })),
      total: Number(totalPrice.toFixed(2)),
      statusIndex: 1, // Order Placed
    };

    const existing = safeJsonParse(localStorage.getItem(STORAGE_ORDERS_KEY), []);
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify([order, ...existing]));

    clearCart();
    navigate(`/order/${orderId}`, { state: { order } });
  };

  useEffect(() => {
    if (paymentMethod !== 'qr') {
      setQrSecondsLeft(0);
      return;
    }
    // 4 minute demo payment session
    setQrSecondsLeft(4 * 60);
  }, [paymentMethod]);

  useEffect(() => {
    if (paymentMethod !== 'qr') return;
    if (qrSecondsLeft <= 0) return;
    const t = window.setTimeout(() => setQrSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [paymentMethod, qrSecondsLeft]);

  const openPayment = (method) => {
    setPaymentMethod(method);
  };

  const formatCountdown = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const confirmQrPaid = () => {
    placeOrder();
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Checkout</h2>
        <p>Your cart is empty. Add items before checking out.</p>
        <button className="btn-primary" onClick={() => navigate('/shop')}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">
        CHECKOUT <span className="highlight">SECURE</span>
      </h2>

      <div className="checkout-grid">
        <div className="checkout-panel">
          <h3>User Information</h3>
          <p className="checkout-subtitle">Enter shipping details to place your order.</p>

          <div className="checkout-form">
            <div className="checkout-row">
              <div className="checkout-field">
                <label>Full Name</label>
                <input
                  value={values.fullName}
                  onChange={onChange('fullName')}
                  onBlur={onBlur('fullName')}
                  placeholder="Your full name"
                />
                {touched.fullName && errors.fullName && (
                  <div className="field-error">{errors.fullName}</div>
                )}
              </div>
              <div className="checkout-field">
                <label>Email Address</label>
                <input
                  value={values.email}
                  onChange={onChange('email')}
                  onBlur={onBlur('email')}
                  placeholder="name@example.com"
                />
                {touched.email && errors.email && <div className="field-error">{errors.email}</div>}
              </div>
            </div>

            <div className="checkout-row">
              <div className="checkout-field">
                <label>Phone Number</label>
                <input
                  value={values.phone}
                  onChange={onChange('phone')}
                  onBlur={onBlur('phone')}
                  placeholder="+1 555 123 4567"
                />
                {touched.phone && errors.phone && <div className="field-error">{errors.phone}</div>}
              </div>
              <div className="checkout-field">
                <label>Shipping Address</label>
                <input
                  value={values.address}
                  onChange={onChange('address')}
                  onBlur={onBlur('address')}
                  placeholder="Street, apt, suite"
                />
                {touched.address && errors.address && (
                  <div className="field-error">{errors.address}</div>
                )}
              </div>
            </div>

            <div className="checkout-row">
              <div className="checkout-field">
                <label>City</label>
                <input
                  value={values.city}
                  onChange={onChange('city')}
                  onBlur={onBlur('city')}
                  placeholder="City"
                />
                {touched.city && errors.city && <div className="field-error">{errors.city}</div>}
              </div>
              <div className="checkout-field">
                <label>State</label>
                <input
                  value={values.state}
                  onChange={onChange('state')}
                  onBlur={onBlur('state')}
                  placeholder="State"
                />
                {touched.state && errors.state && <div className="field-error">{errors.state}</div>}
              </div>
              <div className="checkout-field">
                <label>Zip Code</label>
                <input
                  value={values.zip}
                  onChange={onChange('zip')}
                  onBlur={onBlur('zip')}
                  placeholder="Zip"
                />
                {touched.zip && errors.zip && <div className="field-error">{errors.zip}</div>}
              </div>
            </div>
          </div>

          <div className="checkout-payment">
            <h3>Payment (UI only)</h3>
            <div className="payment-options">
              <button
                type="button"
                className={paymentMethod === 'cod' ? 'payment-option active' : 'payment-option'}
                onClick={() => openPayment('cod')}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                className={paymentMethod === 'card' ? 'payment-option active' : 'payment-option'}
                onClick={() => openPayment('card')}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                className={paymentMethod === 'qr' ? 'payment-option active' : 'payment-option'}
                onClick={() => openPayment('qr')}
              >
                Pay Instantly (QR Code)
              </button>
            </div>
            <div className="payment-selected">
              Selected:{' '}
              <span className="highlight">
                {paymentMethod === 'cod'
                  ? 'Cash on Delivery'
                  : paymentMethod === 'card'
                    ? 'Card'
                    : 'UPI / QR Payment'}
              </span>
            </div>

            {paymentMethod === 'qr' && (
              <div className="qr-panel">
                <div className="qr-title">Scan & Pay</div>
                <div className="qr-subtitle">Scan this QR code to complete payment</div>
                <div className="qr-box">
                  <img className="qr-image" src={QR_DEMO_IMAGE} alt="Demo QR code" />
                </div>
                <div className="qr-meta">
                  <span className="qr-timer-label">Session:</span>{' '}
                  <span className={qrSecondsLeft > 20 ? 'highlight' : 'qr-timer-warn'}>
                    {qrSecondsLeft > 0 ? formatCountdown(qrSecondsLeft) : 'Expired'}
                  </span>
                </div>
                <div className="qr-actions">
                  <button
                    type="button"
                    className="btn-place-order"
                    onClick={confirmQrPaid}
                    disabled={!canPlace || qrSecondsLeft <= 0}
                  >
                    I Have Paid
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => openPayment('cod')}>
                    Cancel Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-left">
                  <div className="summary-name">{item.name}</div>
                  <div className="summary-meta">
                    Qty <span className="highlight">{item.quantity}</span>
                  </div>
                </div>
                <div className="summary-item-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <div className="summary-total-row">
              <span>Total</span>
              <span className="highlight">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn-place-order"
            onClick={placeOrder}
            disabled={!canPlace}
          >
            {isPlacing ? 'Placing Order…' : 'Place Order'}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/cart')}>
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

