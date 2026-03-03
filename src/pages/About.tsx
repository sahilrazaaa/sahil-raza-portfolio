import React from 'react';
import { motion } from 'motion/react';
import { Mail, Globe, Feather, Cpu } from 'lucide-react';

export function About() {
  return (
    <div className="space-y-20 pb-24">
      <header className="space-y-4">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tighter">About</h1>
        <div className="h-px w-20 bg-white/15"></div>
      </header>

      <section className="space-y-8 text-lg font-light leading-[1.8] text-white/80 max-w-2xl">
        <p>
          <span className="font-serif text-3xl italic mr-2 text-white">Hi! I'm Sahil Raza.</span>
          I am Sahil Raza, an undergraduate student of Political Science at the University of Delhi, with a minor in History. My academic interests lie in political theory, governance, and historical inquiry, and I am currently 
          preparing for the UPSC CSE with the goal of entering public service.
        </p>
        <p>
        I read and reflect on culture, history, politics, and philosophy, and follow developments in artificial intelligence with particular interest in its philosophical dimensions.
        </p>
        <p>
          When I'm not studying or reflecting, I listen to music, play the guitar, watch films, write Hindustani poetry, and enjoy collecting lesser-known trivia across disciplines.
          This space serves as a digital garden for my evolving thoughts, journals, and projects. Welcome to my corner of the internet!
        </p>
        <p className="text-white/60">
          — <a href="mailto:sahilraza132@gmail.com" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">Click here to reach out</a>, or keep scrolling for more.
        </p>
      </section>

      <section className="space-y-10 pt-16 border-t border-white/[0.08]">
        <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">My Interests</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            { icon: Globe, title: 'Social Sciences', desc: 'Researching and exploring discourses on political theory, public policy, historical events, and cultural narratives. My academic work centres on governance, historical inquiry, and how these fields intersect with contemporary political challenges.' },
            { icon: Feather, title: 'Writing', desc: 'I write about politics, history, and culture. I also enjoy documenting my thoughts and experiences through essays and reflections. Penning Hindustani poetry is a passion of mine, and this site serves as a digital garden for my evolving work.' },
            { icon: Cpu, title: 'Tech', desc: 'I am interested in the adoption strategies and philosophical dimensions of artificial intelligence, and the future of human-computer interaction. I also employ my technical skills to create digital tools and projects.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
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
      </section>

      <section className="space-y-8 pt-16 border-t border-white/[0.08]">
        <h2 className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">Contact Me</h2>
        <p className="text-white/60 font-light">Quickest way to reach me is through mail.</p>
        <a 
          href="mailto:sahilraza132@gmail.com" 
          className="inline-flex items-center space-x-4 text-white/70 hover:text-white transition-colors w-fit group"
        >
          <Mail size={20} className="text-white/50 group-hover:text-white/80 transition-colors" strokeWidth={1.5} />
          <span className="font-mono text-sm tracking-wide">sahilraza132 [at] gmail.com</span>
        </a>
      </section>
    </div>
  );
}
