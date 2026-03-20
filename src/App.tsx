import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';

import Header from './sections/Header';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import WhatWeDo from './sections/WhatWeDo';
import HowWeDoIt from './sections/HowWeDoIt';
import WhoItsFor from './sections/WhoItsFor';
import WhyUs from './sections/WhyUs';
import Work from './sections/Work';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges with centers (settleRatio = 0.5)
      const pinnedRanges = pinned.map(st => {
        const start = st.start / maxScroll;
        const end = (st.end ?? st.start) / maxScroll;
        const center = start + (end - start) * 0.5;
        return { start, end, center };
      });

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-midnight min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#0B0E1A',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#F4F6FF',
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Pinned Sections with z-index stacking */}
        <Hero />
        <Manifesto />
        <WhatWeDo />
        <HowWeDoIt />
        <WhoItsFor />
        <WhyUs />
        
        {/* Flowing Sections */}
        <Work />
        <Pricing />
        <Contact />
      </main>
    </div>
  );
}

export default App;
