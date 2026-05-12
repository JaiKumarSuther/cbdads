"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const AnimatedTextCharacter = ({ text }: { text: string }) => {
  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: i * 0.04 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="inline-block"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};


const Hero = () => {
  return (
    <section className="relative h-screen min-h-[800px] w-full bg-zinc-950 overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Animated Orbs */}
      <motion.div
        animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"
      />
       <motion.div
        animate={{ x: [50, -50, 50], y: [-100, 100, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-amber-400 ring-1 ring-inset ring-white/10">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE Governance Intelligence
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          <AnimatedTextCharacter text="Govern Everything." />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            <AnimatedTextCharacter text="Trust Nothing to Chance." />
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-6 max-w-2xl text-lg text-zinc-300"
        >
          The world's first real-time compliance governance platform. 
          Monitor, manage, and master your entire operational landscape from a single command center.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <Link
            href="/login"
            className="rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:scale-105 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Start Governing Free
          </Link>
          <Link
            href="#"
            className="group flex items-center gap-x-2 text-sm font-semibold leading-6 text-zinc-300 hover:text-white transition-colors duration-200"
          >
            <PlayCircle className="h-5 w-5 text-zinc-400 group-hover:text-amber-400 transition-colors duration-200" />
            Watch Demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 2 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="relative rounded-xl bg-zinc-900/50 p-2 ring-1 ring-white/10 backdrop-blur-sm">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-emerald-500/20 blur-lg"></div>
            <div className="relative rounded-lg bg-zinc-900 p-4">
              <div className="flex justify-between items-center mb-2 px-2">
                <p className="text-sm font-medium text-zinc-300">Operations Queue & Compliance</p>
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-zinc-800/50 rounded-md p-3 text-xs">
                  <div className="grid grid-cols-4 gap-2 font-mono text-zinc-400 mb-2 border-b border-zinc-700 pb-2">
                    <div>PRIORITY</div><div>TASK ID</div><div className="col-span-2">SUBJECT</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 items-center text-zinc-200">
                    <div className="text-red-400">CRITICAL</div><div>#8B64</div><div className="col-span-2">Consent Drift Detected: User:34AB</div>
                    <div className="text-amber-400">HIGH</div><div>#0EEF</div><div className="col-span-2">Trademark Violation: "CBDADS"</div>
                    <div className="text-cyan-400">MEDIUM</div><div>#5A8B</div><div className="col-span-2">New Admin Role Approval</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  {[{label: 'Consent', value: 98, color: 'cyan'}, {label: 'Trademark', value: 82, color: 'purple'}, {label: 'Operations', value: 95, color: 'emerald'}, {label: 'Admin', value: 100, color: 'amber'}].map(item => (
                    <div key={item.label} className="bg-zinc-800/50 rounded-md p-2 flex flex-col justify-center">
                      <p className={`text-2xl font-bold text-${item.color}-400`}>{item.value}%</p>
                      <p className="text-xs text-zinc-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-zinc-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;