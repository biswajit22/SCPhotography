"use client";

import React from "react";
import {
  Wand2,
  Camera,
  BookOpen,
  Heart,
  Zap,
  Tag,
  Users,
  Wind,
  Film,
  Sparkles,
  Smile,
  ShieldCheck,
} from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Professional Editing",
      icon: Wand2,
      desc: "Bespoke color grading and skin correction that maintains the natural texture while adding luxury warmth.",
    },
    {
      title: "Premium Camera Equipment",
      icon: Camera,
      desc: "Using industry-leading high-resolution full-frame cameras, prime lenses, and professional flash syncs.",
    },
    {
      title: "Creative Storytelling",
      icon: BookOpen,
      desc: "We don't just snap photographs; we document the narrative of your love, detailing small micro-expressions.",
    },
    {
      title: "Natural Candid Photography",
      icon: Heart,
      desc: "Capturing unscripted, raw emotional moments, belly laughs, and tears of joy without intrusive posing.",
    },
    {
      title: "Fast Delivery",
      icon: Zap,
      desc: "Sneak peeks within 48 hours of the event and the complete high-resolution gallery delivered within 4 weeks.",
    },
    {
      title: "Affordable Packages",
      icon: Tag,
      desc: "Luxury photography doesn't have to be overpriced. We offer custom premium packages tailored to budgets.",
    },
    {
      title: "Experienced Team",
      icon: Users,
      desc: "Our creative photographers work in harmony, knowing exactly where to stand during complex traditional rituals.",
    },
    {
      title: "Drone Photography",
      icon: Wind,
      desc: "Cinematic, high-definition aerial perspectives capturing the grand scale of your wedding and venues.",
    },
    {
      title: "4K Cinematic Video",
      icon: Film,
      desc: "Netflix-standard wedding film production with professional sound design, slow-mo, and master grading.",
    },
    {
      title: "Creative Direction",
      icon: Sparkles,
      desc: "Guiding you through poses naturally, making you feel completely at ease even if you are camera-shy.",
    },
    {
      title: "Unlimited Memories",
      icon: Smile,
      desc: "We do not place caps on the number of photos we take; every beautiful moment is captured and delivered.",
    },
    {
      title: "Uncompromising Trust",
      icon: ShieldCheck,
      desc: "A registered professional studio based in Kolkata with over 300 successful stories and client reviews.",
    },
  ];

  return (
    <section className="py-24 bg-secondary-bg relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Our Standards
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Why Choose SC Photography
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl border border-gold-accent/5 flex flex-col items-start transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-accent/10 border border-gold-accent/25 flex items-center justify-center text-gold-accent mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg text-white font-medium mb-3">
                  {point.title}
                </h3>
                <p className="text-xs text-text-light/60 font-light leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
