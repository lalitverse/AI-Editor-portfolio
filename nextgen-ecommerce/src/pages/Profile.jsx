import React, { useEffect, useMemo, useState } from 'react';
import { Settings, Package, Heart, CreditCard, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const STORAGE_PROFILE_KEY = 'nextgen-profile-v2';
const STORAGE_ORDERS_KEY = 'nextgen-orders';

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('settings');
  const [savedToast, setSavedToast] = useState(false);

  const [profile, setProfile] = useState(() => {
    const existing = safeJsonParse(localStorage.getItem(STORAGE_PROFILE_KEY), null);
    return (
      existing || {
        name: '',
        email: '',
        phone: '',
        notifications: true,
        darkMode: true,
      }
    );
  });

  const orders = useMemo(() => safeJsonParse(localStorage.getItem(STORAGE_ORDERS_KEY), []), []);

  useEffect(() => {
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (!savedToast) return;
    const t = window.setTimeout(() => setSavedToast(false), 2000);
    return () => window.clearTimeout(t);
  }, [savedToast]);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedToast(true);
  };

  const handleSignOut = () => {
    // Perform any logout logic here before navigating
    // For now we simulate logout by navigating securely
    navigate('/login', { replace: true });
  };

  return (
    <div className="profile-container">
      {/* Background illumination for glassmorphism */}
      <div className="profile-bg-glow"></div>

      <div className="profile-content-grid">
        <div className="profile-sidebar glass-card">
          <div className="profile-sidebar-header">
            <h3>My Account</h3>
          </div>
          <nav className="profile-nav">
            <button
              className={activeTab === 'settings' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} /> Settings
            </button>
            <button
              className={activeTab === 'orders' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={20} /> Orders
            </button>
            <button
              className={activeTab === 'wishlist' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={20} /> Wishlist
            </button>
            <button
              className={activeTab === 'payments' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard size={20} /> Payments
            </button>
            
            <div className="nav-divider"></div>
            
            <button className="nav-btn logout-btn" onClick={handleSignOut}>
              <LogOut size={20} /> Sign Out
            </button>
          </nav>
        </div>

        <div className="profile-main-area glass-card">
          {savedToast && (
            <div className="profile-toast toast-glass">
              <CheckCircle2 size={18} /> Profile Updated
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="profile-top-section">
                <div className="profile-avatar-wrapper">
                  {/* Blurred Default Human Placeholder */}
                  <img 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="Default Avatar" 
                    className="profile-avatar" 
                  />
                  <div className="avatar-inner-glow"></div>
                </div>
              </div>

              {/* Clean and minimal form - no extra descriptions or static names */}
              <form className="settings-form" onSubmit={handleSave}>
                <div className="form-group-row">
                  <div className="form-group glass-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group glass-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group glass-input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save btn-glass">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h3 className="section-title">Order History</h3>
              {orders.length === 0 ? (
                <div className="profile-empty-state glass-empty">
                  <Package size={40} className="empty-icon" />
                  <p>No orders yet.</p>
                </div>
              ) : (
                <div className="profile-orders">
                  {orders.slice(0, 10).map((o) => (
                    <div key={o.id} className="profile-order-card glass-item">
                      <div className="order-info">
                        <div className="profile-order-title">
                          Order <span className="highlight">{o.id}</span>
                        </div>
                        <div className="profile-order-meta">
                          {new Date(o.createdAt).toLocaleString()} • {o.items.length} items
                        </div>
                      </div>
                      <div className="profile-order-total highlight">${Number(o.total).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="wishlist-section">
              <h3 className="section-title">Wishlist</h3>
              <div className="profile-empty-state glass-empty">
                <Heart size={40} className="empty-icon" />
                <p>Your wishlist is empty.</p>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="payments-section">
              <h3 className="section-title">Payment Methods</h3>
              <div className="profile-empty-state glass-empty">
                <CreditCard size={40} className="empty-icon" />
                <p>No payment methods added.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
