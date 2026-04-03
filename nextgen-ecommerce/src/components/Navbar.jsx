import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, Info, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScrollTarget = (e) => {
      // IntersectionObserver actively updates highlights only when freely scrolling the Home Hub
      if (location.pathname === '/') {
        setActiveSection(e.detail);
      }
    };

    window.addEventListener('sectionChange', handleScrollTarget);
    return () => window.removeEventListener('sectionChange', handleScrollTarget);
  }, [location.pathname]);

  // Keep navbar highlight in sync with route changes (no effect-setState needed)
  const routeSection = location.pathname.substring(1) || 'home';
  const normalizedRouteSection = routeSection.startsWith('product/') ? 'shop' : routeSection;
  const currentActive = location.pathname === '/' ? activeSection : normalizedRouteSection;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-text">NEXTGEN<span className="text-red"> E-COM</span></span>
      </div>
      <div className="navbar-links">
        <NavLink 
          to="/" 
          className={currentActive === 'home' ? 'nav-item active' : 'nav-item'}
        >
          <Home className="nav-icon" size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/shop" 
          className={currentActive === 'shop' ? 'nav-item active' : 'nav-item'}
        >
          <ShoppingBag className="nav-icon" size={18} />
          <span>Shop</span>
        </NavLink>
        <NavLink 
          to="/about" 
          className={currentActive === 'about' ? 'nav-item active' : 'nav-item'}
        >
          <Info className="nav-icon" size={18} />
          <span>About</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <User className="nav-icon" size={18} />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <div className="cart-icon-wrapper">
            <ShoppingCart className="nav-icon" size={18} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
          <span>Cart</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
