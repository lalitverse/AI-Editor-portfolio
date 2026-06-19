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
            image: "/src/assets/Screenshot 2026-06-19 234339.png"
        },
        {
            title: "AI Editor Portfolio",
            description: "An advanced browser-based AI video editing suite with seamless effects, transitions, and timeline controls.",
            tech: ["React", "Node.js", "FFmpeg", "TailwindCSS"],
            demoLink: "/ai-video-editor/index.html",
            githubLink: "https://github.com/whynotchotu/AI-Editor-portfolio",
            image: "/src/assets/image.png"
        },
        {
            title: "K72 Clone",
            description: "A premium modern website clone inspired by K72 with smooth scrolling, advanced animations, interactive sections, responsive layouts, and high-end visual design.",
            tech: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger"],
            demoLink: "https://k72-ca-pu4d.vercel.app/",
            githubLink: "https://github.com/lalitverse/k72.ca",
            image: "/src/assets/Screenshot 2026-06-19 234840.png"
        },
        {
            title: "Dogstudio Clone",
            description: "A visually immersive creative agency website clone featuring cinematic animations, smooth transitions, interactive storytelling, and responsive user experience.",
            tech: ["HTML", "CSS", "JavaScript", "GSAP", "Locomotive Scroll"],
            demoLink: "https://dogstudio-co.vercel.app",
            githubLink: "https://github.com/lalitverse/dogstudio.co",
            image: "/src/assets/Screenshot 2026-06-19 235001.png"
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
