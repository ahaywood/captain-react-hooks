import { renderHook } from '@testing-library/react';
import useLockBodyScroll from '../useLockBodyScroll';

describe('useLockBodyScroll', () => {
  const originalStyle = window.getComputedStyle(document.body).overflow;

  afterEach(() => {
    document.body.style.overflow = originalStyle;
  });

  it('should lock body scroll when activated', () => {
    renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should not lock body scroll when disabled', () => {
    renderHook(() => useLockBodyScroll(false));
    expect(document.body.style.overflow).toBe(originalStyle);
  });

  it('should restore original overflow style on unmount', () => {
    const { unmount } = renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe(originalStyle);
  });

  it('should handle multiple instances correctly', () => {
    const { unmount: unmount1 } = renderHook(() => useLockBodyScroll(true));
    const { unmount: unmount2 } = renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.overflow).toBe('hidden');

    unmount1();
    expect(document.body.style.overflow).toBe('hidden');

    unmount2();
    expect(document.body.style.overflow).toBe(originalStyle);
  });
});
