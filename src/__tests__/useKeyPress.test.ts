import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import useKeyPress from '../useKeyPress';

describe('useKeyPress', () => {
  it('should detect when target key is pressed and released', () => {
    const { result } = renderHook(() => useKeyPress('a'));

    expect(result.current).toBe(false);

    fireEvent.keyDown(window, { key: 'a' });
    expect(result.current).toBe(true);

    fireEvent.keyUp(window, { key: 'a' });
    expect(result.current).toBe(false);
  });

  it('should not respond to non-target keys', () => {
    const { result } = renderHook(() => useKeyPress('a'));

    fireEvent.keyDown(window, { key: 'b' });
    expect(result.current).toBe(false);

    fireEvent.keyUp(window, { key: 'b' });
    expect(result.current).toBe(false);
  });

  it('should handle special keys', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(result.current).toBe(true);

    fireEvent.keyUp(window, { key: 'Enter' });
    expect(result.current).toBe(false);
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useKeyPress('a'));
    unmount();

    // These events should not throw errors after unmount
    fireEvent.keyDown(window, { key: 'a' });
    fireEvent.keyUp(window, { key: 'a' });
  });
});
