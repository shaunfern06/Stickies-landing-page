import React from 'react';
import { PREVIEW_FEATURES } from '../../data/previewFeatures';

interface StoryControlsProps {
  featureIndex: number;
  isIntro: boolean;
  onSelectFeature: (index: number) => void;
}

const StoryControls: React.FC<StoryControlsProps> = ({
  featureIndex,
  isIntro,
  onSelectFeature,
}) => {
  const displayIndex = isIntro ? 0 : featureIndex + 1;

  return (
    <div className="mt-10 flex flex-col items-center gap-6 md:mt-12">
      <div className="flex items-center gap-3">
        {PREVIEW_FEATURES.map((feature, index) => {
          const isActive = !isIntro && index === featureIndex;

          return (
            <button
              key={feature.title}
              type="button"
              aria-label={`Go to ${feature.title}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelectFeature(index)}
              className={[
                'rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive
                  ? 'h-2.5 w-8 bg-charcoal'
                  : 'h-2.5 w-2.5 bg-charcoal/20 hover:bg-charcoal/40',
              ].join(' ')}
            />
          );
        })}
      </div>

      <p
        className={[
          'text-sm font-medium tracking-[0.3em] text-charcoal/50 transition-opacity duration-500',
          isIntro ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
        aria-hidden={isIntro}
      >
        {String(displayIndex).padStart(2, '0')} / {String(PREVIEW_FEATURES.length).padStart(2, '0')}
      </p>
    </div>
  );
};

export default StoryControls;
