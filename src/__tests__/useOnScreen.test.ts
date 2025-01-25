import { renderHook } from '@testing-library/react';
import useOnScreen from '../useOnScreen';

describe('useOnScreen', () => {
  const mockIntersectionObserver = jest.fn();
  const mockDisconnect = jest.fn();
  const mockObserve = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockReset();
    mockDisconnect.mockReset();
    mockObserve.mockReset();

    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      disconnect: mockDisconnect,
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should create an intersection observer with correct options', () => {
    const ref = { current: document.createElement('div') };
    const rootMargin = '10px';

    renderHook(() => useOnScreen(ref, rootMargin));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { rootMargin }
    );
  });

  it('should observe the referenced element', () => {
    const ref = { current: document.createElement('div') };

    renderHook(() => useOnScreen(ref));

    expect(mockObserve).toHaveBeenCalledWith(ref.current);
  });

  it('should not observe if ref is null', () => {
    const ref = { current: null };

    renderHook(() => useOnScreen(ref));

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should disconnect observer on unmount', () => {
    const ref = { current: document.createElement('div') };

    const { unmount } = renderHook(() => useOnScreen(ref));
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should update isIntersecting state when intersection changes', () => {
    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      };
    });

    const ref = { current: document.createElement('div') };
    const { result, rerender } = renderHook(() => useOnScreen(ref));

    expect(result.current).toBe(false);

    // Simulate intersection
    intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    rerender();
    expect(result.current).toBe(true);

    // Simulate element leaving viewport
    intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry]);
    rerender();
    expect(result.current).toBe(false);
  });
});
