import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import SocialIcons from './SocialIcons';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:lalithirvey838@gmail.com?subject=Portfolio Inquiry from ${formData.name}&body=${formData.message}`;
    };

    return (
        <section id="contact" className="contact-section">
            <motion.div 
                className="section-header text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2>Let's <span>Connect</span><span className="jp-text">繋がりましょう</span></h2>
                <div className="underline mx-auto"></div>
            </motion.div>

            <div className="contact-container">
                <motion.div 
                    className="contact-info-block glass-card"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 style={{ fontSize: "2.8rem", marginBottom: "1.5rem" }}>Get In Touch</h3>
                    <p style={{ fontSize: "1.5rem", color: "#ccc", lineHeight: 1.8, marginBottom: "4rem" }}>
                        Ready to start your next big project? I'm currently open for new opportunities, collaborations, and freelance work. Let's create something extraordinary together.
                    </p>
                    
                    <div className="contact-details">
                        <div className="detail-item" style={{ marginBottom: "2.5rem" }}>
                            <div style={{ background: "rgba(183, 75, 75, 0.1)", padding: "1.5rem", borderRadius: "1rem" }}>
                                <Mail className="detail-icon" size={24} />
                            </div>
                            <span style={{ fontSize: "1.6rem", marginLeft: "1.5rem" }}>lalithirvey838@gmail.com</span>
                        </div>
                        <div className="detail-item" style={{ marginBottom: "2.5rem" }}>
                            <div style={{ background: "rgba(183, 75, 75, 0.1)", padding: "1.5rem", borderRadius: "1rem" }}>
                                <MapPin className="detail-icon" size={24} />
                            </div>
                            <span style={{ fontSize: "1.6rem", marginLeft: "1.5rem" }}>Available Worldwide (Remote)</span>
                        </div>
                    </div>

                    <div className="contact-socials" style={{ marginTop: "5rem" }}>
                        <h4 style={{ fontSize: "1.8rem", color: "#bbb", marginBottom: "2rem" }}>Follow My Work</h4>
                        <SocialIcons />
                    </div>
                </motion.div>

                <motion.form 
                    className="contact-form glass-card"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 style={{ fontSize: "2.4rem", marginBottom: "2.5rem", color: "#fff" }}>Send me a message</h3>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            required 
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            required 
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="input-group">
                        <textarea 
                            name="message" 
                            rows="6" 
                            placeholder="Tell me about your project or inquiry..." 
                            required
                            onChange={handleChange}
                            value={formData.message}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn primary-btn submit-btn" style={{ padding: "1.5rem", marginTop: "1rem" }}>Send Message</button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
