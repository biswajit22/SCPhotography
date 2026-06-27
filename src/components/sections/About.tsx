"use client";

import React from "react";
import Image from "next/image";
import { Award, Camera, Heart, CheckCircle } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Happy Clients", value: "300+", icon: Heart },
    { label: "Events Covered", value: "600+", icon: Camera },
    { label: "Years Experience", value: "5+", icon: Award },
    { label: "Satisfaction", value: "100%", icon: CheckCircle },
  ];

  return (
    <section id="about" className="py-24 bg-primary-bg relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Portrait Container */}
          <div className="lg:col-span-5 relative group flex justify-center">
            {/* Elegant luxury gold outline frames */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold-accent/25 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-accent/25 rounded-2xl -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            
            <div className="relative w-[300px] sm:w-[350px] md:w-[400px] h-[450px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gold-accent/15">
              <Image
                src="/images/shayani.png"
                alt="Shayani Chakraborty"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-md) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
                Meet The Storyteller
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
                Hi, I&apos;m Shayani Chakraborty
              </h2>
              <div className="w-20 h-0.5 bg-gold-accent" />
            </div>

            <p className="font-display text-xl italic text-cream-accent/90 font-light leading-relaxed">
              &ldquo;Photography isn&apos;t simply taking pictures. It&apos;s preserving emotions, traditions, smiles, and memories that become priceless over time.&rdquo;
            </p>

            <div className="space-y-6 text-text-light/80 text-sm md:text-base font-light leading-relaxed">
              <p>
                At SC Photography, every wedding, every birthday, and every family celebration is captured with creativity, emotion, and elegance. I believe that photographs are portals to your past, holding the magic of your most precious moments forever.
              </p>
              <p>
                Whether it&apos;s a grand traditional Bengali wedding with its vibrant red colors and sacred rituals, or a small intimate family gathering, my mission is to tell your story in its truest, most beautiful form. Based in Kolkata, West Bengal, we travel nationwide to capture love stories.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="glass-card p-5 rounded-xl text-center flex flex-col items-center justify-center border border-gold-accent/10"
                  >
                    <IconComponent className="w-6 h-6 text-gold-accent mb-3 opacity-80" />
                    <span className="font-display text-2xl md:text-3xl font-semibold text-white tracking-wide block mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] md:text-xs text-text-light/60 uppercase tracking-widest block">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
