"use client";

import Contact from "@/components/organisms/Contact";
import Hero from "@/components/organisms/Hero";
import Projects from "@/components/organisms/Projects";
import Skills from "@/components/organisms/Skills";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
