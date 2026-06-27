"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, X } from "lucide-react";
import { db, Blog } from "@/lib/db";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await db.getBlogs();
      setBlogs(data);
    };
    fetchBlogs();

    // Listen to changes (for admin dashboard sync)
    const interval = setInterval(fetchBlogs, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="blog" className="py-24 bg-primary-bg relative overflow-hidden">
      {/* Background highlight */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Journal
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Latest Articles &amp; Inspiration
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full cursor-pointer border border-gold-accent/5 hover:border-gold-accent/30"
              onClick={() => setActiveBlog(blog)}
            >
              {/* Image cover */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-md) 100vw, 400px"
                  unoptimized={blog.coverImage.startsWith("http")}
                />
                <span className="absolute top-4 left-4 bg-gold-accent text-primary-bg text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center space-x-4 text-[10px] text-text-light/50 uppercase tracking-widest mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-accent/70" />
                    <span>{blog.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-gold-accent/70" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                <h3 className="font-display text-lg text-white font-medium mb-3 group-hover:text-gold-accent transition-colors duration-300">
                  {blog.title}
                </h3>

                <p className="text-xs text-text-light/70 font-light mb-6 flex-grow leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>

                {/* Read More link */}
                <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-accent font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {activeBlog && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-secondary-bg border border-gold-accent/15 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveBlog(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-gold-accent transition-colors z-50 p-2 bg-primary-bg rounded-full border border-gold-accent/10"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Banner Image */}
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={activeBlog.coverImage}
                alt={activeBlog.title}
                fill
                className="object-cover brightness-[0.7]"
                sizes="100vw"
                unoptimized={activeBlog.coverImage.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-bg to-transparent" />
              <span className="absolute bottom-6 left-8 bg-gold-accent text-primary-bg text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                {activeBlog.category}
              </span>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12 space-y-8">
              <div>
                {/* Meta details */}
                <div className="flex items-center space-x-6 text-xs text-text-light/50 uppercase tracking-widest mb-4">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gold-accent" />
                    <span>{activeBlog.date}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gold-accent" />
                    <span>{activeBlog.readTime}</span>
                  </span>
                  <span className="font-semibold text-gold-accent">By Shayani Chakraborty</span>
                </div>

                <h1 className="font-display text-2xl md:text-4xl text-white font-medium leading-snug">
                  {activeBlog.title}
                </h1>
              </div>

              <div className="w-20 h-0.5 bg-gold-accent" />

              {/* Body Content */}
              <div className="text-text-light/95 font-light leading-relaxed text-sm md:text-base space-y-6 whitespace-pre-line">
                {activeBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
