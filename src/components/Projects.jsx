import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "NexGen E-Commerce",
            description: "A fully functional modern e-commerce platform with real-time inventory, secure payment gateways, and a blazing fast UI.",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            demoLink: "https://whynotchotu.github.io/nextgen-ecommerce/",
            githubLink: "https://github.com/whynotchotu/nextgen-ecommerce",
            image: "/project1.png"
        },
        {
            title: "AI Analytics Dashboard",
            description: "Data visualization dashboard integrating AI to predict trends and generate actionable business insights.",
            tech: ["React", "Python", "TensorFlow", "D3.js"],
            demoLink: "#",
            githubLink: "#",
            image: "/project2.png"
        },
        {
            title: "DevCollab Platform",
            description: "A real-time workspace for developers to collaborate on code, share ideas, and manage sprints.",
            tech: ["Vite", "Socket.io", "Express", "PostgreSQL"],
            demoLink: "#",
            githubLink: "#",
            image: "/project3.png"
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
                            <div className="project-overlay">
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="icon-link"><ExternalLink size={20}/></a>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="icon-link"><i className="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
