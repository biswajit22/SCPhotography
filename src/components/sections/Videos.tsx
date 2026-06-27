"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, Video as VideoIcon } from "lucide-react";
import { db, Video } from "@/lib/db";

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await db.getVideos();
      setVideos(data);
    };
    fetchVideos();
    
    // Listen to changes (for admin dashboard sync)
    const interval = setInterval(fetchVideos, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-secondary-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Motion Stories
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Cinematic Highlights
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((vid) => {
            // Auto YouTube high quality thumbnail URL
            const thumbUrl = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;
            return (

              <div
                key={vid.id}
                className="group relative rounded-2xl overflow-hidden border border-gold-accent/10 shadow-2xl bg-black cursor-pointer aspect-video"
                onClick={() => setActiveVideoId(vid.youtubeId)}
              >
                {/* Image Thumbnail */}
                <Image
                  src={thumbUrl}
                  alt={vid.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75"
                  sizes="(max-w-lg) 100vw, 800px"
                  unoptimized // Bypass Next.js image domain config for youtube domains
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary-bg/90 border-2 border-gold-accent flex items-center justify-center text-gold-accent transition-all duration-300 group-hover:scale-110 active:scale-95 shadow-lg glow-gold">
                    <Play className="w-6 h-6 fill-gold-accent ml-1" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-[10px] uppercase tracking-widest text-gold-accent font-semibold block mb-1">
                    {vid.category} Film
                  </span>
                  <h3 className="font-display text-lg text-white font-medium group-hover:text-gold-accent transition-colors duration-300">
                    {vid.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Lightbox Player */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveVideoId(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-gold-accent transition-colors z-50 p-2"
            aria-label="Close Video Player"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Iframe wrapper */}
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-gold-accent/20 shadow-2xl relative">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
