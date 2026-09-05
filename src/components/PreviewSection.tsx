import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { INTRO_SLIDE, PREVIEW_FEATURES, TOTAL_SLIDES } from '../data/previewFeatures';
import { useScrollStory } from '../hooks/useScrollStory';
import StoryControls from './preview/StoryControls';
import StoryVideoShowcase from './preview/StoryVideoShowcase';

const PreviewSection: React.FC = () => {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const {
    wrapperRef,
    sectionRef,
    activeIndex,
    goToSlide,
    goToNext,
    goToPrevious,
    featureIndex,
  } = useScrollStory({ slideCount: TOTAL_SLIDES });

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const deltaX = touchStartX.current - event.changedTouches[0].clientX;
    const deltaY = touchStartY.current - event.changedTouches[0].clientY;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX > 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  return (
    <section id="preview" ref={wrapperRef} className="relative z-10">
      <div
        ref={sectionRef}
        className={[
          'flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth overscroll-x-contain',
          '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
        ].join(' ')}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Intro slide */}
        <article className="flex min-w-full flex-shrink-0 snap-center flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto w-full max-w-7xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal/60">
              {INTRO_SLIDE.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              {INTRO_SLIDE.heading}
            </h2>

            <div className="mt-12 flex flex-col items-center gap-3 opacity-70">
              <p className="text-sm font-medium uppercase tracking-widest text-charcoal/60">
                Scroll to explore each capability
              </p>
              <ChevronDown className="h-5 w-5 animate-bounce-gentle text-charcoal/50" />
            </div>

            <StoryControls
              featureIndex={featureIndex}
              isIntro={true}
              onSelectFeature={(index) => goToSlide(index + 1)}
            />
          </div>
        </article>

        {/* Feature slides */}
        {PREVIEW_FEATURES.map((feature, index) => (
          <article
            key={feature.title}
            className="flex min-w-full flex-shrink-0 snap-center flex-col justify-center px-8 py-16 lg:px-16 lg:py-24"
          >
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-10 text-center md:mb-14">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal/60">
                  {INTRO_SLIDE.eyebrow}
                </p>
                <h2 className="font-serif text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
                  {feature.title}
                </h2>
                <p className="mt-4 text-lg font-light tracking-wide text-charcoal/70 md:text-xl">
                  {feature.subtitle}
                </p>
              </div>

              <StoryVideoShowcase
                featureIndex={index}
                isIntro={false}
                onPrevious={goToPrevious}
                onNext={goToNext}
                canGoPrevious={activeIndex > 0}
                canGoNext={activeIndex < TOTAL_SLIDES - 1}
              />

              <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-charcoal/70 md:mt-10 md:text-lg">
                {feature.description}
              </p>

              <StoryControls
                featureIndex={index}
                isIntro={false}
                onSelectFeature={(featureIndex) => goToSlide(featureIndex + 1)}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PreviewSection;
