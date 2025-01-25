import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with the default value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('should load existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(JSON.parse(localStorage.getItem('test-key') || '')).toBe('new value');
  });

  it('should handle complex objects', () => {
    const complexObject = { foo: 'bar', count: 42 };
    const { result } = renderHook(() => useLocalStorage('test-key', complexObject));

    expect(result.current[0]).toEqual(complexObject);

    const newObject = { foo: 'baz', count: 43 };
    act(() => {
      result.current[1](newObject);
    });

    expect(result.current[0]).toEqual(newObject);
    expect(JSON.parse(localStorage.getItem('test-key') || '')).toEqual(newObject);
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', { count: 0 }));

    act(() => {
      result.current[1]((prev) => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1 });
  });

  it('should handle localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockError = new Error('localStorage error');
    
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = jest.fn(() => {
      throw mockError;
    });

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
    expect(consoleSpy).toHaveBeenCalled();

    // Cleanup
    Storage.prototype.getItem = originalGetItem;
    consoleSpy.mockRestore();
  });
});
