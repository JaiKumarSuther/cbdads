"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Scale, GitBranch, BookLock, Users } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Command Center",
    description: "Unified operational control",
    color: "amber",
    colSpan: "md:col-span-2",
  },
  {
    icon: Fingerprint,
    title: "Consent & Trust",
    description: "Real-time consent tracking, 41 active",
    color: "cyan",
    colSpan: "md:col-span-1",
  },
  {
    icon: Scale,
    title: "Trademark Registry",
    description: "IP protection at scale",
    color: "purple",
    colSpan: "md:col-span-1",
  },
  {
    icon: GitBranch,
    title: "Operations Queue",
    description: "Priority-ranked task management",
    color: "emerald",
    colSpan: "md:col-span-1",
  },
  {
    icon: BookLock,
    title: "Codex Ledger",
    description: "Immutable audit trail",
    color: "blue",
    colSpan: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Users & Roles",
    description: "Granular permission control",
    color: "pink",
    colSpan: "md:col-span-2",
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Everything You Need to Govern at Scale
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            A complete toolkit for modern, real-time governance.
          </p>
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorVariants = {
              amber: "hover:border-amber-500/50",
              cyan: "hover:border-cyan-500/50",
              purple: "hover:border-purple-500/50",
              emerald: "hover:border-emerald-500/50",
              blue: "hover:border-blue-500/50",
              pink: "hover:border-pink-500/50",
            };
            const glowVariants = {
                amber: "shadow-[0_0_20px_theme(colors.amber.500/0.3)]",
                cyan: "shadow-[0_0_20px_theme(colors.cyan.500/0.3)]",
                purple: "shadow-[0_0_20px_theme(colors.purple.500/0.3)]",
                emerald: "shadow-[0_0_20px_theme(colors.emerald.500/0.3)]",
                blue: "shadow-[0_0_20px_theme(colors.blue.500/0.3)]",
                pink: "shadow-[0_0_20px_theme(colors.pink.500/0.3)]",
            }

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`${feature.colSpan} group`}
              >
                <div className={`relative h-full p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 ${colorVariants[feature.color as keyof typeof colorVariants]} hover:scale-[1.02]`}>
                  <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${glowVariants[feature.color as keyof typeof glowVariants]}`}></div>
                  <div className="relative">
                    <div className={`mb-4 inline-block p-3 rounded-lg bg-${feature.color}-500/10`}>
                      <Icon className={`h-7 w-7 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-2 text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;