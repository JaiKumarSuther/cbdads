"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "Govern Everything.",
  "Trust Nothing to Chance.",
  "Compliance at Real-Time Speed.",
  "Command. Monitor. Enforce.",
];

const stats = [
  { text: "98% Consent Health — Live", color: "emerald" },
  { text: "41 Active Alerts Monitored", color: "amber" },
  { text: "50,000+ Records Governed", color: "cyan" },
];

const Typewriter = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <h1 className="text-4xl md:text-5xl font-bold text-white h-28">
      {text}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

const AnimatedStatPill = () => {
    const [statIndex, setStatIndex] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setStatIndex((prev) => (prev + 1) % stats.length);
      }, 2000);
      return () => clearInterval(timer);
    }, []);
  
    const currentStat = stats[statIndex];
    const colorClass = {
        emerald: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
        amber: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20',
    }[currentStat.color];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={statIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${colorClass}`}
        >
          <span className={`relative flex h-2 w-2 mr-2`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${currentStat.color}-400 opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 bg-${currentStat.color}-500`}></span>
          </span>
          {currentStat.text}
        </motion.div>
      </AnimatePresence>
    );
  };

const AuthSplitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="relative hidden md:flex md:w-1/2 bg-zinc-950 p-8 flex-col justify-between overflow-hidden">
        {/* Orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-48 h-48 bg-amber-500/10 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"></div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
            CBDADS
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10">
          <Typewriter />
          <div className="mt-6 h-8">
            <AnimatedStatPill />
          </div>
        </div>

        {/* Social Proof */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-4">
            <span className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-sm font-bold text-white">SJ</span>
            <span className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-sm font-bold text-white">MB</span>
            <span className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-sm font-bold text-white">EC</span>
          </div>
          <p className="text-sm text-zinc-400">Trusted by 500+ compliance teams worldwide</p>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden h-32 bg-zinc-950 p-6 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
            CBDADS
        </Link>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-zinc-900 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;