import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import SocialIcons from './SocialIcons';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Usually you'd use EmailJS or Formspree here
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
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Get In Touch</h3>
                    <p>Ready to start your next big project? I'm currently open for new opportunities and freelance work. Let's create something extraordinary together.</p>
                    
                    <div className="contact-details">
                        <div className="detail-item">
                            <Mail className="detail-icon" />
                            <span>lalithirvey838@gmail.com</span>
                        </div>
                        <div className="detail-item">
                            <Phone className="detail-icon" />
                            <span>+91 Your Phone</span>
                        </div>
                        <div className="detail-item">
                            <MapPin className="detail-icon" />
                            <span>Available Worldwide (Remote)</span>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <h4>Follow Me</h4>
                        <SocialIcons />
                    </div>
                </motion.div>

                <motion.form 
                    className="contact-form glass-card"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
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
                            rows="5" 
                            placeholder="Tell me about your project..." 
                            required
                            onChange={handleChange}
                            value={formData.message}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn primary-btn submit-btn">Send Message</button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
