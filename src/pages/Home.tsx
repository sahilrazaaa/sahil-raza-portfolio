import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Feather, Palette } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-[70vh] justify-center space-y-20 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Hello! I'm</p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white">
          Sahil Raza
        </h1>
        <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase pt-8">I work on</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/95 italic">
          Social Sciences, Art, and Technology.
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6 max-w-2xl"
      >
        <p className="font-serif text-xl md:text-2xl text-white/80 leading-relaxed italic">
          Welcome to my personal corner of the internet. A space to document my journey, share thoughts, and write about things that fascinates me — from my work to my interests.
        </p>
        <Link 
          to="/about" 
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors group pt-2"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Click here to know more</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-10 pt-12 border-t border-white/[0.08]"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">My Interests</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Globe, title: 'Social Sciences', desc: ' Researching and writing about social sciences.' },
            { icon: Feather, title: 'Writing', desc: 'Crafting prose and documenting experiences through essays and reflections.' },
            { icon: Palette, title: 'Art & Culture', desc: 'Seeking beauty in forms — visual arts, design, and cultural narratives.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
              className="group p-6 border border-white/[0.06] hover:border-white/15 rounded-sm transition-all duration-300 hover:bg-white/[0.02]"
            >
              <item.icon className="w-7 h-7 text-white/50 group-hover:text-white/80 mb-4 transition-colors" strokeWidth={1.25} />
              <h3 className="font-serif text-xl italic text-white/90 mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pt-4 flex flex-wrap gap-8"
      >
        <Link to="/blog" className="group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
          <span className="font-mono text-xs tracking-widest uppercase">Blog</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
        <Link to="/lists" className="group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
          <span className="font-mono text-xs tracking-widest uppercase">List of Lists</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
        <a href="mailto:sahilraza132@gmail.com" className="group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
          <span className="font-mono text-xs tracking-widest uppercase">Contact</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </motion.div>
    </div>
  );
}
