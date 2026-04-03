import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Carousel3D from './components/Carousel3D';
import Contact from './components/Contact';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`relative ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
      <main>
        <Hero />
        <Projects />
        <Carousel3D />
        <About />
        <Contact />
      </main>
    </div>
    </>
  );
}

export default App;
