import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="about-section">
            <motion.div 
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
            >
                <h2>About <span>Me</span><span className="jp-text">私について</span></h2>
                <div className="underline"></div>
            </motion.div>

            <div className="about-content">
                <motion.div 
                    className="about-text"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3>Passionate Developer & Innovator</h3>
                    <div className="about-text-highlight">
                        <p>
                            I’m a passionate Web Developer and creative problem-solver who loves building modern, high-performance digital experiences. My focus is on creating clean, scalable, and visually engaging applications that deliver real value.
                        </p>
                        <p>
                            Beyond coding, I constantly explore new technologies, improve my skills, and challenge myself to grow. I believe in combining logic with creativity to turn ideas into impactful products.
                        </p>
                        <p>
                            Currently, I’m also a Japanese language learner, which helps me expand my perspective and connect with global culture.
                        </p>
                    </div>

                    <div className="jlpt-badge">
                        <span className="jlpt-text">JLPT N5 Certified</span>
                        <span className="jlpt-jp">日本語能力試験 N5</span>
                    </div>
                    
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h4>2+</h4>
                            <p>Years Learning & Building</p>
                        </div>
                        <div className="stat-item">
                            <h4>15+</h4>
                            <p>Projects Built</p>
                        </div>
                        <div className="stat-item">
                            <h4>100%</h4>
                            <p>Dedication to Growth</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="about-visual"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="glass-card modern-card pt-override">
                        <div className="card-header">My Approach <span className="jp-text" style={{fontSize: '0.6em'}}>私のアプローチ</span></div>
                        <ul className="philosophy-list">
                            <li><strong>Innovation:</strong> Building modern and future-ready solutions.</li>
                            <li><strong>Design:</strong> Clean, minimal and user-focused UI.</li>
                            <li><strong>Performance:</strong> Fast, optimized and smooth experience.</li>
                            <li><strong>Growth:</strong> Always learning, improving, evolving.</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
