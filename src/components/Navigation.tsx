import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Preview', href: '#preview' },
    { name: 'Download', href: '#download' },
    { name: 'Learn More', href: '#learn' }
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-cream/90 backdrop-blur-md border border-charcoal/10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-serif font-semibold text-charcoal tracking-tight">
              Stickies
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-charcoal/80 hover:text-charcoal font-medium transition-all duration-200 text-sm tracking-wider uppercase hover:scale-105 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-charcoal text-cream px-6 py-2 rounded-full font-medium text-sm hover:bg-charcoal/90 transition-all duration-200 hover:scale-105 hover:shadow-lg tracking-wider uppercase">
              Waitlist
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-charcoal/10 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-charcoal" />
            ) : (
              <Menu className="h-5 w-5 text-charcoal" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 border-t border-charcoal/10 mt-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-charcoal/80 hover:text-charcoal font-medium transition-colors duration-200 text-sm tracking-wider uppercase py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="bg-charcoal text-cream px-6 py-2 rounded-full font-medium text-sm hover:bg-charcoal/90 transition-all duration-200 self-start mt-3 tracking-wider uppercase">
                Waitlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;