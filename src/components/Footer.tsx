"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

// Inline Custom Brand Icons for Lucide compatibility
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-secondary-bg border-t border-gold-accent/15 pt-20 pb-8 text-text-light font-body">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <span className="font-display text-3xl tracking-[0.2em] font-semibold text-white">
              SC<span className="text-gold-accent">.</span>
            </span>
            <span className="block font-body text-xs tracking-[0.35em] uppercase text-gold-accent mt-1">
              Photography
            </span>
          </Link>
          <p className="text-sm text-text-light/70 leading-relaxed font-light">
            &ldquo;Preserving Your Precious Memories Forever&rdquo;
          </p>
          <p className="text-sm text-text-light/70 leading-relaxed font-light">
            Luxury wedding and lifestyle photography based in Kolkata, capturing timeless stories with deep emotions.
          </p>
          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://www.youtube.com/@photographywithshayani"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-text-light/20 flex items-center justify-center hover:border-gold-accent hover:text-gold-accent transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/SCPhotography"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-text-light/20 flex items-center justify-center hover:border-gold-accent hover:text-gold-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-text-light/20 flex items-center justify-center hover:border-gold-accent hover:text-gold-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase border-l-2 border-gold-accent pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#about" className="hover:text-gold-accent transition-colors">
                About Shayani
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-gold-accent transition-colors">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="#portfolio" className="hover:text-gold-accent transition-colors">
                Photo Gallery
              </Link>
            </li>
            <li>
              <Link href="#packages" className="hover:text-gold-accent transition-colors">
                Packages & Pricing
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold-accent transition-colors">
                Admin Panel (CMS)
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="space-y-6">
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase border-l-2 border-gold-accent pl-3">
            Our Expertise
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-gold-accent transition-colors">Bengali Weddings</li>
            <li className="hover:text-gold-accent transition-colors">Pre-Wedding Shoots</li>
            <li className="hover:text-gold-accent transition-colors">Candid Photography</li>
            <li className="hover:text-gold-accent transition-colors">Rice Ceremonies</li>
            <li className="hover:text-gold-accent transition-colors">Maternity & Baby Shoots</li>
          </ul>
        </div>

        {/* Contacts & Newsletter */}
        <div className="space-y-6">
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase border-l-2 border-gold-accent pl-3">
            Get In Touch
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
              <span>Kolkata, West Bengal, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gold-accent shrink-0" />
              <a href="tel:+918910739773" className="hover:text-gold-accent transition-colors">
                +91 89107 39773
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gold-accent shrink-0" />
              <a href="mailto:shayanichakraborty2000@gmail.com" className="hover:text-gold-accent transition-colors break-all">
                shayanichakraborty2000@gmail.com
              </a>
            </li>
          </ul>

          <div className="pt-2">
            <h5 className="text-xs uppercase tracking-widest text-white font-semibold mb-3">
              Newsletter
            </h5>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0F0F10] border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-2.5 rounded-full text-white placeholder-text-light/40"
              />
              <button
                type="submit"
                className="absolute right-1 w-8 h-8 rounded-full bg-gold-accent text-primary-bg flex items-center justify-center hover:bg-gold-accent/80 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-gold-accent mt-2 animate-pulse">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-text-light/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-light/50">
        <p>&copy; {new Date().getFullYear()} SC Photography. All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0">
          Crafted with passion for storytelling &middot; Based in Kolkata
        </p>
      </div>
    </footer>
  );
}
