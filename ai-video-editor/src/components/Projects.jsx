import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

import warMovie from '../assets/war_movie_scene.png';
import cyberpunkCity from '../assets/cyberpunk_city.png';
import alienFlora from '../assets/alien_flora.png';
import neonDrift from '../assets/neon_drift.png';

import whisperingForest from '../assets/whispering_forest.png';
import neonDrifterNew from '../assets/neon_drifter.png';
import lastCoffeeShop from '../assets/last_coffee_shop.png';

const featuredVideos = [
  {
    id: 'tears',
    title: 'Tears of Steel',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: warMovie,
    tag: 'SCI-FI ACTION',
    desc: 'A thrilling battle sequence in a war-torn futuristic city where heavily armed soldiers engage a massive quadrupedal war machine.',
    prompt: 'A high-octane sci-fi action scene set in post-apocalyptic Amsterdam, featuring futuristic soldiers battling a giant multi-legged mechanical sniper mech. Gritty, cinematic, photorealistic CGI style.'
  },
  {
    id: 'sintel',
    title: 'Sintel - Deep Cavern',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: null, 
    tag: 'FANTASY EPIC',
    desc: 'A brave young warrior traverses an epic, highly detailed 3D fantasy world in search of a lost dragon.',
    prompt: 'A 3D animated high-fantasy scene showing a brave young female warrior traveling through epic mountains and caverns. Cinematic lighting, vast scale, highly detailed environment.'
  },
  {
    id: 'dream',
    title: 'Elephants Dream',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: null, 
    tag: '3D ANIMATION',
    desc: 'A surreal, steampunk-inspired animated short set inside a massive, chaotic machine world composed of giant gears and shifting pipes.',
    prompt: 'A 3D animated surreal, steampunk-inspired short set inside a massive, chaotic machine world composed of giant gears and shifting pipes. Dark, moody, mechanical aesthetics, strong depth of field.'
  }
];

