import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, X as CloseIcon, Mail, Lightbulb, Sparkles, Film } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  const socialLinks = [
    { icon: <Instagram size={24} />, url: 'https://instagram.com/whynotchotu', color: 'hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]' },
    { icon: <Linkedin size={24} />, url: 'https://www.linkedin.com/in/lalit-hirvey-0558b8327', color: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]' },
    { icon: <Github size={24} />, url: 'https://github.com/whynotchotu', color: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' }
  ];

  return (
    <>
      {/* Process Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative" id="process">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge">THE WORKFLOW</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">How we create</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Bringing impossible visions to life.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { num: '01', title: 'Conceptualization', icon: <Lightbulb size={28} className="text-blue-400" />, desc: 'Defining the mood, tone, and narrative direction. Developing prompt structures and visual anchors.' },
            { num: '02', title: 'Generation & Refinement', icon: <Sparkles size={28} className="text-purple-400" />, desc: 'Iterative generation using advanced AI models. Inpainting, upscaling, and refining fine details.' },
            { num: '03', title: 'Post & Motion', icon: <Film size={28} className="text-pink-400" />, desc: 'Applying cinematic color grading, VFX compositing, and rendering final dynamic motion sequences.' }
          ].map((step, idx) => (
            <motion.div 
              key={step.num}
              className="glass-card p-10 relative group hover:border-white/20 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Top Gradient Hover Strip */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Massive Offset Watermark Number */}
              <span className="absolute -bottom-8 -right-4 text-[120px] leading-none font-black text-white/5 opacity-50 group-hover:opacity-100 group-hover:text-white/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0">
                {step.num}
              </span>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 text-center z-10 relative" id="contact">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 gradient-text-alt leading-none">
            READY TO CREATE?
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12">
            Let's collaborate on your next digital masterpiece.
          </p>
          <MagneticWrapper>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="solid-button text-lg px-10 py-5 mx-auto w-max"
            >
              Start a Project
            </button>
          </MagneticWrapper>
          
          <div className="mt-20 flex justify-center gap-6 md:gap-8">
            {socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 ${link.color}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-8 md:p-10 rounded-3xl glass-card border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <CloseIcon size={24} />
              </button>
              
              <h3 className="text-3xl font-bold text-white mb-2">Let's Connect</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">Send me an email directly to discuss your project, or connect with me on social media.</p>
              
              <a 
                href="mailto:hello@whynotchotu.com" 
                className="w-full solid-button text-base px-8 py-4 mb-8 flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
              >
                <Mail size={20} />
                Send an Email
              </a>
              
              <div className="flex justify-center gap-6 w-full pt-8 border-t border-white/10">
                {socialLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 ${link.color}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;
