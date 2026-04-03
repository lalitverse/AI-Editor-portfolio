import React, { useEffect, useRef } from 'react';
import Home from '../pages/Home';
import ShopPreview from './ShopPreview';
import AboutPreview from './AboutPreview';
import './MainScroller.css';

const MainScroller = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.focus();
    }

    // Set up intersection observer for precise navbar highlighting
    const observerOptions = {
      root: scrollerRef.current,
      rootMargin: '0px',
      threshold: 0.35, // Less strict so section highlighting feels responsive
    };

    const blockObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Broadcast which section is completely visible
          window.dispatchEvent(new CustomEvent('sectionChange', { detail: entry.target.id }));
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.snap-section');
    sections.forEach((sec) => blockObserver.observe(sec));

    return () => {
      sections.forEach((sec) => blockObserver.unobserve(sec));
    };
  }, []);

  return (
    <div className="main-scroller-container" ref={scrollerRef} tabIndex={0}>
      <section className="snap-section" id="home">
        <Home />
      </section>
      
      <section className="snap-section" id="shop">
        <div className="snap-content-wrapper">
          <ShopPreview />
        </div>
      </section>
      
      <section className="snap-section" id="about">
        <div className="snap-content-wrapper">
          <AboutPreview />
        </div>
      </section>
    </div>
  );
};

export default MainScroller;
