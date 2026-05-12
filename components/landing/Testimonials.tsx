"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "CBDADS transformed our compliance workflow. What used to take weeks now takes hours. It's a game-changer.",
    name: "Sarah J.",
    role: "Chief Compliance Officer",
    company: "VeritasGroup",
    avatar: "SJ",
  },
  {
    quote: "The real-time monitoring is incredible. We catch potential issues before they become problems.",
    name: "Michael B.",
    role: "Head of Legal Ops",
    company: "Axiom Legal",
    avatar: "MB",
  },
  {
    quote: "Finally, a single source of truth for governance. The Codex Ledger is our immutable shield.",
    name: "Emily C.",
    role: "Director of GRC",
    company: "Solaris GRC",
    avatar: "EC",
  },
  {
    quote: "Onboarding was seamless, and the platform is incredibly intuitive. Our team loves it.",
    name: "David L.",
    role: "IT Governance Manager",
    company: "NovaTrust",
    avatar: "DL",
  },
  {
    quote: "The ability to see our entire governance landscape in one place is priceless. Highly recommended.",
    name: "Jessica W.",
    role: "General Counsel",
    company: "Pinnacle Law",
    avatar: "JW",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by Governance Leaders
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            See what compliance and legal experts are saying about CBDADS.
          </p>
        </motion.div>

        <div className="mt-16 relative h-80 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full max-w-3xl"
            >
              <div className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xl text-white italic">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-zinc-400">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentIndex === index ? 'bg-amber-500' : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;