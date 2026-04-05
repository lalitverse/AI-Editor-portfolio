import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "NextGen E-commerce",
            description: "A fully functional modern e-commerce platform with real-time inventory, secure payment gateways, and a blazing fast UI.",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            demoLink: "https://agent-69d21d9dce2a58eb--gaming-ecommerce-website.netlify.app", // paste live link here
            githubLink: "https://github.com/whynotchotu/gaming-website", // paste GitHub link here
            image: "/project1.png"
        },
        {
            title: "AI Editor Portfolio",
            description: "An advanced browser-based AI video editing suite with seamless effects, transitions, and timeline controls.",
            tech: ["React", "Node.js", "FFmpeg", "TailwindCSS"],
            demoLink: "/ai-video-editor/index.html",
            githubLink: "https://github.com/whynotchotu/AI-Editor-portfolio",
            image: "/project2.png"
        }
    ];

    return (
        <section id="projects" className="projects-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2>Featured <span>Projects</span><span className="jp-text">注目プロジェクト</span></h2>
                <div className="underline"></div>
            </motion.div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="project-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                    >
                        <div className="project-img-wrapper">
                            <img src={project.image} alt={project.title} loading="lazy" />
                        </div>
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links-container">
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn secondary">
                                    <i className="fa-brands fa-github"></i> GitHub
                                </a>
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-btn primary">
                                    <ExternalLink size={18} /> Live Demo
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
