import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#' },
    { label: 'Story', href: '#story' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'py-4 px-6 md:px-12 bg-background/80 backdrop-blur-md border-b border-white/10' 
            : 'py-6 px-6 md:px-12 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 font-mono tracking-widest text-lg font-black text-white">
            <Terminal size={18} className="text-primary animate-pulse" />
            <span>[ AMIT_KUMAR ]</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono text-white/70 hover:text-primary tracking-widest uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* System Status / Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono text-emerald-400 tracking-wider">SYS_OK: ONLINE</span>
            </div>
            <a 
              href="#contact" 
              className="bg-primary text-black font-mono text-xs font-bold uppercase px-5 py-2.5 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all"
            >
              Init_Link
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-primary transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <div className="space-y-8 flex flex-col items-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-black tracking-tight text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col items-center space-y-4 pt-8 border-t border-white/10 w-full max-w-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono text-emerald-400">SYS_OK: ONLINE</span>
                </div>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-primary text-black font-mono text-sm font-bold uppercase py-4"
                >
                  Init_Link
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
