import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import SocialIcons from './SocialIcons';

const HeroSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger effect on children items
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 50 }
        }
    };

    return (
        <section id="home" className="home">
            <motion.div 
                className="home-img"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <img 
                    src="/main.jpg" 
                    alt="Lalit Hirvey" 
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                />
                <div className="img-glow"></div>
            </motion.div>
            
            <motion.div 
                className="home-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 variants={itemVariants}>
                    Crafting <span>Digital</span> Excellence
                    <span className="jp-subtitle">デジタルエクセレンスの追求</span>
                </motion.h1>
                
                <motion.h3 variants={itemVariants} className="typing-text" style={{ minHeight: '4.8rem' }}>
                    I'm a <TypeAnimation
                      sequence={[
                        'Web Developer', 1500,
                        'Gamer', 1500,
                        'Athlete', 1500,
                        'Video Editor', 1500,
                        'Japanese Learner', 1500
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      style={{ color: 'var(--main-color)' }}
                    />
                </motion.h3>
                
                <motion.p variants={itemVariants}>
                    I engineer modern, high-performance web applications that seamlessly blend beautiful design with robust architecture. My goal is to build digital experiences that are intuitive, scalable, and impactful.
                </motion.p>
                
                <motion.div variants={itemVariants}>
                    <SocialIcons />
                </motion.div>
                
                <motion.div className="btn-group" variants={itemVariants}>
                    <a href="#contact" className="btn primary-btn">Hire me</a>
                    <a href="#projects" className="btn outline-btn">View Projects</a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
