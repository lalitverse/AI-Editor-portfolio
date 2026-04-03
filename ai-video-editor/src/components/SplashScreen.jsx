import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const SplashScreen = ({ onComplete }) => {
  // Configured to wait 2 seconds smoothly before unmounting automatically
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] pointer-events-none"
      initial={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ 
        opacity: 0, 
        filter: 'blur(30px)', 
        transition: { duration: 0.9, ease: "easeInOut" } 
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Massive Pulsing Neon Glow Blob positioned directly behind the exact center */}
        <motion.div 
          className="absolute w-[250px] h-[100px] blur-[50px] rounded-full"
          animate={{ 
            background: [
              "radial-gradient(circle, rgba(96,165,250,0) 0%, rgba(96,165,250,0) 100%)",
              "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(96,165,250,0.3) 100%)",
              "radial-gradient(circle, rgba(96,165,250,0) 0%, rgba(96,165,250,0) 100%)"
            ],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* High-Tech Logo Container wrapping the actual SVG Logo component */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(15px)', y: 15 }}
          animate={{ 
            opacity: [0, 1, 0.9, 1], 
            scale: [0.85, 1, 1.02, 1], 
            filter: ['blur(15px)', 'blur(0px)', 'blur(3px)', 'blur(0px)'],
            y: 0
          }}
          transition={{ 
            duration: 1.8, 
            ease: "easeOut",
            times: [0, 0.4, 0.5, 1]  // Generates physical glitch jump parameters
          }}
        >
          {/* Explicitly passing the "lg" sizing prop to render the absolute massive version centered on screen */}
          <Logo size="lg" />
        </motion.div>
      </div>

      {/* Array of floating technological background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 2 + 'px',
              height: Math.random() * 3 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: Math.random() > 0.5 ? '#60A5FA' : '#A855F7',
              boxShadow: '0 0 10px currentColor'
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, Math.random() * 0.6 + 0.2, 0],
              scale: [1, Math.random() + 1, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SplashScreen;
