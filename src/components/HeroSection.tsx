import React from 'react';
import { ArrowRight, Chrome, Zap, Shield, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center max-w-5xl mx-auto">
        {/* Main Headline - Two-line lockup */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal tracking-tight leading-[0.9]">
            Stickies
          </h1>
        </div>

        {/* Subheadline with improved typography */}
        <p className="text-lg md:text-xl lg:text-2xl text-charcoal/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
          Transform any webpage into your personal workspace with{' '}
          <span className="text-charcoal font-medium italic">beautiful annotations</span>, 
          <span className="text-charcoal font-medium italic"> instant highlights</span>, and 
          <span className="text-charcoal font-medium italic"> smart sticky notes</span>.
        </p>

        {/* CTA Buttons with enhanced interactions */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group relative bg-charcoal text-cream px-8 py-4 rounded-full font-semibold text-lg hover:bg-charcoal/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3 shadow-lg overflow-hidden">
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
            
            <Chrome className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Add to Chrome</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
          </button>
          
          <button className="group border-2 border-charcoal/20 text-charcoal px-8 py-4 rounded-full font-semibold text-lg hover:border-charcoal/40 hover:bg-charcoal/5 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 tracking-wide">PREVIEW EXTENSION</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse relative z-10"></div>
          </button>
        </div>

        {/* Feature Pills with microinteractions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: Zap, text: 'Instant Highlights' },
            { icon: Shield, text: 'Privacy First' },
            { text: 'Works Everywhere' }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-charcoal/5 backdrop-blur-sm border border-charcoal/10 rounded-full px-6 py-3 flex items-center gap-3 hover:bg-charcoal/10 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
            >
              {feature.icon && (
                <feature.icon className="h-4 w-4 text-accent group-hover:scale-110 transition-transform duration-200" />
              )}
              <span className="text-charcoal/80 font-medium text-sm tracking-wider uppercase">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Cue */}
        <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <span className="text-charcoal/60 text-sm font-medium tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 text-charcoal/60 animate-bounce-gentle" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;