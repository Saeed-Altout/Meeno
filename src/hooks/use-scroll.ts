import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to track scroll position and direction
 * @returns Object containing scroll position and direction information
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      setDirection('down');
    } else if (currentScrollY < lastScrollY) {
      setDirection('up');
    }

    // Update scroll position
    setScrollY(currentScrollY);
    setLastScrollY(currentScrollY);

    // Set isScrolled flag if scrolled past threshold
    setIsScrolled(currentScrollY > 10);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollY,
    direction,
    isScrolled,
  };
};

/**
 * Hook to detect if an element is in viewport
 * @param options IntersectionObserver options
 * @returns [ref, isInView] - Ref to attach to element and boolean indicating if element is in view
 */
export const useInView = (options = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isInView] as const;
};
