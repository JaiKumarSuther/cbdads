"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On success, redirect. For now, just log.
      console.log("Login successful");
      window.location.href = '/app';
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

  return (
    <motion.div variants={formVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-sm font-medium text-amber-400">Welcome back</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Sign in to CBDADS</h2>
        <p className="mt-2 text-sm text-zinc-400">Your governance platform awaits.</p>
      </motion.div>

      <motion.form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <motion.div variants={itemVariants} className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full pl-10 pr-4 py-3 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 focus:outline-none transition-all"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            className="w-full pl-10 pr-10 py-3 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 focus:outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500" />
            <label htmlFor="remember-me" className="text-zinc-400">Remember me</label>
          </div>
          <Link href="/auth/forgot-password" className="font-medium text-amber-400 hover:text-amber-500">
            Forgot password?
          </Link>
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
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </motion.div>
      </motion.form>

      <motion.div variants={itemVariants} className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-zinc-900 px-2 text-zinc-500">or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-white/10 hover:bg-white/10 transition-colors">
            <FaGoogle className="h-4 w-4" />
            Google
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-white/10 hover:bg-white/10 transition-colors">
            <FaMicrosoft className="h-4 w-4" />
            Microsoft
          </button>
        </div>
      </motion.div>

      <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-zinc-400">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-amber-400 hover:text-amber-500">
          Sign up &rarr;
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default LoginForm;