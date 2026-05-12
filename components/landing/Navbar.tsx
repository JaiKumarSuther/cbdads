"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
              CBDADS
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-zinc-300 rounded-md hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-md hover:scale-105 transition-transform"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden fixed top-20 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 pb-8"
          >
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={menuItemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-3 text-lg text-zinc-300 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-md hover:scale-105 transition-transform"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;