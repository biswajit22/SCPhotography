"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, ShieldAlert } from "lucide-react";
import { db, Photo } from "@/lib/db";

export default function Portfolio() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showWarning, setShowWarning] = useState(false);

  // Fetch photos from Unified DB
  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await db.getPhotos();
      setPhotos(data);
    };
    fetchPhotos();
    
    // Listen to changes (for admin dashboard sync)
    const interval = setInterval(fetchPhotos, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter photos by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase()));
    }
  }, [activeCategory, photos]);

  // Categories list
  const categories = [
    { id: "all", label: "All Works" },
    { id: "wedding", label: "Wedding" },
    { id: "bride", label: "Bride" },
    { id: "groom", label: "Groom" },
    { id: "pre-wedding", label: "Pre Wedding" },
    { id: "birthday", label: "Birthday" },
    { id: "maternity", label: "Maternity" },
    { id: "baby", label: "Baby & Kids" },
    { id: "traditional", label: "Traditional" },
    { id: "couple", label: "Couple" },
    { id: "family", label: "Family" },
  ];

  // Disable download (Right click handler)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1200);
  };

  return (
    <section id="portfolio" className="py-24 bg-primary-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Copy protection alert */}
      {showWarning && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/90 border border-gold-accent/30 text-gold-accent px-6 py-3 rounded-full text-xs uppercase tracking-wider flex items-center space-x-2 z-50 shadow-2xl animate-bounce">
          <ShieldAlert className="w-4 h-4" />
          <span>Image Protection Enabled. Downloads are restricted.</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Visual Stories
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Bespoke Portfolio
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto mb-8" />
        </div>

        {/* Categories Menu */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setVisibleCount(6);
              }}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest border transition-all duration-300 font-medium ${
                activeCategory === cat.id
                  ? "bg-gold-accent text-primary-bg border-gold-accent shadow-lg shadow-gold-accent/15"
                  : "border-text-light/10 text-text-light hover:border-gold-accent/40 hover:text-gold-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPhotos.slice(0, visibleCount).map((photo, idx) => (
            <div
              key={photo.id}
              className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-gold-accent/5 hover:border-gold-accent/30 transition-all duration-500 shadow-lg cursor-pointer"
              onContextMenu={handleContextMenu}
              onClick={() => setLightboxIndex(idx)}
            >
              {/* Image protection overlay - prevents drag and download */}
              <div className="absolute inset-0 z-10 pointer-events-auto bg-transparent" />
              
              <Image
                src={photo.url}
                alt={photo.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-md) 100vw, 400px"
                draggable={false}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-gold-accent text-[10px] uppercase tracking-widest font-semibold block mb-1">
                      {photo.category}
                    </span>
                    <h3 className="font-display text-lg text-white font-medium">
                      {photo.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gold-accent/40 flex items-center justify-center text-gold-accent bg-primary-bg/85 group-hover:scale-110 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 border border-dashed border-text-light/10 rounded-2xl">
            <p className="text-text-light/50 text-sm">No photos found in this category.</p>
          </div>
        )}

        {/* Infinite Loading Button */}
        {filteredPhotos.length > visibleCount && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 border border-gold-accent/40 rounded-full text-xs font-semibold uppercase tracking-widest text-white hover:bg-gold-accent/10 hover:border-gold-accent transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Loading Masterpieces..." : "Load More Works"}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-gold-accent transition-colors z-50 p-2"
            aria-label="Close Preview"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 text-white/50 hover:text-gold-accent transition-colors z-40 p-3 bg-secondary-bg/50 rounded-full"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 text-white/50 hover:text-gold-accent transition-colors z-40 p-3 bg-secondary-bg/50 rounded-full"
            aria-label="Next Image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Content Area */}
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center" onContextMenu={handleContextMenu}>
            <div className="absolute inset-0 z-10 pointer-events-auto bg-transparent" />
            <div className="relative w-full h-full">
              <Image
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="(max-w-5xl) 100vw, 1000px"
                draggable={false}
              />
            </div>
          </div>

          {/* Captions and details */}
          <div className="mt-6 text-center max-w-lg">
            <span className="text-gold-accent text-xs uppercase tracking-[0.2em] font-semibold block mb-1">
              {filteredPhotos[lightboxIndex].category}
            </span>
            <h3 className="font-display text-xl text-white font-medium mb-2">
              {filteredPhotos[lightboxIndex].title}
            </h3>
            {filteredPhotos[lightboxIndex].description && (
              <p className="text-text-light/70 text-xs font-light">
                {filteredPhotos[lightboxIndex].description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
