"use client";

import React from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { TrendingUp, Server, Database, ShieldAlert } from 'lucide-react';

const stats = [
  {
    value: 99.8,
    label: "Uptime",
    icon: Server,
    suffix: "%",
    color: "amber"
  },
  {
    value: 50000,
    label: "Records Governed",
    icon: Database,
    suffix: "+",
    color: "cyan"
  },
  {
    value: 41,
    label: "Live Alerts Monitored",
    icon: ShieldAlert,
    suffix: "",
    color: "emerald"
  },
  {
    value: 100,
    label: "Admin Compliance",
    icon: TrendingUp,
    suffix: "%",
    color: "purple"
  },
];

const AnimatedCounter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { damping: 50, stiffness: 200 });

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  React.useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const LiveStats = () => {
  return (
    <section className="py-24 bg-zinc-900 relative">
      <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorVariants = {
              amber: "border-amber-500/50",
              cyan: "border-cyan-500/50",
              emerald: "border-emerald-500/50",
              purple: "border-purple-500/50",
            };
            const glowVariants = {
                amber: "shadow-[0_0_15px_theme(colors.amber.500/0.2)]",
                cyan: "shadow-[0_0_15px_theme(colors.cyan.500/0.2)]",
                emerald: "shadow-[0_0_15px_theme(colors.emerald.500/0.2)]",
                purple: "shadow-[0_0_15px_theme(colors.purple.500/0.2)]",
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 bg-white/5 rounded-2xl border ${colorVariants[stat.color as keyof typeof colorVariants]} backdrop-blur-sm ${glowVariants[stat.color as keyof typeof glowVariants]}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-300">{stat.label}</p>
                  <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                </div>
                <p className="mt-4 text-4xl font-bold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveStats;