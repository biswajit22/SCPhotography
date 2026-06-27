"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // React touch event handlers for seamless mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <section className="py-24 bg-[#0F0F10] border-t border-gold-accent/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            The Magic of Editing
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Raw vs. Professional Edit
          </h2>
          <p className="max-w-2xl mx-auto text-text-light/70 text-sm md:text-base font-light leading-relaxed">
            Drag the gold slider below to see how our bespoke post-processing color grading elevates raw camera captures into breath-taking visual masterpieces.
          </p>
        </div>

        {/* Comparison Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[300px] sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-gold-accent/20 shadow-2xl"
          style={{ touchAction: "none" }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
          onTouchCancel={() => setIsDragging(false)}
        >
          {/* Before Image (Raw) - Full Width under */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/raw.png"
              alt="Raw unedited photograph"
              fill
              className="object-cover"
              sizes="(max-w-5xl) 100vw, 1000px"
              priority
              draggable={false}
            />
            {/* Label */}
            <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-white/80 font-medium">
              Camera RAW
            </span>
          </div>

          {/* After Image (Edited) - Clipped overlapping */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <Image
              src="/images/edited.png"
              alt="Professionally color-graded photograph"
              fill
              className="object-cover"
              sizes="(max-w-5xl) 100vw, 1000px"
              priority
              draggable={false}
            />
            {/* Label */}
            <span className="absolute bottom-4 right-4 bg-gold-accent/80 backdrop-blur-md border border-gold-accent px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-primary-bg font-semibold">
              SC Signature Edit
            </span>
          </div>

          {/* Slider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gold-accent cursor-ew-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-bg border-2 border-gold-accent flex items-center justify-center shadow-lg shadow-black/50 glow-gold transition-transform hover:scale-110 active:scale-95">
              {/* Slider Arrows */}
              <div className="flex space-x-1">
                <span className="text-gold-accent font-semibold text-xs">&larr;</span>
                <span className="text-gold-accent font-semibold text-xs">&rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
