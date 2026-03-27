import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

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

    return (
        <header className={scrolled ? 'nav-scrolled' : ''}>
            <a href="#home" className="logo">
                <span className="logo-jp">ラリット</span>
                <span>Lalit</span>
            </a>

            <nav>
                <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
                <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
                <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
                <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
                <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a>
                <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
            </nav>
        </header>
    );
};

export default Navbar;
