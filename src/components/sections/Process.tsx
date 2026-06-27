"use client";

import React from "react";
import { MessageSquare, CalendarRange, CheckCircle2, Camera, Wand2, HeartHandshake } from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Inquiry",
      icon: MessageSquare,
      desc: "Reach out via our WhatsApp or the Booking Form to share details about your event, location, and dates.",
    },
    {
      num: "02",
      title: "Consultation",
      icon: CalendarRange,
      desc: "We discuss your creative vision, custom requirements, timelines, and select the perfect package for you.",
    },
    {
      num: "03",
      title: "Booking Confirmation",
      icon: CheckCircle2,
      desc: "Confirm your shoot date with an advance payment and a signed agreement. Your date is locked exclusively.",
    },
    {
      num: "04",
      title: "Event Coverage",
      icon: Camera,
      desc: "Shayani and the team cover your big day with creative direction, capturing both candid moments and rituals.",
    },
    {
      num: "05",
      title: "Professional Editing",
      icon: Wand2,
      desc: "Each photo undergoes bespoke color grading, enhancement, and highlight reels are crafted with premium audio.",
    },
    {
      num: "06",
      title: "Delivery",
      icon: HeartHandshake,
      desc: "Access your digital showcase via a private online link. Hardbound layflat luxury albums are delivered shortly.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-primary-bg relative overflow-hidden">
      {/* Background highlight */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            The Journey
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Our Booking Process
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {/* Connector lines (Desktop) */}
          <div className="hidden lg:block absolute top-[110px] left-[15%] right-[15%] h-0.5 border-t border-dashed border-gold-accent/15 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl border border-gold-accent/5 flex flex-col items-center text-center relative z-10 hover:border-gold-accent/40 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Number Badge */}
                <span className="absolute top-4 right-6 font-display text-3xl text-gold-accent/10 font-bold tracking-widest select-none">
                  {step.num}
                </span>

                {/* Circle Icon */}
                <div className="w-16 h-16 rounded-full bg-primary-bg border-2 border-gold-accent flex items-center justify-center text-gold-accent mb-6 shadow-lg glow-gold">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display text-xl text-white font-medium mb-3">
                  {step.title}
                </h3>
                
                <p className="text-xs text-text-light/60 font-light leading-relaxed">
                  {step.desc}
                </p>

                {/* Direction indicator (except last item) */}
                {index < steps.length - 1 && (
                  <div className="mt-6 flex flex-col items-center lg:hidden">
                    <span className="text-gold-accent text-lg font-bold">&darr;</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
