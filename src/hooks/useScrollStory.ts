import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollStoryOptions {
  slideCount: number;
}

const THRESHOLDS = [0.0, 0.33, 0.66, 0.99];

const WHEEL_COOLDOWN_MS = 900;
const WHEEL_DELTA_THRESHOLD = 30;

function isSectionFullyInView(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (rect.height <= viewportHeight) {
    return rect.top >= 0 && rect.bottom <= viewportHeight;
  }

  return rect.top <= 0 && rect.bottom >= viewportHeight;
}

export function useScrollStory({ slideCount }: UseScrollStoryOptions) {
  const wrapperRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<number>();
  const lastWheelTime = useRef(0);

  const getSlideScrollLeft = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return 0;

    const scrollableDistance = section.scrollWidth - section.clientWidth;
    const clamped = Math.max(0, Math.min(index, THRESHOLDS.length - 1));

    return THRESHOLDS[clamped] * scrollableDistance;
  }, []);

  const updateActiveIndexFromScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const scrollableDistance = section.scrollWidth - section.clientWidth;
    if (scrollableDistance <= 0) return;

    const progress = Math.max(
      0,
      Math.min(1, section.scrollLeft / scrollableDistance)
    );

    let next = 0;

    if (progress < 0.15) {
      next = 0;
    } else if (progress < 0.5) {
      next = 1;
    } else if (progress < 0.85) {
      next = 2;
    } else {
      next = 3;
    }

    setActiveIndex((current) => (current === next ? current : next));
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, slideCount - 1));
      setActiveIndex(target);

      const section = sectionRef.current;
      if (!section) return;

      isProgrammaticScroll.current = true;

      section.scrollTo({
        left: getSlideScrollLeft(target),
        behavior: 'smooth',
      });

      window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, WHEEL_COOLDOWN_MS);
    },
    [slideCount, getSlideScrollLeft]
  );

  const goToNext = useCallback(() => {
    goToSlide(activeIndexRef.current + 1);
  }, [goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndexRef.current - 1);
  }, [goToSlide]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => requestAnimationFrame(updateActiveIndexFromScroll);

    updateActiveIndexFromScroll();
    section.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveIndexFromScroll);

    return () => {
      section.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveIndexFromScroll);
      window.clearTimeout(scrollTimeout.current);
    };
  }, [updateActiveIndexFromScroll]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !isSectionFullyInView(wrapper)) return;

      const delta = event.deltaY;
      if (Math.abs(delta) < WHEEL_DELTA_THRESHOLD) return;

      const scrollingDown = delta > 0;
      const currentIndex = activeIndexRef.current;
      const atFirst = currentIndex === 0;
      const atLast = currentIndex === slideCount - 1;

      if (scrollingDown && atLast) return;
      if (!scrollingDown && atFirst) return;

      event.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime.current < WHEEL_COOLDOWN_MS) return;
      if (isProgrammaticScroll.current) return;

      lastWheelTime.current = now;

      if (scrollingDown) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [goToSlide, slideCount]);

  return {
    wrapperRef,
    sectionRef,
    activeIndex,
    goToSlide,
    goToNext,
    goToPrevious,
    isIntro: activeIndex === 0,
    featureIndex: activeIndex - 1,
  };
}
