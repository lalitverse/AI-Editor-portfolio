import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import warMovie from '../assets/war_movie_scene.png';
import cyberpunkCity from '../assets/cyberpunk_city.png';
import alienFlora from '../assets/alien_flora.png';
import neonDrift from '../assets/neon_drift.png';
import crystalCave from '../assets/crystal_cave.png';
import cyberpunkAndroid from '../assets/cyberpunk_android.png';
import monolithicCity from '../assets/monolithic_city.png';
import biomechanicalEye from '../assets/biomechanical_eye.png';

const Carousel3D = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  
  const rotationAngle = useRef(0);
  const velocity = useRef(-0.15); // Base auto-rotation speed
  const isDragging = useRef(false);
  
  // 8 Completely unique locally-generated guaranteed-to-load cinematic masterpieces
  const images = [
    warMovie,
    cyberpunkCity,
    alienFlora,
    neonDrift,
    crystalCave,
    cyberpunkAndroid,
    monolithicCity,
    biomechanicalEye
  ];

  const theta = 360 / images.length;

  const radiusDesktop = Math.round((280 + 40) / (2 * Math.tan(Math.PI / images.length)));
  const radiusMobile = Math.round((180 + 20) / (2 * Math.tan(Math.PI / images.length)));
  const dynamicTranslateZ = `clamp(${radiusMobile}px, 60vw, ${radiusDesktop}px)`;

  // High-performance 60fps continuous animation engine with Momentum Decay Physics
  useEffect(() => {
    let animationFrameId;
    
    const loop = () => {
      if (!selectedImage) {
        const BASE_SPEED = -0.15; // Slow, cinematic right-to-left sweep
        const FRICTION = 0.04;    // How fast swipe-momentum decays back to base speed

        if (!isDragging.current) {
          // Decay momentum towards the base speed continuously
          if (velocity.current < BASE_SPEED - FRICTION) {
            velocity.current += FRICTION;
          } else if (velocity.current > BASE_SPEED + FRICTION) {
            velocity.current -= FRICTION;
          } else {
            // Snap firmly to base speed to prevent mathematical jitter
            velocity.current = BASE_SPEED;
          }
        }

        rotationAngle.current += velocity.current;
        setRotation(rotationAngle.current);
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedImage]);

  // Handle Lightbox Esc key interaction and Scroll lock
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  // Pan Gestures mapped to 3D Rotation Physics
  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (e, info) => {
    if (selectedImage) return;
    // Map horizontal drag distance directly to instant velocity update
    velocity.current = info.delta.x * 0.4;
  };

  const handlePanEnd = (e, info) => {
    isDragging.current = false;
    // Intercept hardware release momentum and transfer it to our physics loop
    velocity.current = info.velocity.x * 0.005;
  };

  return (
    <>
      <section className="py-24 md:py-32 px-6 w-full max-w-[100vw] overflow-hidden relative z-10 flex flex-col items-center" id="gallery">
        <div className="text-center mb-20 md:mb-24 relative z-30 pointer-events-none">
          <span className="badge">CINEMATIC 3D SLIDER</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Archives</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Drag to explore the rotating timeline. Click on any artwork to seamlessly enlarge. Immerse yourself in the gallery.
          </p>
        </div>

        {/* 3D Canvas */}
        <div 
          className="relative h-[400px] md:h-[550px] w-full flex items-center justify-center pointer-events-auto touch-none"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            style={{ 
              rotateY: rotation,
              transformStyle: 'preserve-3d'
            }}
            className="relative w-[180px] h-[250px] md:w-[280px] md:h-[380px] cursor-grab active:cursor-grabbing z-20"
          >
            {images.map((img, idx) => {
              return (
                <div
                  key={idx}
                  className="absolute inset-0 w-full h-full rounded-3xl glass-card p-2 border border-white/10 shadow-[0_0_30px_rgba(96,165,250,0.1)]"
                  style={{
                    transform: `rotateY(${idx * theta}deg) translateZ(${dynamicTranslateZ})`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'visible',
                    WebkitBackfaceVisibility: 'visible'
                  }}
                >
                  <motion.div 
                    layoutId={`carousel-img-${idx}`}
                    onClick={() => {
                      // Prevent accidental clicks when performing a hard swipe
                      if (Math.abs(velocity.current) < 1) {
                        setSelectedImage({ src: img, idx });
                      }
                    }}
                    className="w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer"
                  >
                    <img 
                      src={img} 
                      alt={`Slide ${idx}`} 
                      className="w-full h-full object-cover select-none" 
                      draggable="false"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal strictly controlled by state and isolated entirely from the 3D planes */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-lg cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50 cursor-pointer border border-transparent hover:border-white/10 shadow-xl bg-black/30 backdrop-blur-xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>
            
            <motion.div 
              layoutId={`carousel-img-${selectedImage.idx}`}
              className="relative w-full max-w-3xl lg:max-w-4xl max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl origin-center flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt="Enlarged Carousel Artwork"
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain bg-transparent relative z-10 pointer-events-none rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Carousel3D;
