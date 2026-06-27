"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Camera } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Packages", href: "#packages" },
    { name: "Process", href: "#process" },
    { name: "Blog", href: "#blog" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-nav py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Camera className="w-8 h-8 text-gold-accent transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-display text-2xl tracking-[0.2em] font-semibold text-white group-hover:text-gold-accent transition-colors">
            SC<span className="text-gold-accent">.</span>
          </span>
          <span className="hidden sm:inline font-body text-xs tracking-[0.3em] uppercase text-text-light/60 pl-1">
            Photography
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-light hover:text-gold-accent tracking-wider uppercase transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            href="#contact"
            className="btn-gold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-primary-bg font-semibold font-body"
          >
            Book Shoot
          </Link>
          
          <Link
            href="/admin"
            className="text-xs uppercase tracking-widest text-text-light/50 hover:text-gold-accent transition-colors border border-text-light/20 hover:border-gold-accent/40 rounded-full px-3 py-1"
          >
            CMS
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-widest text-text-light/50 hover:text-gold-accent transition-colors border border-text-light/20 rounded-full px-3 py-1"
          >
            CMS
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gold-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-secondary-bg/95 backdrop-blur-xl border-l border-gold-accent/10 p-8 shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-display text-2xl tracking-[0.2em] font-semibold text-white">
            SC<span className="text-gold-accent">.</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gold-accent transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-text-light hover:text-gold-accent tracking-wider uppercase transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="btn-gold text-center py-3 rounded-full text-sm uppercase tracking-widest text-primary-bg font-semibold"
          >
            Book Shoot
          </Link>
        </div>
      </div>
    </nav>
  );
}
