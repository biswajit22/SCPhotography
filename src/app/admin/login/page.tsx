"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Camera, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If session already exists, redirect to admin dashboard
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("sc_photo_admin_session");
      if (session === "active") {
        router.push("/admin");
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("sc_photo_admin_session", "active");
        router.push("/admin");
      } else {
        setError("Invalid username or password. (Try admin / admin123)");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Brand logo */}
      <div className="mb-10 text-center relative z-10">
        <Link href="/" className="inline-flex items-center space-x-2 group">
          <Camera className="w-8 h-8 text-gold-accent" />
          <span className="font-display text-3xl tracking-[0.2em] font-semibold text-white">
            SC<span className="text-gold-accent">.</span>
          </span>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-text-light/50 pl-1">
            Studio
          </span>
        </Link>
        <span className="block text-[10px] uppercase tracking-[0.3em] text-gold-accent font-semibold mt-2">
          Management CMS Portal
        </span>
      </div>

      {/* Login Card */}
      <div className="glass-card w-full max-w-md p-8 md:p-10 rounded-3xl relative z-10 shadow-2xl">
        <h2 className="font-display text-xl text-white font-medium mb-6 text-center">
          Administrator Access
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-light/40">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#121213] border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-text-light/35"
                placeholder="E.g. admin"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-light/40">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#121213] border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-text-light/35"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 btn-gold rounded-xl text-xs font-semibold uppercase tracking-widest text-center block text-primary-bg disabled:opacity-50 mt-8"
          >
            {loading ? "Authenticating..." : "Sign In to CMS"}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-text-light/45">
          <p>Demo Username: <span className="text-gold-accent font-semibold">admin</span> &middot; Password: <span className="text-gold-accent font-semibold">admin123</span></p>
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="mt-8 text-xs text-text-light/50 hover:text-gold-accent transition-colors tracking-widest uppercase relative z-10"
      >
        &larr; Back to Website
      </Link>
    </div>
  );
}
