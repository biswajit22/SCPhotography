import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import BeforeAfter from "@/components/BeforeAfter";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Packages from "@/components/sections/Packages";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Videos from "@/components/sections/Videos";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <BeforeAfter />
        <WhyChooseUs />
        <Packages />
        <Testimonials />
        <Process />
        <Videos />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
