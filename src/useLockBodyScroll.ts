import { useEffect } from 'react';

/**
 * Hook that prevents body scrolling when active
 * @param lock - Whether to lock the body scroll or not
 */
export default function useLockBodyScroll(lock: boolean = true): void {
  useEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}