"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Calendar, Clock, Sparkles, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";

export default function Contact() {
  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    eventType: "Wedding",
    venue: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    "Wedding",
    "Pre Wedding",
    "Birthday Party",
    "Rice Ceremony (Annaprashan)",
    "Maternity Shoot",
    "Baby Shoot",
    "Family Portrait",
    "Corporate Event",
    "Fashion / Portfolio",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save contact request in Unified DB
      await db.addContactRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventDate: formData.eventDate,
        eventType: formData.eventType,
        venue: formData.venue,
        message: formData.message,
      });

      // 2. Save booking in Unified DB
      await db.addBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventType: formData.eventType,
        date: formData.eventDate,
        location: formData.venue,
        message: formData.message,
      });

      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventDate: "",
        eventType: "Wedding",
        venue: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setLoading(false);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
            Inquiries
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
            Let&apos;s Frame Your Story
          </h2>
          <div className="w-20 h-0.5 bg-gold-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Contact Info & Maps */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-white font-medium mb-4">
                Get In Touch
              </h3>
              
              <p className="text-text-light/70 text-sm font-light leading-relaxed">
                Have a date in mind? Want to check rates? Or simply want to discuss your storytelling vision? Reach out to us. We would love to collaborate.
              </p>

              {/* Direct channels */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-light/50 tracking-widest block">Call Shayani</span>
                    <a href="tel:+918910739773" className="text-sm text-white hover:text-gold-accent font-semibold transition-colors">
                      +91 89107 39773
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <MessageCircle className="w-5 h-5 fill-gold-accent/10" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-light/50 tracking-widest block">WhatsApp Us</span>
                    <a
                      href="https://wa.me/918910739773?text=Hi%20Shayani,%20I%20would%20like%20to%20book%20a%20session."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-gold-accent font-semibold transition-colors"
                    >
                      +91 89107 39773
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-light/50 tracking-widest block">Email Details</span>
                    <a href="mailto:shayanichakraborty2000@gmail.com" className="text-sm text-white hover:text-gold-accent font-semibold transition-colors break-all">
                      shayanichakraborty2000@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-light/50 tracking-widest block">Business Hours</span>
                    <span className="text-sm text-white font-semibold">
                      Open Everyday (24x7 Support)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-light/50 tracking-widest block">Location</span>
                    <span className="text-sm text-white font-semibold">
                      Kolkata, West Bengal, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map iframe */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border border-gold-accent/15 shadow-xl relative mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35242577716!2d88.26495066914565!3d22.535406437299066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SC Photography Kolkata Map"
                className="absolute inset-0 w-full h-full filter invert contrast-125 opacity-70"
              />
            </div>
          </div>

          {/* Right Side: Contact / Booking Form */}
          <div className="lg:col-span-7 bg-[#121213] border border-gold-accent/10 p-8 md:p-12 rounded-3xl shadow-2xl relative">
            <h3 className="font-display text-2xl text-white font-medium mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold-accent" />
              <span>Book Your Shoot</span>
            </h3>
            <p className="text-xs text-text-light/50 uppercase tracking-widest mb-8 border-b border-text-light/5 pb-4">
              Secure your date with our team
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white appearance-none cursor-pointer"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type} className="bg-secondary-bg text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                    Venue Location
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                    placeholder="E.g. Hyatt Regency Kolkata"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">
                  Special Notes / Detailed Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white resize-none"
                  placeholder="Share details about the event, timelines, required services..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 btn-gold rounded-xl text-xs font-semibold uppercase tracking-widest text-center block text-primary-bg disabled:opacity-50"
              >
                {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
              </button>

              {submitted && (
                <div className="p-4 bg-gold-accent/10 border border-gold-accent/30 text-gold-accent text-xs rounded-xl text-center animate-pulse">
                  Thank you! Your inquiry has been sent to Shayani Chakraborty. We will get back to you on WhatsApp / Email within 12 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
