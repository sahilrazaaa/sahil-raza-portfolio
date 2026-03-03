import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink } from 'lucide-react';

const lists = [
  {
    title: "Films (redirects to Letterboxd)",
    href: "https://letterboxd.com/sahilrazaa/",
    isExternal: true,
  },
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(lists.filter((l) => !l.isExternal).map((l) => [l.title, true]))
  );

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
            {list.isExternal ? (
              <a
                href={list.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between font-serif text-2xl md:text-3xl italic text-white/95 border-b border-white/[0.08] pb-4 hover:text-white transition-colors"
              >
                <span>{list.title}</span>
                <ExternalLink size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <div>
                <button
                  onClick={() => toggleExpand(list.title)}
                  className="group w-full flex items-center justify-between font-serif text-2xl md:text-3xl italic text-white/95 border-b border-white/[0.08] pb-4 text-left hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                >
                  <span>{list.title}</span>
                  <motion.span
                    animate={{ rotate: expanded[list.title] ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-2"
                  >
                    <ChevronDown size={24} className="text-white/50 group-hover:text-white/80" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expanded[list.title] && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-4 font-light text-white/70 overflow-hidden pt-4"
                    >
                      {list.items!.map((item, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: j * 0.04 }}
                          className="flex items-start space-x-4 group"
                        >
                          <span className="font-mono text-[10px] tracking-widest text-white/25 mt-1.5 shrink-0">
                            {(j + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="group-hover:text-white/90 transition-colors duration-200">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
