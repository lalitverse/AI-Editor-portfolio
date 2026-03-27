import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Cpu, Globe } from 'lucide-react';

const Skills = () => {
    const skills = [
        { name: "Frontend Development", icon: <Layout />, level: 70 },
        { name: "Backend Architecture", icon: <Server />, level: 25 },
        { name: "Database Design", icon: <Database />, level: 20 },
        { name: "API Development", icon: <Globe />, level: 20 },
        { name: "System Optimization", icon: <Cpu />, level: 75 },
        { name: "Clean Code Practices", icon: <Code />, level: 100 }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section id="skills" className="skills-section">
            <motion.div 
                className="section-header text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2>My <span>Expertise</span><span className="jp-text">私の専門知識</span></h2>
                <div className="underline mx-auto"></div>
            </motion.div>

            <motion.div 
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {skills.map((skill, index) => (
                    <motion.div key={index} className="skill-card glass-card" variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(183, 75, 75, 0.2)" }}>
                        <div className="skill-icon">{skill.icon}</div>
                        <h3>{skill.name}</h3>
                        <div className="progress-container">
                            <motion.div 
                                className="progress-bar" 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                            ></motion.div>
                        </div>
                        <span className="skill-percent">{skill.level}%</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;
