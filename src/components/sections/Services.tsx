"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
  title: string;
  image: string;
  subservices: string[];
  description: string;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: "Traditional Bengali Weddings",
      image: "/images/hero_2.png",
      subservices: ["Subho Drishti & Mala Bodol", "Sindoor Daan & Saptapadi", "Biye & Boubhat Rituals"],
      description: "Documenting the rich cultural heritage, vibrant colors, and sacred rituals of traditional Bengali weddings.",
    },
    {
      title: "Candid & Destination Weddings",
      image: "/images/hero_1.png",
      subservices: ["Natural Candid Storytelling", "High-End Destination Coverage", "Cinematography & Teasers"],
      description: "Unobtrusive documentary wedding photography catching raw emotions, laughter, and grand scales across India.",
    },
    {
      title: "Pre-Wedding & Couple Shoots",
      image: "/images/hero_3.png",
      subservices: ["Kolkata Heritage Locations", "Creative Couple Direction", "Romantic Cinematic Reels"],
      description: "Visualizing your unique chemistry in gorgeous frames at iconic monuments and sunset riverbanks.",
    },
    {
      title: "Annaprashan & Baby Shoots",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800",
      subservices: ["Rice Ceremony Coverage", "Baby Portraits", "First Birthday Parties"],
      description: "Patience-led child photography capturing baby smiles, innocence, and family blessings during milestones.",
    },
    {
      title: "Maternity & Baby Showers",
      image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=800",
      subservices: ["Outdoor Maternity Portraits", "Baby Shower Events", "Family Portrait Sessions"],
      description: "Capturing the radiant glow of motherhood and the excitement of welcoming a new family member.",
    },
    {
      title: "Fashion & Corporate Portraits",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
      subservices: ["Outdoor Model Portfolios", "Corporate Event Coverage", "Professional Headshots"],
      description: "High-quality corporate event coverage and sharp, modern portfolios highlighting style and elegance.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary-bg relative">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Signature Services
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-text-light/70 text-sm md:text-base font-light leading-relaxed">
            From grand celebrations to intimate moments, our cameras capture raw emotions, vibrant traditions, and elegant storytelling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-64 w-full overflow-hidden border-b border-gold-accent/10">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                  sizes="(max-w-md) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-bg/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-display text-xl text-white font-medium mb-3 group-hover:text-gold-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs text-text-light/60 font-light mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>

                {/* Sub-services list */}
                <div className="border-t border-text-light/10 pt-4 mb-6">
                  <ul className="space-y-2">
                    {service.subservices.map((sub, idx) => (
                      <li key={idx} className="text-xs text-text-light/80 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/60" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Button */}
                <Link
                  href="#contact"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-accent hover:text-white transition-colors duration-300 font-semibold group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
