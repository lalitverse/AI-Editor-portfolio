import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>ABOUT <span className="highlight">OUR PLATFORM</span></h1>
        <p>Defining the future of high-performance technical commerce.</p>
      </div>
      
      <div className="about-grid">
        <div className="about-card">
          <h3>The Vision</h3>
          <p>We created NextGen to bridge the gap between premium hardware and seamless digital experiences. Our platform empowers creators, gamers, and professionals to seamlessly source the exact computational power they require, ensuring you never compromise on frame rates, render speeds, or aesthetic design.</p>
        </div>
        
        <div className="about-card">
          <h3>Uncompromising Quality</h3>
          <p>Every product physically curated and mathematically benchmarked. From 4K refresh rate displays to mechanical precision switches, what you buy is what performs. We test every component to ensure unparalleled latency reduction and thermal efficiency matching the most rigorous esports demands.</p>
        </div>
        
        <div className="about-card">
          <h3>Modern Architecture</h3>
          <p>Built exclusively on robust full-stack technologies. Enjoy persisted micro-state shopping carts via optimized local storage caching, instant UI navigation through isolated React routing, and mathematically calculated glassmorphic rendering elements that ensure your browsing experience is as premium as the hardware you buy.</p>
        </div>

        <div className="about-card">
          <h3>Mathematical Precision</h3>
          <p>No guesswork. Our engineers calibrate every specification down to the nanometer. We utilize heavy backend analytics to track voltage scaling and clock speeds, ensuring the silicon you receive actually boosts to its mathematically optimal limit under load.</p>
        </div>

        <div className="about-card">
          <h3>Seamless Ecosystem</h3>
          <p>We prioritize your workflow. Add items to your cart dynamically without waiting for page loads, build your wishlist through our simulated profile dashboard, and proceed to checkout confidently. It's e-commerce reimagined tailored specifically to the speed of modern hardware enthusiasts.</p>
        </div>

        <div className="about-card">
          <h3>Global Fulfillment</h3>
          <p>Power knows no borders. We have secured high-speed logistic pipelines guaranteeing that your critical hardware upgrades arrive securely packaged and rigorously intact, whether you are deploying a render farm in Europe or building a tournament rig in Asia.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
