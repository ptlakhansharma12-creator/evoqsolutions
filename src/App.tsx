import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Logos } from './components/Logos';
import { About } from './components/About';
import { Services } from './components/Services';
import { AiAdvantage } from './components/AiAdvantage';
import { FeaturesGrid } from './components/FeaturesGrid';
import { Process } from './components/Process';
import { FaqAndCases } from './components/FaqAndCases';
import { ContactAndFooter } from './components/ContactAndFooter';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <About />
        <Services />
        <AiAdvantage />
        <FeaturesGrid />
        <Process />
        <FaqAndCases />
        <ContactAndFooter />
      </main>
    </div>
  );
}
