"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const faqs: FaqItem[] = [
    {
      q: "How do I book SC Photography for my event?",
      a: "Booking is simple. Reach out to us via our online Booking Form, call/WhatsApp us directly at +91 89107 39773, or email shayanichakraborty2000@gmail.com. We will set up a quick consultation to finalize details and secure your date.",
    },
    {
      q: "How much advance payment is required to lock the date?",
      a: "We require a 30% non-refundable advance payment along with a signed contract to reserve your wedding or event date. The remaining 50% is payable on the event day, and the final 20% is due during digital draft approval.",
    },
    {
      q: "When will we receive our photos and videos?",
      a: "We deliver a 'sneak peek' selection of 15-20 edited photos within 48 hours of your event so you can share them. The complete high-resolution digital gallery is delivered within 4 weeks. Custom leather album shipments usually take an additional 2-3 weeks.",
    },
    {
      q: "Are you available to travel for destination weddings?",
      a: "Yes! While we are based in Kolkata, West Bengal, our team travels all over India and internationally for destination shoots. Travel and accommodation fees are billed directly or covered by the client depending on the package.",
    },
    {
      q: "How many photographers and videographers will cover our event?",
      a: "Our crew sizes depend entirely on your selected package. It ranges from a 2-person team for intimate ceremonies (1 traditional photographer + 1 traditional videographer) to a 6-person premium crew for grand weddings (lead candid photographer, secondary photographer, cinematic director, drone specialist, and focus puller).",
    },
    {
      q: "Is drone photography available, and do you film in 4K?",
      a: "Yes, drone aerial cinematography is included in our Gold and Platinum packages and is available as an add-on for the Silver package. All of our wedding films, teasers, and highlight videos are captured and rendered in full professional 4K UHD.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0F0F10] relative overflow-hidden">
      {/* Background highlight */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Information
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-gold-accent/5 transition-all duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-display text-sm md:text-base text-white hover:text-gold-accent transition-colors font-medium">
                    {faq.q}
                  </span>
                  <div className="ml-4 shrink-0 w-8 h-8 rounded-full border border-gold-accent/20 flex items-center justify-center text-gold-accent bg-secondary-bg">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] border-t border-text-light/5" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5 md:px-8 md:py-6 text-xs md:text-sm text-text-light/70 font-light leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
