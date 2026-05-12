"use client";

import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative rounded-2xl p-12 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-lg"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] opacity-50"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Govern with Confidence?
            </h2>
            <p className="mt-4 text-lg text-zinc-300 max-w-2xl mx-auto">
              Join the waitlist and be the first to experience the future of compliance and governance.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-grow px-4 py-3 text-sm text-white bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-md hover:scale-105 transition-transform"
              >
                Get Early Access
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;