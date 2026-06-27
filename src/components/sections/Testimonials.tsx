"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { db, Testimonial } from "@/lib/db";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<() => void>(() => {});

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await db.getTestimonials();
      setTestimonials(data);
    };
    fetchTestimonials();
    
    // Listen to changes (for admin dashboard sync)
    const interval = setInterval(fetchTestimonials, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  autoPlayRef.current = handleNext;

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const timer = setInterval(play, 5000);
    return () => clearInterval(timer);
  }, []);

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-secondary-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Kind Words
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Client Testimonials
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* Testimonial card slider */}
        <div className="relative">
          <Quote className="absolute -top-10 -left-6 w-20 h-20 text-gold-accent/5 pointer-events-none" />
          
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-gold-accent/10 relative shadow-2xl min-h-[300px] flex flex-col justify-between">
            {/* Stars */}
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold-accent fill-gold-accent" />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="font-display text-lg md:text-xl text-cream-accent/90 italic font-light leading-relaxed mb-8">
              &ldquo;{current.content}&rdquo;
            </p>

            {/* Client Bio */}
            <div className="flex items-center justify-between border-t border-text-light/10 pt-6">
              <div>
                <span className="font-display text-lg text-white font-semibold block">
                  {current.name}
                </span>
                <span className="text-xs text-text-light/50 uppercase tracking-widest block mt-0.5">
                  {current.role}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-gold-accent font-semibold uppercase tracking-wider">
                <span>Verified Client</span>
                <Star className="w-3.5 h-3.5 fill-gold-accent" />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center space-x-6 mt-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gold-accent/20 hover:border-gold-accent/80 hover:text-gold-accent flex items-center justify-center text-text-light transition-all active:scale-90"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "bg-gold-accent w-6"
                      : "bg-text-light/20 hover:bg-text-light/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gold-accent/20 hover:border-gold-accent/80 hover:text-gold-accent flex items-center justify-center text-text-light transition-all active:scale-90"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
