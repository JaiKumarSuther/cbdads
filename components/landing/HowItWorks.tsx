"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plug, ShieldHalf, GitCommit } from 'lucide-react';

const steps = [
  {
    icon: Plug,
    title: "Connect",
    description: "Plug in your workflows and data sources in minutes. Our seamless integrations make setup a breeze.",
  },
  {
    icon: ShieldHalf,
    title: "Govern",
    description: "Our AI surfaces risks, flags compliance drift, and automatically routes tasks to the right teams.",
  },
  {
    icon: GitCommit,
    title: "Trust",
    description: "Gain a full audit trail, dynamic compliance scores, and live status across your entire operation.",
  },
];

const HowItWorks = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section id="how-it-works" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Up and Running in Minutes
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            A simple, three-step process to achieve total governance.
          </p>
        </motion.div>

        <div ref={ref} className="mt-20 relative flex flex-col md:flex-row justify-between items-center">
          {/* Connecting Line SVG */}
          <div className="absolute top-1/2 left-0 w-full h-1/2 md:h-auto md:top-1/2 md:left-0 md:w-full transform -translate-y-1/2">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="hidden md:block">
              <motion.path
                d="M 0,50 L 1000,50"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(0)">
                  <stop offset="0%" stopColor="rgba(245, 158, 11, 0.1)" />
                  <stop offset="100%" stopColor="rgba(245, 158, 11, 1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center p-4 md:w-1/3 mb-12 md:mb-0"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-lg"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 bg-zinc-900 border-2 border-amber-500/30 rounded-full">
                    <div className="flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 max-w-xs">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;