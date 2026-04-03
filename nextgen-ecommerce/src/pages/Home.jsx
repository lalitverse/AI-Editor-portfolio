import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            THE FUTURE OF <span className="highlight">GAMING</span>
          </h1>
          <p className="hero-subtitle">
            Next-generation hardware designed to push the boundaries of extreme performance.
          </p>
          <div className="hero-buttons">
            <NavLink to="/shop" className="btn-primary">Shop Now</NavLink>
            <NavLink to="/about" className="btn-secondary">Learn More</NavLink>
          </div>
        </div>
        <div className="hero-image-placeholder">
          <div className="saturn-system">
            <div className="ring-wrapper back-half">
              <RingSystem />
            </div>
            
            <div className="glowing-orb"></div>
            
            <div className="ring-wrapper front-half">
              <RingSystem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted Ring System so both front and back clipping halves run perfectly synced keyframes
const RingSystem = () => (
  <>
    <div className="ring-orbit ring-1">
      <div className="star p1"></div>
      <div className="star p2"></div>
      <div className="star p3"></div>
      <div className="star p4"></div>
    </div>
    <div className="ring-orbit ring-2">
      <div className="star p5"></div>
      <div className="star p6"></div>
      <div className="star p7"></div>
      <div className="star p8"></div>
    </div>
  </>
);

export default Home;
