import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase, GraduationCap, Calendar, MapPin, Rocket, LayoutTemplate } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <motion.div 
                className="section-header text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2>Developer <span>Journey</span><span className="jp-text">経験と教育</span></h2>
                <div className="underline mx-auto"></div>
            </motion.div>

            <div className="experience-grid">
                {/* Developer Journey */}
                <motion.div 
                    className="edu-exp-card glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                    <div className="card-glow"></div>
                    <div className="card-header-flex" style={{marginBottom: "1rem"}}>
                        <div className="icon-box">
                            <Briefcase size={28} />
                        </div>
                        <span className="date-badge">
                            <Calendar size={14} />
                            2024 – 2026
                        </span>
                    </div>
                    
                    <div className="card-body">
                        <h3>Self-Taught Frontend Developer</h3>
                        
                        <div className="journey-timeline" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
                            <div className="journey-step" style={{ display: "flex", gap: "1.5rem" }}>
                                <div style={{ color: "#b74b4b", paddingTop: "0.2rem" }}><Code2 size={20} /></div>
                                <div>
                                    <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>2024: The Foundation</h4>
                                    <p style={{ fontSize: "1.45rem", color: "#bbb", lineHeight: 1.6 }}>Started learning web development from the ground up, focusing deeply on core web fundamentals—HTML semantics, CSS styling, and JavaScript mechanics.</p>
                                </div>
                            </div>
                            
                            <div className="journey-step" style={{ display: "flex", gap: "1.5rem" }}>
                                <div style={{ color: "#b74b4b", paddingTop: "0.2rem" }}><LayoutTemplate size={20} /></div>
                                <div>
                                    <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>2025: Real-World Applications</h4>
                                    <p style={{ fontSize: "1.45rem", color: "#bbb", lineHeight: 1.6 }}>Built complex, interactive projects such as an e-commerce website and multiple portfolio templates. Transitioned to using modern frameworks like React for componentized architecture.</p>
                                </div>
                            </div>
                            
                            <div className="journey-step" style={{ display: "flex", gap: "1.5rem" }}>
                                <div style={{ color: "#b74b4b", paddingTop: "0.2rem" }}><Rocket size={20} /></div>
                                <div>
                                    <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>2026: Polished UI & Animations</h4>
                                    <p style={{ fontSize: "1.45rem", color: "#bbb", lineHeight: 1.6 }}>Improved UI/UX capabilities by integrating glassmorphism, responsive grids, and Framer Motion. Focused on creating sleek, premium, and performant web experiences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Education Card */}
                <motion.div 
                    className="edu-exp-card glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                    <div className="card-glow"></div>
                    <div className="card-header-flex">
                        <div className="icon-box">
                            <GraduationCap size={28} />
                        </div>
                        <span className="date-badge">
                            <Calendar size={14} />
                            2024 – 2028
                        </span>
                    </div>
                    <div className="card-body">
                        <h3>Bachelor of Technology (Computer Science Engineering)</h3>
                        <div className="org-location">
                            <h4 className="organization">Scope Global Skills University</h4>
                            <span className="location">
                                <MapPin size={14} />
                                Bhopal
                            </span>
                        </div>
                        <p style={{ fontSize: "1.5rem", color: "#bbb", lineHeight: 1.7, marginTop: "1.5rem" }}>
                            Currently pursuing B.Tech in CSE with a specialized interest in web development and software engineering. Beyond the academic curriculum, actively strengthening practical knowledge through building real-world projects and mastering modern web standards.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
