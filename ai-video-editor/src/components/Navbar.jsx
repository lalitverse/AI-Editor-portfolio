import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import MagneticWrapper from './MagneticWrapper';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <a href="#home" className="hover:opacity-80 transition-opacity">
          <Logo size="md" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          <li><a href="#projects" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Projects</a></li>
          <li><a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">About</a></li>
          <li><a href="#process" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Process</a></li>
          <li><a href="#contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</a></li>
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <MagneticWrapper>
            <a href="#contact" className="glass-button">Let's Talk</a>
          </MagneticWrapper>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-white/10 px-6 py-4 flex flex-col gap-4">
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">Projects</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">About</a>
          <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">Process</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
