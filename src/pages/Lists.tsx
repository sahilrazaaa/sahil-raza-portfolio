import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { sanityClient } from '../lib/sanity';

type ListEntry = string | { _key?: string; label: string; href?: string | null };

interface ListItem {
  _id: string;
  title: string;
  order: number | null;
  isExternal: boolean | null;
  href: string | null;
  items: ListEntry[] | null;
}

export function Lists() {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    if (!projectId) {
      setError('Sanity Project ID is missing. Configure VITE_SANITY_PROJECT_ID in your environment.');
      setLoading(false);
      return;
    }

    const query = `*[_type == "list"] | order(order asc) {
      _id,
      title,
      order,
      isExternal,
      href,
      items
    }`;

    sanityClient
      .fetch<ListItem[]>(query)
      .then((data) => {
        setLists(data);
        setExpanded(
          Object.fromEntries(
            data.filter((l) => l.isExternal !== true).map((l) => [l.title, true])
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setError(err?.message || 'Failed to fetch lists.');
        setLoading(false);
      });
  }, []);

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
        {loading && (
          <p className="font-mono text-sm tracking-widest text-white/50 uppercase animate-pulse">Loading lists...</p>
        )}

        {error && (
          <div className="p-6 border border-red-500/30 bg-red-500/10 rounded-sm space-y-2 col-span-full">
            <h3 className="font-serif text-xl text-red-400">Configuration Required</h3>
            <p className="font-light text-white/70 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {!loading && !error && lists.length === 0 && (
          <p className="font-light text-white/60 col-span-full">No lists found. Add lists in Sanity Studio.</p>
        )}

        {!loading && !error && lists.map((list, i) => (
          <motion.div
            key={list._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {list.isExternal === true ? (
              <a
                href={list.href ?? '#'}
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
                      {(list.items ?? []).map((item, j) => {
                        const isObject = typeof item === 'object' && item !== null && 'label' in item;
                        const label = isObject ? (item as { label: string }).label : String(item);
                        const href = isObject ? (item as { href?: string | null }).href : null;
                        return (
                          <motion.li
                            key={isObject && '_key' in item ? (item as { _key: string })._key : j}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: j * 0.04 }}
                            className="flex items-start space-x-4 group"
                          >
                            <span className="font-mono text-[10px] tracking-widest text-white/25 mt-1.5 shrink-0">
                              {(j + 1).toString().padStart(2, "0")}
                            </span>
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group-hover:text-white/90 transition-colors duration-200 underline underline-offset-4 hover:no-underline"
                              >
                                {label}
                              </a>
                            ) : (
                              <span className="group-hover:text-white/90 transition-colors duration-200">{label}</span>
                            )}
                          </motion.li>
                        );
                      })}
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
