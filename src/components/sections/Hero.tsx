"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";

export default function Hero() {
  const images = [
    "/images/hero_1.png",
    "/images/hero_2.png",
    "/images/hero_3.png",
    "/images/hero_4.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Autoplay Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt="Cinematic Wedding Slideshow"
              fill
              className="object-cover object-center filter brightness-[0.7] saturate-[0.9]"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-black/45 to-black/60 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mt-16 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-accent text-xs md:text-sm tracking-[0.4em] uppercase block mb-6 font-semibold font-body"
        >
          Shayani Chakraborty Photography
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-wide text-white leading-[1.15] mb-8"
        >
          Every Love Story Deserves to be{" "}
          <span className="italic text-gold-accent font-light">Remembered</span>{" "}
          Forever.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-text-light/80 text-sm md:text-lg tracking-widest uppercase mb-12 font-light"
        >
          Luxury Wedding &amp; Event Photography in Kolkata
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="#contact"
            className="btn-gold px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-widest text-primary-bg shadow-lg hover:shadow-gold-accent/25 w-full sm:w-auto"
          >
            Book Your Shoot
          </Link>
          <Link
            href="#portfolio"
            className="px-10 py-4 border border-gold-accent/40 rounded-full text-xs font-semibold uppercase tracking-widest text-white hover:bg-gold-accent/10 hover:border-gold-accent transition-all duration-300 w-full sm:w-auto text-center"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/918910739773?text=Hi%20Shayani,%20I%20would%20like%20to%20inquire%20about%20a%20photography%20shoot."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 hover:shadow-[#25D366]/40 flex items-center justify-center group"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-semibold tracking-wider uppercase pl-0 group-hover:pl-2 whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* Scroll Down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none opacity-80">
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-light/50 font-body">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-gold-accent" />
        </motion.div>
      </div>
    </section>
  );
}
