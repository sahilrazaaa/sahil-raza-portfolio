import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { id: '01', label: 'Home', path: '/' },
  { id: '02', label: 'About', path: '/about' },
  { id: '03', label: 'Blog', path: '/blog' },
  { id: '04', label: 'List of Lists', path: '/lists' },
  { id: '05', label: 'Madhyama', href: 'https://madhyama.substack.com', external: true },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col md:flex-row selection:bg-white/20 selection:text-white">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-6 sticky top-0 bg-[#050505]/90 backdrop-blur-md z-50 border-b border-white/10">
        <NavLink to="/" className="font-serif text-xl tracking-wide">Sahil Raza</NavLink>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[73px] bg-[#050505] z-40 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col p-8 space-y-6">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline space-x-4 text-2xl font-light transition-colors text-white/50 hover:text-white/80"
                  >
                    <span className="font-mono text-sm tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.id}
                    </span>
                    <span className="font-serif italic tracking-wide">{item.label}</span>
                    <ExternalLink size={16} className="opacity-50" />
                  </a>
                ) : (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) => twMerge(
                      "group flex items-baseline space-x-4 text-2xl font-light transition-colors",
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                  >
                    <span className="font-mono text-sm tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.id}
                    </span>
                    <span className="font-serif italic tracking-wide">{item.label}</span>
                  </NavLink>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 h-screen sticky top-0 border-r border-white/10 p-12 justify-between">
        <div>
          <NavLink to="/" className="block mb-16">
            <h1 className="font-serif text-3xl tracking-wide font-light">Sahil Raza</h1>
          </NavLink>
          
          <nav className="flex flex-col space-y-5">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline space-x-4 text-lg transition-colors duration-200 text-white/50 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-sm"
                >
                  <span className="font-mono text-xs tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                    {item.id}
                  </span>
                  <span className="font-serif italic tracking-wide nav-link-hover">{item.label}</span>
                  <ExternalLink size={14} className="opacity-50" />
                </a>
              ) : (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => twMerge(
                    "group flex items-baseline space-x-4 text-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-sm",
                    isActive ? "text-white" : "text-white/50 hover:text-white/80"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-mono text-xs tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                        {item.id}
                      </span>
                      <span className={twMerge(
                        "font-serif italic tracking-wide nav-link-hover",
                        isActive && "active"
                      )}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>
        </div>
        
        <div className="text-xs font-mono text-white/30 tracking-wider">
          <p>© {new Date().getFullYear()}</p>
          <p className="mt-1">All rights reserved.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-6 md:p-12 lg:p-24 max-w-4xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
