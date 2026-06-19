import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Highlight active section
            const sections = document.querySelectorAll('section');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id') || 'home';
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={scrolled ? 'nav-scrolled' : ''}>
            <a href="#home" className="logo">
                <span className="logo-jp">ラリット</span>
                <span>Lalit</span>
            </a>

            <div className="mobile-menu-btn" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1000, color: 'white' }}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            <nav className={menuOpen ? 'nav-open' : ''}>
                <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</a>
                <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</a>
                <a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Skills</a>
                <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Projects</a>
                <a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Experience</a>
                <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Contact</a>
            </nav>
        </header>
    );
};

export default Navbar;
