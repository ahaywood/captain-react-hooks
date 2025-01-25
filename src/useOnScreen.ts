import { RefObject, useEffect, useState } from 'react';

/**
 * Hook that detects when an element enters the viewport
 * @param ref - Reference to the element to observe
 * @param rootMargin - Margin around the root (viewport). Can be used to trigger the callback before the element is visible
 * @returns boolean indicating if the element is currently visible
 */
export default function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin: string = '0px'
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}