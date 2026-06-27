"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { db, Package } from "@/lib/db";

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await db.getPackages();
      setPackages(data);
    };
    fetchPackages();

    // Listen to changes (for admin dashboard sync)
    const interval = setInterval(fetchPackages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="packages" className="py-24 bg-primary-bg relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Pricing Plans
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Investment Packages
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-text-light/70 text-sm md:text-base font-light leading-relaxed">
            Transparent pricing crafted for various event scales. All packages include raw photo delivery and a private online gallery.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`glass-card rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-500 ${
                pkg.isPopular
                  ? "border-gold-accent bg-gold-accent/5 scale-105 shadow-xl shadow-gold-accent/5"
                  : "border-text-light/5"
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-accent text-primary-bg text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Package Header */}
              <div>
                <h3 className="font-display text-2xl text-white font-semibold tracking-wide mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline space-x-1 mb-6 border-b border-text-light/10 pb-6">
                  <span className="text-2xl md:text-3xl font-display font-medium text-gold-accent">
                    {pkg.price}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3 text-xs text-text-light/80">
                      <Check className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquiry Button */}
              <div>
                <Link
                  href="#contact"
                  className={`w-full py-4.5 rounded-full text-xs font-semibold uppercase tracking-widest text-center block transition-all duration-300 ${
                    pkg.isPopular
                      ? "btn-gold text-primary-bg"
                      : "border border-gold-accent/40 text-white hover:bg-gold-accent/10"
                  }`}
                >
                  Contact for Quote
                </Link>
                
                <div className="flex items-center justify-center space-x-2 mt-4 text-[10px] text-text-light/40">
                  <Info className="w-3.5 h-3.5" />
                  <span>Prices may vary based on customization</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