const FeaturedVideoItem = ({ video, reverseLayout, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-12 gap-8 items-center">
      <motion.div 
        className={`md:col-span-8 glass-card p-2 relative group cursor-pointer ${reverseLayout ? 'md:order-2' : ''}`}
        initial={{ opacity: 0, x: reverseLayout ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        onClick={toggleVideo}
      >
        <video 
          ref={videoRef}
          className="w-full aspect-video object-cover rounded-2xl bg-black" 
          poster={video.poster ? video.poster : undefined} 
          preload="none"
          onEnded={() => setIsPlaying(false)}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none rounded-2xl m-2"
            >
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:bg-white/20 transition-all duration-300">
                <Play size={40} className="text-white ml-2" fill="currentColor" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div 
        className={`md:col-span-4 glass-card p-10 flex flex-col justify-center ${reverseLayout ? 'md:order-1' : ''}`}
        initial={{ opacity: 0, x: reverseLayout ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">{video.tag}</span>
        <h3 className="text-3xl font-bold mb-6 leading-tight text-white">{video.title}</h3>
        <p className="text-slate-400 leading-relaxed mb-8">
          {video.desc}
        </p>
        <MagneticWrapper>
          <button 
            className="outline-button w-max"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            {showBreakdown ? 'CLOSE BREAKDOWN' : 'EXPLORE BREAKDOWN'}
          </button>
        </MagneticWrapper>

        <AnimatePresence>
          {showBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-md">
                <h4 className="text-sky-400 text-sm font-bold mb-2 uppercase tracking-wider">Exact Prompt</h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed font-mono">"{video.prompt}"</p>
                <h4 className="text-purple-400 text-sm font-bold mb-2 uppercase tracking-wider">Description</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{video.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightboxBreakdown, setShowLightboxBreakdown] = useState(false);

  // Close modal with ESC key and prevent body scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setShowLightboxBreakdown(false);
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const projects = [
    { 
      id: 'war', title: 'Epic Battlefield', tag: 'WAR MOVIE SCENE', image: warMovie, spanClass: 'md:col-span-8',
      prompt: "A sprawling cyberpunk battlefield with mechs and glowing laser arrays. Smoke and debris fill the air. Cinematic 8k.",
      description: "A high-octane battle sequence showing futuristic warfare with heavy mechanical infantry."
    },
    { 
      id: 'cyber', title: 'Cyberpunk City', tag: 'ULTRA DETAILED', image: cyberpunkCity, spanClass: 'md:col-span-4',
      prompt: "A massive cyberpunk city skyline is dominated by towering, flickering neon holographic advertisements. Rainy, dirty streets.",
      description: "An ultra-detailed look at a dystopian mega-city illuminated by bright, colorful neon lights."
    },
    { 
      id: 'alien', title: 'Alien Flora', tag: 'MACRO', image: alienFlora, spanClass: 'md:col-span-4',
      prompt: "Macro photography of glowing, bioluminescent alien flowers. Radiant neon pink and blue petals. High contrast.",
      description: "A highly detailed close-up shot of exotic, glowing alien plant life found on a distant world."
    },
    { 
      id: 'drift', title: 'Neon Drift', tag: 'MOTION CONCEPT', image: neonDrift, spanClass: 'md:col-span-4',
      prompt: "A sports car drifting through neon-lit streets, leaving trails of light. High-speed, fast motion, cinematic blur.",
      description: "A fast-paced motion concept of a vehicle drifting seamlessly through a glowing urban environment."
    },
    { 
      id: 'forest', title: 'The Whispering Forest', tag: 'FANTASY ANIMATION', image: whisperingForest, spanClass: 'md:col-span-4',
      prompt: "A young girl in a red raincoat walking through an ancient, towering forest at dusk. She is mesmerized by a vividly glowing blue butterfly leading her forward. The giant tree roots and hanging moss are illuminated by pulsing bioluminescent flora in hues of cyan and purple. Soft, magical lighting, expressive 3D animated style reminiscent of high-end fantasy films.",
      description: "A curious little girl follows a magical glowing butterfly deep into an ancient forest. She discovers a breathtaking hidden world where the trees and flora pulse with enchanting, colorful light."
    },
    { 
      id: 'drifter', title: 'Echoes of Neon', tag: 'CYBERPUNK THRILLER', image: neonDrifterNew, spanClass: 'md:col-span-4',
      prompt: "A lone motorcyclist in a sleek black leather jacket riding a futuristic, glowing sports bike down a rain-slicked highway at night. In the background, a massive cyberpunk city skyline is dominated by towering, flickering neon holographic advertisements. Dramatic high-contrast lighting, reflective wet asphalt, hyper-realistic, dark gritty cinematic style.",
      description: "A mysterious rider races a futuristic motorcycle down a rain-soaked highway toward a dazzlingly chaotic cyberpunk city. The high-speed journey captures the thrill and gritty neon atmosphere of a dark future."
    },
    { 
      id: 'coffee', title: 'The Last Coffee Shop', tag: 'SCI-FI SURREALISM', image: lastCoffeeShop, spanClass: 'md:col-span-8',
      prompt: "An astronaut in a worn, slightly scuffed white spacesuit sitting alone at a red vinyl booth in a classic 1950s diner. A steaming cup of coffee rests on the table in front of them. The diner's large glass window reveals a breathtaking view of deep space with a vibrant purple and orange nebula and millions of stars. Cinematic, moody lighting, ultra-realistic sci-fi surrealism.",
      description: "A weary astronaut finds comfort sitting in a vintage diner that strangely floats in the empty void of deep space. Sipping a warm cup of coffee, they experience a surreal, peaceful moment of solitude."
    }
  ];

  return (
    <>
      {/* Featured Video Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative" id="featured">
        <motion.div 
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge">FEATURED PRODUCTIONS</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Flagship cinematic experiences <br />
            <span className="gradient-text-alt">designed to define the portfolio.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            A diverse showcase of high-impact visual pieces built through AI-assisted concept design, cinematic composition, motion experimentation, and atmosphere-first storytelling.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {featuredVideos.map((video, index) => (
            <FeaturedVideoItem 
              key={video.id} 
              video={video} 
              index={index} 
              reverseLayout={index % 2 !== 0} 
            />
          ))}
        </div>
      </section>

      {/* Bento Grid Projects */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative" id="projects">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Visuals</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">A curated selection of cinematic projects and motion concepts. Click on any image to enlarge it.</p>
        </motion.div>
        
        <div className="grid grid-cols-12 auto-rows-[350px] gap-6">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedImage(project)}
              className={`col-span-12 ${project.spanClass} glass-card group relative cursor-pointer overflow-hidden p-0`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <motion.img 
                layoutId={`img-${project.id}`}
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent p-8 flex flex-col justify-end pointer-events-none">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[0.7rem] font-bold tracking-wider text-white uppercase mb-3 w-max">
                  {project.tag}
                </span>
                <h3 className="text-2xl font-bold text-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage(null);
              setShowLightboxBreakdown(false);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              onClick={() => {
                setSelectedImage(null);
                setShowLightboxBreakdown(false);
              }}
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            >
              <X size={28} />
            </button>

            <motion.div
              layoutId={`card-${selectedImage.id}`}
              className="relative w-full max-w-3xl lg:max-w-4xl max-h-[75vh] rounded-2xl overflow-hidden glass-card flex items-center justify-center bg-transparent border-none shadow-2xl cursor-default mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                layoutId={`img-${selectedImage.id}`}
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl"
              />

              <div className="absolute top-4 left-4 z-50">
                <button 
                  onClick={() => setShowLightboxBreakdown(!showLightboxBreakdown)}
                  className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all shadow-xl"
                >
                  {showLightboxBreakdown ? 'HIDE BREAKDOWN' : 'EXPLORE BREAKDOWN'}
                </button>
              </div>

              <AnimatePresence>
                {showLightboxBreakdown && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8"
                  >
                    <div className="max-w-3xl glass-card border flex flex-col md:flex-row gap-6 border-white/10 p-6 rounded-2xl bg-black/70 backdrop-blur-xl shadow-2xl">
                      <div className="flex-1">
                        <span className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-2 block">Prompt</span>
                        <p className="text-white/90 text-[13px] md:text-sm italic leading-relaxed font-mono">"{selectedImage.prompt}"</p>
                      </div>
                      <div className="flex-1">
                        <span className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-2 block">Description</span>
                        <p className="text-white/70 text-[13px] md:text-sm leading-relaxed">{selectedImage.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
