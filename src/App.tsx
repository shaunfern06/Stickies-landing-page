import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PreviewSection from './components/PreviewSection';
import AnimatedStickyNotes from './components/AnimatedStickyNotes';

function App() {
  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
      <AnimatedStickyNotes />
      <Navigation />
      <HeroSection />
      <PreviewSection />
    </div>
  );
}

export default App;