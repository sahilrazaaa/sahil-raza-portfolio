import React from 'react';
import { motion } from 'motion/react';

const lists = [
  {
    title: "Books to Read",
    items: [
      "Gödel, Escher, Bach — Douglas Hofstadter",
      "The Structure of Scientific Revolutions — Thomas Kuhn",
      "Thinking, Fast and Slow — Daniel Kahneman",
      "The Three-Body Problem — Cixin Liu",
      "Meditations — Marcus Aurelius",
    ],
  },
  {
    title: "Favorite Films",
    items: [
      "2001: A Space Odyssey (1968)",
      "Blade Runner 2049 (2017)",
      "Interstellar (2014)",
      "The Matrix (1999)",
      "Arrival (2016)",
    ],
  },
  {
    title: "Tools I Use",
    items: [
      "VS Code & Neovim",
      "React & TypeScript",
      "Tailwind CSS",
      "Figma",
      "Notion for writing",
    ],
  },
  {
    title: "Inspirations",
    items: [
      "Minimalist design",
      "Long-form essays",
      "Open-source philosophy",
      "Digital gardens",
    ],
  },
];

export function Lists() {
  return (
    <div className="space-y-20 pb-24">
      <header className="space-y-4">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tighter">List of Lists</h1>
        <div className="h-px w-20 bg-white/15"></div>
        <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase pt-4">Curated collections & things I care about</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
        {lists.map((list, i) => (
          <motion.div
            key={list.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h2 className="font-serif text-2xl md:text-3xl italic text-white/95 border-b border-white/[0.08] pb-4">
              {list.title}
            </h2>
            <ul className="space-y-4 font-light text-white/70">
              {list.items.map((item, j) => (
                <li key={j} className="flex items-start space-x-4 group">
                  <span className="font-mono text-[10px] tracking-widest text-white/25 mt-1.5 shrink-0">
                    {(j + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="group-hover:text-white/90 transition-colors duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
