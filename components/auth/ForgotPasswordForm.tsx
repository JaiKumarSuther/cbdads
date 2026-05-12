"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isSubmitted) {
    return (
        <motion.div variants={formVariants} initial="hidden" animate="show" className="text-center">
            <motion.div variants={itemVariants}>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-emerald-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white">Check your email</h2>
                <p className="mt-2 text-sm text-zinc-400">
                    We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-8">
                <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-500">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Sign In
                </Link>
            </motion.div>
        </motion.div>
    )
  }

  return (
    <motion.div variants={formVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-white">Forgot Password?</h2>
        <p className="mt-2 text-sm text-zinc-400">
          No worries, we'll send you reset instructions.
        </p>
      </motion.div>

      <motion.form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <motion.div variants={itemVariants} className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-3 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 focus:outline-none transition-all"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 shadow-lg shadow-amber-500/10"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </motion.div>
      </motion.form>

      <motion.p variants={itemVariants} className="mt-8 text-center">
        <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-500">
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default ForgotPasswordForm;