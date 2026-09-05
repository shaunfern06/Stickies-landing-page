import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PREVIEW_FEATURES } from '../../data/previewFeatures';

interface StoryVideoShowcaseProps {
  featureIndex: number;
  isIntro: boolean;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const StoryVideoShowcase: React.FC<StoryVideoShowcaseProps> = ({
  featureIndex,
  isIntro,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (!isIntro && index === featureIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        if (index !== featureIndex) {
          video.currentTime = 0;
        }
      }
    });
  }, [featureIndex, isIntro]);

  return (
    <div className="relative mx-auto w-full max-w-5xl px-12 md:px-16">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous feature"
        className={[
          'absolute left-0 top-1/2 z-20 -translate-y-1/2',
          'flex h-10 w-10 items-center justify-center rounded-full',
          'border border-charcoal/10 bg-cream/90 shadow-lg backdrop-blur-sm',
          'transition-all duration-300 ease-out',
          'hover:scale-105 hover:border-charcoal/20 hover:shadow-xl',
          'disabled:pointer-events-none disabled:opacity-30',
        ].join(' ')}
      >
        <ChevronLeft className="h-5 w-5 text-charcoal" />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next feature"
        className={[
          'absolute right-0 top-1/2 z-20 -translate-y-1/2',
          'flex h-10 w-10 items-center justify-center rounded-full',
          'border border-charcoal/10 bg-cream/90 shadow-lg backdrop-blur-sm',
          'transition-all duration-300 ease-out',
          'hover:scale-105 hover:border-charcoal/20 hover:shadow-xl',
          'disabled:pointer-events-none disabled:opacity-30',
        ].join(' ')}
      >
        <ChevronRight className="h-5 w-5 text-charcoal" />
      </button>

      <div
        className={[
          'overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isIntro ? 'max-h-0 opacity-0' : 'max-h-[720px] opacity-100',
        ].join(' ')}
      >
        <div
          className={[
            'relative overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5 shadow-xl',
            'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isIntro ? 'scale-[0.98]' : 'scale-100',
          ].join(' ')}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:aspect-[16/9]">
            {PREVIEW_FEATURES.map((feature, index) => {
              const isActive = !isIntro && index === featureIndex;

              return (
                <video
                  key={feature.videoSrc}
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={feature.videoSrc}
                  className={[
                    'absolute inset-0 h-full w-full object-cover',
                    'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isActive
                      ? 'scale-100 opacity-100'
                      : 'pointer-events-none scale-[0.98] opacity-0',
                  ].join(' ')}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryVideoShowcase;
