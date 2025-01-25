import { useEffect, useRef } from 'react';

/**
 * Hook that sets up a declarative interval
 * @param callback - Function to be called on each interval
 * @param delay - Interval delay in milliseconds, or null to stop the interval
 */
export default function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}