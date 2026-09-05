import React from 'react';
import { INTRO_SLIDE, PREVIEW_FEATURES } from '../../data/previewFeatures';

interface StoryHeadingProps {
  activeIndex: number;
}

const SLIDES = [
  {
    eyebrow: INTRO_SLIDE.eyebrow,
    heading: INTRO_SLIDE.heading,
    subtitle: INTRO_SLIDE.subtitle,
  },
  ...PREVIEW_FEATURES.map((feature) => ({
    eyebrow: INTRO_SLIDE.eyebrow,
    heading: feature.title,
    subtitle: feature.subtitle,
  })),
];

const StoryHeading: React.FC<StoryHeadingProps> = ({ activeIndex }) => {
  return (
    <div className="relative mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <div className="relative min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.heading}
              className={[
                'absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0',
              ].join(' ')}
              aria-hidden={!isActive}
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal/60">
                {slide.eyebrow}
              </p>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
                {slide.heading}
              </h2>
              {slide.subtitle && (
                <p
                  className={[
                    'mt-4 text-lg font-light tracking-wide text-charcoal/70 md:text-xl',
                    'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100',
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  ].join(' ')}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryHeading;
