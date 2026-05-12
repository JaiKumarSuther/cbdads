import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const productLinks = ["Features", "Pricing", "Integrations", "Changelog"];
  const companyLinks = ["About Us", "Careers", "Contact", "Blog"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-zinc-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative">
          <div className="absolute -top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
              CBDADS
            </Link>
            <p className="mt-4 text-sm text-zinc-400 max-w-xs">
              The Governance Platform for Decentralized Systems.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-300">Product</h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-300">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-300">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-zinc-500 order-2 sm:order-1 mt-4 sm:mt-0">
            © {new Date().getFullYear()} CBDADS Inc. Built for compliance teams worldwide.
          </p>
          <div className="flex space-x-6 order-1 sm:order-2">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              <FaTwitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              <FaGithub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;