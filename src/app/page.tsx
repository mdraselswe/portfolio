"use client";

import Loading from "@/components/atoms/Loading";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { Suspense, lazy } from "@/lib";

// Lazy load major sections
const Hero = lazy(() => import("@/components/organisms/Hero"));
const Skills = lazy(() => import("@/components/organisms/Skills"));
const Projects = lazy(() => import("@/components/organisms/Projects"));
const Contact = lazy(() => import("@/components/organisms/Contact"));

export default function Home() {
  return (
    <main>
      <Header />
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
      <Footer />
    </main>
  );
}
