"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 490 },
    description: "For small teams getting started with governance.",
    features: [
      "Up to 5 users",
      "Core Governance Modules",
      "Basic Reporting",
      "Community Support",
    ],
    isPopular: false,
  },
  {
    name: "Pro",
    price: { monthly: 149, annual: 1490 },
    description: "For growing teams that need advanced features.",
    features: [
      "Up to 20 users",
      "All Starter features",
      "AI-Powered Risk Detection",
      "Advanced Analytics",
      "Priority Support",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    description: "For large organizations with complex needs.",
    features: [
      "Unlimited users",
      "All Pro features",
      "Dedicated Account Manager",
      "On-premise option",
      "Custom Integrations",
    ],
    isPopular: false,
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Choose the plan that's right for your team.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center items-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-zinc-400'}`}>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} className="sr-only peer" />
            <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-zinc-400'}`}>Annual</span>
          <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
            20% OFF
          </span>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                tier.isPopular 
                  ? 'border-amber-500/50 bg-zinc-900 scale-105' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {tier.isPopular && (
                <>
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent blur-lg"></div>
                  <div className="absolute top-0 right-8 -mt-3">
                    <span className="inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                      MOST POPULAR
                    </span>
                  </div>
                </>
              )}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <p className="mt-4 text-zinc-400 text-sm">{tier.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-white">
                    {typeof tier.price.monthly === 'number' ? `$${isAnnual ? tier.price.annual / 10 : tier.price.monthly}` : 'Custom'}
                  </span>
                  {typeof tier.price.monthly === 'number' && (
                    <span className="text-sm font-medium text-zinc-400">/ {isAnnual ? 'year' : 'month'}</span>
                  )}
                </p>
                <a
                  href="/login"
                  className={`mt-8 block w-full py-2 text-sm font-semibold text-center rounded-md transition-colors ${
                    tier.isPopular
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </a>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-emerald-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;