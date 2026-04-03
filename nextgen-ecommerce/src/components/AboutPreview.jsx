import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPreview.css';

const AboutPreview = () => {
  const navigate = useNavigate();

  return (
    <div className="about-preview-container">
      <div className="about-preview-content">
        <div className="preview-text-block">
          <h2>THE <span className="highlight">FUTURE</span> OF HARDWARE</h2>
          <p className="preview-description">
            We bridge the gap between uncompromising computing power and seamless digital experiences. NextGen is engineered for enthusiasts who demand flawless latency and absolute aesthetic perfection.
          </p>
          <button className="btn-explore-about" onClick={() => navigate('/about')}>
            Explore Our Vision
          </button>
        </div>

        <div className="preview-image-block">
          <div className="img-wrap img-primary">
            <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80" alt="Modern Tech Setup" />
            <div className="img-glow"></div>
          </div>
          <div className="img-wrap img-secondary">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" alt="Futuristic Hardware" />
            <div className="img-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPreview;
