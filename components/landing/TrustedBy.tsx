"use client";

import React from 'react';

const companies = [
  "Axiom Legal", "NovaTrust", "VeritasGroup", "Nexgen Compliance", 
  "Meridian Corp", "BlueLedger", "Solaris GRC", "Pinnacle Law", 
  "DataGuard", "TerraCompliance"
];

const TrustedBy = () => {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm font-semibold text-zinc-400 tracking-wider">
          Trusted by compliance teams at
        </h2>
        <div className="mt-8 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
          <div className="animate-infinite-scroll flex space-x-16">
            {[...companies, ...companies].map((company, index) => (
              <div key={index} className="flex-shrink-0 text-2xl font-medium text-zinc-500 whitespace-nowrap">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;