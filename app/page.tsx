import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LiveStats from "@/components/landing/LiveStats";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import TrustedBy from "@/components/landing/TrustedBy";
import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <LiveStats />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
