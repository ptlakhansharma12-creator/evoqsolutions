import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'AI Advantage', href: '#ai-advantage' },
    { name: 'Process', href: '#process' },
    { name: 'Insights', href: '#insights' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'py-3 bg-[#05070d]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:scale-105 transform inline-block"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Talk to an Expert
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-evoq-black bg-white rounded-full hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#080b14]/95 border-b border-white/10 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 w-full my-2"></div>
              <a href="#contact" className="text-lg font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
                Talk to an Expert
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-semibold text-evoq-black bg-white rounded-xl shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Discovery Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
