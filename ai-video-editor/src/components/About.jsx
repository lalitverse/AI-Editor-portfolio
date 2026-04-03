import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative" id="about">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge mb-6">ABOUT ME</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Crafting The Unseen</h2>
          <p className="text-lg text-slate-400 mb-6 leading-relaxed">
            I am a digital artist shaping cinematic AI generation and motion design. My work revolves around creating deeply immersive visual experiences that push the boundaries of storytelling and modern web art.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Leveraging cutting edge workflows, I blend imagination with modern frontend technologies like React and Tailwind CSS to craft interactive worlds that inspire and captivate.
          </p>
          
          <div className="flex flex-wrap gap-3">
             {['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'AI Modeling', 'Cinematography'].map((skill) => (
               <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                 {skill}
               </span>
             ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="glass-card p-8 text-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="block text-5xl font-extrabold mb-2 gradient-text-alt">1+</span>
            <span className="text-sm uppercase tracking-wider text-slate-400 font-medium">Year of Design</span>
          </motion.div>
          <motion.div 
            className="glass-card p-8 text-center mt-8"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <span className="block text-5xl font-extrabold mb-2 gradient-text-alt">200+</span>
            <span className="text-sm uppercase tracking-wider text-slate-400 font-medium">Worlds Created</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
