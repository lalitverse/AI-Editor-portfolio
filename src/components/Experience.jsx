import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
    const timeline = [
        {
            type: "work",
            title: "Frontend Developer",
            organization: "Tech Innovators Inc.",
            date: "2024 - Present",
            description: "Leading the development of highly interactive web applications using React and Vite. Focused on performance optimization and scalable architecture."
        },
        {
            type: "education",
            title: "4th SEM BTECH (CSE)",
            organization: "University Institute of Technology",
            date: "2023 - Present",
            description: "Currently pursuing Bachelor of Technology in Computer Science. Actively participating in coding clubs and hackathons."
        },
        {
            type: "work",
            title: "Web Development Intern",
            organization: "Creative Digital Agency",
            date: "2023 - 2024",
            description: "Assisted in building responsive landing pages for clients. Gained hands-on experience with modern CSS, semantic HTML, and JavaScript."
        }
    ];

    return (
        <section id="experience" className="experience-section">
            <motion.div 
                className="section-header text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2>Experience & <span>Education</span><span className="jp-text">経験と教育</span></h2>
                <div className="underline mx-auto"></div>
            </motion.div>

            <div className="timeline-container">
                {timeline.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="timeline-icon">
                            {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                        </div>
                        <div className="timeline-content glass-card">
                            <span className="timeline-date">{item.date}</span>
                            <h3>{item.title}</h3>
                            <h4>{item.organization}</h4>
                            <p>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
