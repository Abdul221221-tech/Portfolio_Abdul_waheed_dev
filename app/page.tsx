"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Chatbot from "@/components/Chatbot";
import FloatingIcons from "@/components/FloatingIcons";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor />
      <FloatingIcons />

      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}

      <main className={`flex min-h-screen flex-col items-center justify-between transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {!loading && <Chatbot />}
    </>
  );
}
