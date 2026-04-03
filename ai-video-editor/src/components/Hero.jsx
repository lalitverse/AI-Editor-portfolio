import React from 'react';
import { motion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 text-center z-10" id="home">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="badge">PREMIUM AI VISUALS</span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight text-white">
          CINEMATIC<br />
          <span className="gradient-text">DIGITAL WORLDS</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Exploring the intersection of artificial intelligence and cinematic visual storytelling. Delivering high-impact digital experiences.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticWrapper>
            <a href="#projects" className="solid-button text-base px-8 py-4">View Portfolio</a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="#contact" className="glass-button text-base px-8 py-4">Contact Me</a>
          </MagneticWrapper>
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;
